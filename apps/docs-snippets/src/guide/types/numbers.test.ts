import { toBigInt } from 'ethers';
import { bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoValuesFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Numbers Types', () => {
  test('should successfully create new Sway-compatible BigNumber from a JavaScript number', () => {
    // #region numbers-docs-1
    // #context import { bn } from 'fuels';

    const originalNumber = 20;

    const bigNumber = bn(originalNumber);

    expect(bigNumber.toNumber()).toEqual(originalNumber);
    // #endregion numbers-docs-1
  });

  test('should successfully create new Sway-compatible BigNumber from a string', () => {
    // #region numbers-docs-2
    // #context import { bn } from 'fuels';

    const originalNumber = '9007199254740992';

    const bigNumber = bn(originalNumber);

    expect(bigNumber.toString()).toEqual(originalNumber);
    // #endregion numbers-docs-2
  });

  test('should successfully pass in and read a number to/from a contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoValuesFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region numbers-docs-3
    const originalNumber = 20;

    const { waitForResult } = await contract.functions.echo_u64(bn(originalNumber)).call();
    const { value } = await waitForResult();

    expect(value.toNumber()).toEqual(originalNumber);
    // #endregion numbers-docs-3
  });

  test('should successfully pass in and read a number to/from a contract - small numbers', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoValuesFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region numbers-docs-4
    const originalNumber = 20;

    const { waitForResult } = await contract.functions.echo_u8(originalNumber).call();
    const { value } = await waitForResult();

    expect(value).toEqual(originalNumber);
    // #endregion numbers-docs-4
  });

  test('ethers -> fuels BigNum conversion', () => {
    // #region numbers-docs-5
    // #context import { toBigInt } from 'ethers';
    // #context import { bn } from 'fuels';

    const originalNumber = 20;

    const ethersBigNum = toBigInt(originalNumber);

    const fuelsBigNum = bn(ethersBigNum.toString());

    expect(fuelsBigNum.toNumber()).toEqual(originalNumber);
    // #endregion numbers-docs-5
  });
});
