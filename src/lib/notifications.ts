import { Platform } from 'react-native';

import { articles, broOfTheDayId } from '@/data/articles';
import { localizeArticle } from '@/i18n/localize';
import type { LanguageCode } from '@/i18n/languages';
import { UI_STRINGS } from '@/i18n/ui';

const WEB_FLAG_PREFIX = 'brocode/daily-notified/';

type NotificationsModule = typeof import('expo-notifications');
let Notifications: NotificationsModule | null = null;
if (Platform.OS !== 'web') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Notifications = require('expo-notifications');
}

function todayKey(date = new Date()): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

export function configureNotificationHandler(): void {
  Notifications?.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android' || !Notifications) return;
  await Notifications.setNotificationChannelAsync('daily-rule', {
    name: "Today's Rule",
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') {
    if (typeof Notification === 'undefined') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
  }
  if (!Notifications) return false;
  const existing = await Notifications.getPermissionsAsync();
  let status = existing.status;
  if (status !== 'granted') {
    const asked = await Notifications.requestPermissionsAsync();
    status = asked.status;
  }
  return status === 'granted';
}

function ruleCopy(lang: LanguageCode, date: Date) {
  const id = broOfTheDayId(date);
  const base = articles.find((a) => a.id === id)!;
  const article = localizeArticle(base, lang);
  const title = UI_STRINGS[lang].todaysRule;
  return { id, title, body: article.title };
}

export async function syncDailyNotifications(enabled: boolean, lang: LanguageCode): Promise<boolean> {
  if (!enabled) {
    if (Platform.OS === 'web') return true;
    await Notifications?.cancelAllScheduledNotificationsAsync();
    return true;
  }

  const granted = await requestNotificationPermission();
  if (!granted) return false;

  if (Platform.OS === 'web') {
    maybeShowWebDaily(lang);
    return true;
  }

  if (!Notifications) return false;
  await ensureAndroidChannel();
  await Notifications.cancelAllScheduledNotificationsAsync();

  const { SchedulableTriggerInputTypes } = Notifications;
  for (let offset = 0; offset < 14; offset += 1) {
    const when = new Date();
    when.setHours(9, 0, 0, 0);
    when.setDate(when.getDate() + offset);
    if (when.getTime() <= Date.now() + 15_000) continue;
    const copy = ruleCopy(lang, when);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: copy.title,
        body: copy.body,
        data: { articleId: copy.id },
        sound: true,
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DATE,
        date: when,
        channelId: Platform.OS === 'android' ? 'daily-rule' : undefined,
      },
    });
  }
  return true;
}

export function maybeShowWebDaily(lang: LanguageCode): void {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  const key = WEB_FLAG_PREFIX + todayKey();
  try {
    if (window.localStorage.getItem(key)) return;
    const copy = ruleCopy(lang, new Date());
    const n = new Notification(copy.title, { body: copy.body });
    n.onclick = () => {
      window.focus();
      window.location.hash = `/article/${copy.id}`;
    };
    window.localStorage.setItem(key, String(copy.id));
  } catch {
    // Ignore browsers that block Notification construction.
  }
}

export function parseArticleIdFromNotification(data: unknown): number | null {
  if (!data || typeof data !== 'object') return null;
  const raw = (data as { articleId?: unknown }).articleId;
  const id = typeof raw === 'number' ? raw : Number(raw);
  return Number.isFinite(id) ? id : null;
}
