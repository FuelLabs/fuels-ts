import { sleep } from '../utils/sleep';

/**
 * @hidden
 *
 * Waits until the given URL is unreachable. Used in tests to verify that fuel-core is no longer running.
 */
export async function waitUntilUnreachable(url: string) {
  let isLive;
  try {
    await fetch(url);
    isLive = true;
  } catch (e) {
    isLive = false;
  }
  if (!isLive) {
    return;
  }

  await sleep(250);
  await waitUntilUnreachable(url);
}
