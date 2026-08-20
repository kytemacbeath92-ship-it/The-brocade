import { Redirect } from 'expo-router';

/** Intro mounts under the cover overlay so opening reveals it without a route flash. */
export default function CoverRedirect() {
  return <Redirect href="/intro" />;
}
