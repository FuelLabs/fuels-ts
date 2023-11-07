import { TestNodeLauncher } from '@fuel-ts/test-utils';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  beforeAll(async (ctx) => {
    await TestNodeLauncher.prepareCache(ctx.tasks.length);

    return () => TestNodeLauncher.killCachedNodes();
  });

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
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-values')],
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
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-values')],
    });
    const {
      contracts: [contract],
    } = launched;

    const { minGasPrice: gasPrice } = contract.provider.getGasConfig();

    // #region string-3
    const longString = 'fuel-sdk-WILL-THROW-ERROR';

    await expect(async () =>
      contract.functions.echo_str_8(longString).txParams({ gasPrice }).call()
    ).rejects.toThrowError('Value length mismatch during encode');

    const shortString = 'THROWS';

    await expect(async () =>
      contract.functions.echo_str_8(shortString).txParams({ gasPrice }).call()
    ).rejects.toThrowError('Value length mismatch during encode');
    // #endregion string-3
  });
});
