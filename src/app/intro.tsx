import { CoverButton } from '@/components/cover-button';
import { IntroPage } from '@/components/intro-page';
import { useCover } from '@/state/cover';

export default function IntroScreen() {
  const { closeBook, sessionId } = useCover();
  return <IntroPage key={sessionId} headerRight={<CoverButton onPress={closeBook} />} />;
}
