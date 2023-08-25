export const testEach = (): string => {
  let env: string;

  if (globalThis.document) {
    env = 'browser';
  } else if (globalThis?.process?.versions?.node) {
    env = 'node';
  } else {
    throw new Error('Oops, no browser/node detected');
  }

  return env;
};

export const testAll = (): string => 'thank you';
