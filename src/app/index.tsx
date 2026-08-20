import { Redirect } from 'expo-router';

/** Interior routes mount under the cover overlay so opening does not flash a blank stack. */
export default function CoverRedirect() {
  return <Redirect href="/code" />;
}
