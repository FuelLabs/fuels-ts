import { launchTestNode } from 'fuels/test-utils';

import { EchoValuesFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('String Types', () => {
  it('should validate string', () => {
    // #region string-1
    // Sway str[2]
    const stringSize2 = 'st';

    // Sway str[8]
    const stringSize8 = 'fuel-sdk';
    // #endregion string-1

    expect(stringSize2.length).toBe(2);
    expect(stringSize8.length).toBe(8);
  });

  it('should successfully execute and validate echoed 8 contract call', async () => {
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

    // #region string-2
    const { value } = await contract.functions.echo_str_8('fuel-sdk').simulate();

    expect(value).toEqual('fuel-sdk');
    // #endregion string-2
  });

  it('will throw given an input string that is too long or too short', async () => {
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

    // #region string-3
    const longString = 'fuel-sdk-WILL-THROW-ERROR';

    await expect(async () => contract.functions.echo_str_8(longString).call()).rejects.toThrowError(
      'Value length mismatch during encode'
    );

    const shortString = 'THROWS';

    await expect(async () =>
      contract.functions.echo_str_8(shortString).call()
    ).rejects.toThrowError('Value length mismatch during encode');
    // #endregion string-3
  });
});
