/* eslint-disable no-global-assign */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// %IMPORTS%

// @ts-ignore global assignment
const consoleBkp = { ...console };

afterAll(() => {
  console = { ...consoleBkp };
});

/**
 * @group node
 * @group browser
 */
test('%NAME%', async () => {
  // TEST NODE LAUNCHER ———>>>
  // %NODE_LAUNCHER%
  // <<<——— TEST NODE LAUNCHER

  console = {
    ...console,
    log(logMsg, isTruthy) {
      if (!isTruthy) {
        throw new Error(logMsg);
      }
    },
  };

  // SNIPPET ———>>>
  // %SNIPPET%
  // <<<——— SNIPPET

  return Promise.resolve();
});
