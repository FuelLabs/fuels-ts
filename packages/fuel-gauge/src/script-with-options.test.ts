import type { BigNumberish } from 'fuels';
import { bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptWithOptionsAbi__factory } from '../test/typegen';
import type { Option } from '../test/typegen/contracts/common';

/**
 * @group node
 * @group browser
 */
describe('Script With Options', () => {
  it('should call script with optional arguments', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const scriptWithOptions = ScriptWithOptionsAbi__factory.createInstance(wallet);
    const expectedValue = true;
    const OPTION_SOME: Option<BigNumberish> = bn(1);
    const OPTION_NONE: Option<BigNumberish> = undefined;

    // Script with no inputs
    const { waitForResult: call1 } = await scriptWithOptions.functions.main().call();
    const { value: value1 } = await call1();
    expect(value1).toBe(expectedValue);

    // Script with single input
    const { waitForResult: call2 } = await scriptWithOptions.functions.main(OPTION_SOME).call();
    const { value: value2 } = await call2();
    expect(value2).toBe(expectedValue);

    // Script with three input
    const { waitForResult: call3 } = await scriptWithOptions.functions
      .main(OPTION_SOME, OPTION_SOME, OPTION_SOME)
      .call();
    const { value: value3 } = await call3();
    expect(value3).toBe(expectedValue);

    // Script with mix of optional input
    const { waitForResult: call4 } = await scriptWithOptions.functions
      .main(OPTION_SOME, OPTION_NONE, OPTION_NONE)
      .call();
    const { value: value4 } = await call4();
    expect(value4).toBe(expectedValue);
  });
});
