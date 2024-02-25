/** @hidden */
export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

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
