import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type ThemeMode = 'system' | 'light' | 'dark';

export type Settings = {
  themeMode: ThemeMode;
  fontScale: number;
  ttsRate: number;
};

type PersistedState = {
  readIds: number[];
  packIds: number[];
  lastReadId: number | null;
  settings: Settings;
};

const STORAGE_KEY = 'brocode/state/v1';

const DEFAULT_SETTINGS: Settings = {
  themeMode: 'system',
  fontScale: 1,
  ttsRate: 1,
};

const DEFAULT_STATE: PersistedState = {
  readIds: [],
  packIds: [],
  lastReadId: null,
  settings: DEFAULT_SETTINGS,
};

type AppStateContextValue = {
  hydrated: boolean;
  readIds: Set<number>;
  packIds: Set<number>;
  lastReadId: number | null;
  settings: Settings;
  isRead: (id: number) => boolean;
  isPacked: (id: number) => boolean;
  markRead: (id: number) => void;
  toggleRead: (id: number) => void;
  togglePack: (id: number) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  resetProgress: () => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<PersistedState>(DEFAULT_STATE);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (active && raw) {
          const parsed = JSON.parse(raw) as Partial<PersistedState>;
          setState({
            readIds: parsed.readIds ?? [],
            packIds: parsed.packIds ?? [],
            lastReadId: parsed.lastReadId ?? null,
            settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
          });
        }
      } catch {
        // Corrupt or unavailable storage falls back to defaults.
      } finally {
        if (active) setHydrated(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
    }, 200);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state, hydrated]);

  const readSet = useMemo(() => new Set(state.readIds), [state.readIds]);
  const packSet = useMemo(() => new Set(state.packIds), [state.packIds]);

  const markRead = useCallback((id: number) => {
    setState((prev) => {
      const already = prev.readIds.includes(id);
      return {
        ...prev,
        lastReadId: id,
        readIds: already ? prev.readIds : [...prev.readIds, id],
      };
    });
  }, []);

  const toggleRead = useCallback((id: number) => {
    setState((prev) => {
      const already = prev.readIds.includes(id);
      return {
        ...prev,
        readIds: already ? prev.readIds.filter((x) => x !== id) : [...prev.readIds, id],
      };
    });
  }, []);

  const togglePack = useCallback((id: number) => {
    setState((prev) => {
      const already = prev.packIds.includes(id);
      return {
        ...prev,
        packIds: already ? prev.packIds.filter((x) => x !== id) : [...prev.packIds, id],
      };
    });
  }, []);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, []);

  const resetProgress = useCallback(() => {
    setState((prev) => ({ ...prev, readIds: [], lastReadId: null }));
  }, []);

  const value = useMemo<AppStateContextValue>(
    () => ({
      hydrated,
      readIds: readSet,
      packIds: packSet,
      lastReadId: state.lastReadId,
      settings: state.settings,
      isRead: (id: number) => readSet.has(id),
      isPacked: (id: number) => packSet.has(id),
      markRead,
      toggleRead,
      togglePack,
      updateSettings,
      resetProgress,
    }),
    [hydrated, readSet, packSet, state.lastReadId, state.settings, markRead, toggleRead, togglePack, updateSettings, resetProgress],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return ctx;
}
