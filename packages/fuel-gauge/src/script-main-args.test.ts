import type { BigNumberish } from 'fuels';
import { bn, Script as FuelScript, ZeroBytes32 } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptMainArgs, ScriptMainReturnStruct, Script } from '../test/typegen';

type Baz = {
  x: number;
};

/**
 * @group node
 * @group browser
 */
describe('Script Coverage', () => {
  it('can call script and use main arguments', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const foo = 33;
    const scriptInstance = new FuelScript<BigNumberish[], BigNumberish>(
      ScriptMainArgs.bytecode,
      ScriptMainArgs.abi,
      wallet
    );

    const { waitForResult } = await scriptInstance.functions.main(foo).call();

    const { value, logs, logsByContract } = await waitForResult();

    const expectedLogs = ['u8 foo', 33];
    expect(value?.toString()).toEqual(bn(foo).toString());
    expect(logs).toStrictEqual(expectedLogs);
    expect(logsByContract).toStrictEqual({
      [ZeroBytes32]: expectedLogs,
    });
  });

  it('can call script and use main arguments [two args, read logs]', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const scriptInstance = new Script(wallet);
    const foo = 33;
    const bar: Baz = {
      x: 12,
    };

    const { waitForResult } = await scriptInstance.functions.main(foo, bar).call();
    const { value, logs, logsByContract } = await waitForResult();

    const expectedLogs = ['u8 foo', 33, 'u8 bar', 12, 'u8 bar', 12];
    expect(value?.toString()).toEqual(bn(foo + bar.x).toString());
    expect(logs).toStrictEqual(expectedLogs);
    expect(logsByContract).toStrictEqual({
      [ZeroBytes32]: expectedLogs,
    });
  });

  it('can call script and use main arguments [two args, struct return]', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const scriptInstance = new ScriptMainReturnStruct(wallet);
    const foo = 1;
    const bar: Baz = {
      x: 2,
    };

    const { waitForResult } = await scriptInstance.functions.main(foo, bar).call();
    const { value } = await waitForResult();

    expect(value).toEqual({
      x: 3,
    });
  });

  it('can call script and use main arguments [tx params]', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const scriptInstance = new FuelScript<BigNumberish[], BigNumberish>(
      ScriptMainArgs.bytecode,
      ScriptMainArgs.abi,
      wallet
    );
    const foo = 42;

    await expect(
      scriptInstance.functions
        .main(foo)
        .txParams({
          gasLimit: 10,
        })
        .call()
    ).rejects.toThrow(/Gas limit '10' is lower than the required/);
  });
});
