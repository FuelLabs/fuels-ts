/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-global-assign */
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
});
