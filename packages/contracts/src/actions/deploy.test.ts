import { mockForcFiles } from '../../tests/mocks/mockForcFiles';
import type { DeployContractOptions } from '../types';

import { deploy } from './deploy';

jest.mock('../services', () => {
  const original = jest.requireActual('../services');
  return {
    ...original,
    deployContract: jest.fn().mockImplementation(() => Promise.resolve('0x01')),
  };
});

jest.mock('../utils', () => {
  const original = jest.requireActual('../utils');
  return {
    ...original,
    saveContractIds: jest.fn(),
    logSection: jest.fn(),
  };
});

describe('Build Action', () => {
  const config = {
    privateKey: '0x0000000000000000000000000000000000000000000000000000000000000001',
    deployConfig: {
      gasPrice: 2,
    },
    providerUrl: 'http://localhost:9999/graphql',
    basePath: '/root',
    workspace: '/root/project',
    contracts: ['/root/project/foo', '/root/project/bar'],
    predicates: ['/root/project/predicate'],
    scripts: ['/root/project/script'],
    output: '/root/types',
  };

  beforeAll(() => {
    // Mock forcFiles
    mockForcFiles();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function expectDeployContractCall(
    callNth: number,
    path: string,
    deployOptions: DeployContractOptions
  ) {
    const services = jest.requireMock('../services');
    const [wallet, binaryPath, deployConfig] = services.deployContract.mock.calls[callNth];
    expect(wallet.privateKey).toBe(config.privateKey);
    expect(binaryPath).toBe(path);
    expect(deployConfig).toEqual(deployOptions);
  }

  it('deploy action should call deploy with correct config', async () => {
    // Deploy using config
    await deploy(config);

    // Check mocks were correct called
    const services = jest.requireMock('../services');
    const utils = jest.requireMock('../utils');

    // Check if logSection was called with correct providerUrl
    expect(utils.logSection).toHaveBeenCalledWith(
      `🔗 Deploying contracts to ${config.providerUrl}...`
    );

    // Expect deployContract to be called twice
    expect(services.deployContract).toHaveBeenCalledTimes(2);
    expectDeployContractCall(0, '/root/project/foo/out/debug/foo_bar.bin', config.deployConfig);
    expectDeployContractCall(1, '/root/project/bar/out/debug/bar_foo.bin', config.deployConfig);

    // Check if saveContractIds was called with correct contracts names
    expect(utils.logSection).toHaveBeenCalledWith('🟦 Save contract ids...');
    expect(utils.saveContractIds).toHaveBeenCalledWith(
      [
        { name: 'fooBar', contractId: '0x01' },
        { name: 'barFoo', contractId: '0x01' },
      ],
      config.output
    );
  });

  it('deploy action should call deployConfig function if defined', async () => {
    // Deploy using config
    const deployConfigValue = {
      gasPrice: 5,
    };
    const deployConfig = {
      ...config,
      deployConfig: () => deployConfigValue,
    };
    const mockDeployConfig = jest.spyOn(deployConfig, 'deployConfig');
    await deploy(deployConfig);

    // Check mocks were correct called
    const services = jest.requireMock('../services');

    // Check if deployConfig was called with correct params
    expect(mockDeployConfig).toHaveBeenCalledWith({
      contracts: [],
      contractName: 'fooBar',
      contractPath: '/root/project/foo',
    });
    // Check if in the second deploy the contracts array contain
    // the previous contract deployed
    expect(mockDeployConfig).toHaveBeenCalledWith({
      contracts: [{ name: 'fooBar', contractId: '0x01' }],
      contractName: 'barFoo',
      contractPath: '/root/project/bar',
    });

    // Expect deployContract to be called twice
    expect(services.deployContract).toHaveBeenCalledTimes(2);
    expectDeployContractCall(0, '/root/project/foo/out/debug/foo_bar.bin', deployConfigValue);
    expectDeployContractCall(1, '/root/project/bar/out/debug/bar_foo.bin', deployConfigValue);
  });

  it('deploy action should resolve if no contracts are passed', async () => {
    // Deploy using config
    await deploy({
      ...config,
      contracts: [],
    });

    // Check mocks were correct called
    const utils = jest.requireMock('../utils');

    expect(utils.logSection).toHaveBeenCalledWith(`🔗 No contracts to deploy`);
  });
});
