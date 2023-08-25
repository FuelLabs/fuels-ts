export const testEach = (): string => {
  let env: string;

  // @ts-expect-error
  if (globalThis?.context?.browser()?.isConnected()) {
    env = 'browser';
  } else if (globalThis?.process?.versions?.node) {
    env = 'node';
  } else {
    throw new Error('Oops, no browser/node detected');
  }

  return env;
};

export const testAll = (): string => 'thank you';
