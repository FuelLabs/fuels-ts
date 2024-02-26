import { sleep } from '../utils/sleep';

export async function sleepUntilTrue(
  fn: () => Promise<boolean>,
  time: number = 500
): Promise<void> {
  const result = await fn();
  if (result) {
    return;
  }

  await sleep(time);
  await sleepUntilTrue(fn, time);
}
