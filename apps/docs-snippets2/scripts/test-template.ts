/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-global-assign */
const consoleBkp = { ...console };

afterAll(() => {
  console = { ...consoleBkp };
});

test('%NAME%', async () => {
  // TEST NODE LAUNCHER ———>>>
  // %NODE_LAUNCHER%
  // <<<——— TEST NODE LAUNCHER

  console = {
    ...console,
    assert(isTruthy, errorMsg) {
      if (!isTruthy) {
        throw new Error(errorMsg);
      }
    },
  };

  // SNIPPET ———>>>
  // %SNIPPET%
  // <<<——— SNIPPET
});
