/** @hidden */
export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export async function sleepUntilTrue(fn: () => Promise<boolean>, time: number): Promise<void> {
  while (await fn()) {
    await sleep(time);
  }
}
