import { bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptWithOptionsAbi__factory } from '../test/typegen';
import type { ScriptWithOptionsAbiConfigurables } from '../test/typegen/scripts/factories/ScriptWithOptionsAbi__factory';

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
    const configurables: ScriptWithOptionsAbiConfigurables = { X: bn(1), Y: bn(2), Z: bn(3) };

    // Script with no inputs
    scriptWithOptions.setConfigurableConstants({ X: undefined, Y: undefined, Z: undefined });
    const { waitForResult: call1 } = await scriptWithOptions.functions.main().call();
    const { value: value1 } = await call1();
    expect(value1).toBe(expectedValue);

    // Script with single input
    scriptWithOptions.setConfigurableConstants({ X: bn(1), Y: undefined, Z: undefined });
    const { waitForResult: call2 } = await scriptWithOptions.functions.main(bn(1)).call();
    const { value: value2 } = await call2();
    expect(value2).toBe(expectedValue);

    // Script with two inputs
    const { waitForResult: call3 } = await scriptWithOptions.functions
      .main(undefined, undefined)
      .call();
    const { value: value3 } = await call3();
    expect(value3).toBe(expectedValue);
  });
});
