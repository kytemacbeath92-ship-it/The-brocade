import { CoverButton } from '@/components/cover-button';
import { IntroPage } from '@/components/intro-page';
import { useCover } from '@/state/cover';

export default function IntroScreen() {
  const { closeBook } = useCover();
  return <IntroPage headerRight={<CoverButton onPress={closeBook} />} />;
}
