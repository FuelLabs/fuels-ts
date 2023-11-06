import { getDeployConfig } from './getDeployConfig';

/**
 * @group node
 */
describe('getDeployConfig', () => {
  test('deploy options as object', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deployConfig: any = { itWorked: true };

    const resolved = await getDeployConfig(deployConfig, {
      contracts: [],
      contractName: 'something',
      contractPath: 'something',
    });

    expect(resolved).toEqual(deployConfig);
  });

  test('deploy options as a function', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deployConfig: any = { itWorked: true };

    const resolved = await getDeployConfig((..._) => deployConfig, {
      contracts: [],
      contractName: 'something',
      contractPath: 'something',
    });

    expect(resolved).toEqual(deployConfig);
  });
});
