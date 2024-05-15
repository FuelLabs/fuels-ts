import { sleep } from '../utils/sleep';

import { urlIsLive } from './url-is-live';

/**
 * @hidden
 *
 * Mainly used to verify that a fuel-core node has been killed after cleanup is called.
 */
export async function waitUntilUnreachable(url: string) {
  const isLive = await urlIsLive(url);
  if (!isLive) {
    return;
  }

  await sleep(250);
  await waitUntilUnreachable(url);
}
