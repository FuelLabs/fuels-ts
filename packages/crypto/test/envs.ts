import * as node from '../src/index';
// import * as browser from '../src/index.browser';

export const envs = [
  { toString: () => 'node', ...node },
  // { toString: () => 'browser', ...browser }, TODO: Uncomment when running tests in browser is supported
];
