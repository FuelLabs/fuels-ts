import { Command } from 'commander';

import { fuelsConfig } from '../../../test/fixtures/fuels.config';
import { mockLogger } from '../../../test/utils/mockLogger';
import * as loadConfigMod from '../config/loadConfig';
import { Commands } from '../types';

import { withBinaryPaths } from './withBinaryPaths';

const mockAllDeps = (
  params: { configPath?: string; forcPath?: string; fuelCorePath?: string } = {}
) => {
  const { forcPath, fuelCorePath, configPath } = params;

  const command = new Command()
    .command(Commands.versions)
    .option('--path <path>', 'Path to project root', configPath);

  const runVersions = vi.fn();

  const loadUserConfig = vi.spyOn(loadConfigMod, 'loadUserConfig').mockResolvedValue({
    configPath: '/path/to/config',
    userConfig: {
      ...structuredClone(fuelsConfig),
      forcPath,
      fuelCorePath,
    },
  });

  return {
    command,
    runVersions,
    loadUserConfig,
  };
};

/**
 * @group node
 */
describe('withBinaryPaths', () => {
  beforeEach(() => {
    mockLogger();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should load the user config from the path', async () => {
    const configPath = '/path/to/config';
    const { command, runVersions, loadUserConfig } = mockAllDeps({ configPath });

    await withBinaryPaths(command, Commands.versions, runVersions)();

    expect(loadUserConfig).toHaveBeenCalledWith(configPath);
  });

  it('should fallback to default binary paths (undefined)', async () => {
    const expectedPaths = { forcPath: undefined, fuelCorePath: undefined };
    const { command, runVersions } = mockAllDeps();

    await withBinaryPaths(command, Commands.versions, runVersions)();

    expect(runVersions).toHaveBeenCalledWith(expectedPaths);
  });

  it('should use resolved user config paths', async () => {
    const expectedPaths = { forcPath: 'forc', fuelCorePath: 'fuel-core' };
    const { command, runVersions } = mockAllDeps({ ...expectedPaths });

    await withBinaryPaths(command, Commands.versions, runVersions)();

    expect(runVersions).toHaveBeenCalledWith(expectedPaths);
  });

  it(`should debug any errors that occur while loading the user config`, async () => {
    const { debug } = mockLogger();
    const { command, runVersions, loadUserConfig } = mockAllDeps();
    loadUserConfig.mockRejectedValue(new Error('Something happened'));

    await withBinaryPaths(command, Commands.versions, runVersions)();

    expect(debug).toHaveBeenCalledWith('Something happened');
  });

  it(`should error any errors that occur while running the command`, async () => {
    const { error } = mockLogger();
    const { command, runVersions } = mockAllDeps();
    runVersions.mockRejectedValue(new Error('Something happened'));

    await withBinaryPaths(command, Commands.versions, runVersions)();

    expect(error).toHaveBeenCalledWith(new Error('Something happened'));
  });
});
