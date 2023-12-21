const isNode =
  typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

export const testEach = (): string => {
  let env: string;

  if (isNode) {
    env = 'node';
  } else {
    throw new Error('Oops, invalid test environment detected');
  }

  return env;
};

export const testAll = (): string => 'thank you';
