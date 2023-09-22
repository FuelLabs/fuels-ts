import { getDeployConfig } from './getDeployConfig';

describe('Utils getDeployConfig', () => {
  it('Get deployConfig from object', async () => {
    const config = await getDeployConfig(
      {
        gasPrice: 1,
      },
      {
        contractName: 'name',
        contractPath: 'path',
        contracts: [],
      }
    );
    expect(config).toEqual({
      gasPrice: 1,
    });
  });

  it('Get deployConfig from function', async () => {
    const deployConfigMock = jest.fn().mockReturnValue({
      gasPrice: 3,
    });
    const options = {
      contractName: 'name',
      contractPath: 'path',
      contracts: [],
    };
    const config = await getDeployConfig(deployConfigMock, options);
    expect(deployConfigMock).toHaveBeenCalledWith(options);
    expect(config).toEqual({
      gasPrice: 3,
    });
  });

  it('Get deployConfig from async function', async () => {
    // Simulate async function to resolve deployConfig
    const deployConfigMock = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              gasPrice: 4,
            });
          }, 1000);
        })
    );
    const options = {
      contractName: 'name',
      contractPath: 'path',
      contracts: [],
    };
    const config = await getDeployConfig(deployConfigMock, options);
    expect(deployConfigMock).toHaveBeenCalledWith(options);
    expect(config).toEqual({
      gasPrice: 4,
    });
  });
});
