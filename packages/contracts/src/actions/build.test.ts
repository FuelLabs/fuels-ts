import { build } from './build';

jest.mock('../services', () => {
  const original = jest.requireActual('../services');
  return {
    ...original,
    forcVersion: jest.fn(),
    forcBuild: jest.fn(),
  };
});

jest.mock('../utils', () => {
  const original = jest.requireActual('../utils');
  return {
    ...original,
    logSection: jest.fn(),
  };
});

describe('Deploy Action', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('build action should call forcVersion, forcBuild with workspace config', async () => {
    await build({
      basePath: '/root',
      workspace: '/root/contracts',
      contracts: [],
      output: '/types',
    });
    const services = jest.requireMock('../services');
    const utils = jest.requireMock('../utils');
    expect(utils.logSection).toHaveBeenCalledWith('🧰 Building contracts...');
    expect(services.forcVersion).toHaveBeenCalledTimes(1);
    expect(services.forcBuild).toHaveBeenCalledWith('/root/contracts');
  });

  it('build action should call forcVersion, forcBuild with contracts config', async () => {
    await build({
      basePath: '/root',
      contracts: ['/root/contracts/foo', '/root/contracts/bar'],
      output: '/types',
    });
    const services = jest.requireMock('../services');
    const utils = jest.requireMock('../utils');
    expect(utils.logSection).toHaveBeenCalledWith('🧰 Building contracts...');
    expect(services.forcVersion).toHaveBeenCalledTimes(1);
    expect(services.forcBuild).toHaveBeenCalledWith('/root/contracts/foo');
    expect(services.forcBuild).toHaveBeenCalledWith('/root/contracts/bar');
  });
});
