import { sleep } from '../utils/sleep';

import { urlIsLive } from './url-is-live';

export async function waitUntilUnreachable(url: string) {
  const isLive = await urlIsLive(url);
  if (!isLive) {
    return;
  }

  await sleep(250);
  await waitUntilUnreachable(url);
}
