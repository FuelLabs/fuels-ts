const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

const isNode =
  typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

export const testEach = (): string => {
  let env: string;

  if (isBrowser) {
    env = 'browser';
  } else if (isNode) {
    env = 'node';
  } else {
    throw new Error('Oops, no browser/node detected');
  }

  return env;
};

export const testAll = (): string => 'thank you';
