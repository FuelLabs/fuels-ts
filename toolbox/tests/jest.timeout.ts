/**
 * This is set here instead of using a `testTimeout` option
 * in `jest.config.ts` because of this bug regarding the use
 * of `projects` + `testTimeout` together:
 *
 *    https://github.com/facebook/jest/issues/9696
 *
 */
jest.setTimeout(15000);
