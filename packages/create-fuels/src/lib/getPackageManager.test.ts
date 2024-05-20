import { mockLogger } from '../../test/utils/mockLogger';
import * as promptsMod from '../prompts';

import type { PackageManager } from './getPackageManager';
import { availablePackageManagers, getPackageManager, packageMangerCommands } from './getPackageManager';

const mockAllDeps = (opts: { packageManager?: PackageManager } = {}) => {
  const { warn } = mockLogger();
  const promptForPackageManager = vi
    .spyOn(promptsMod, 'promptForPackageManager')
    .mockResolvedValue(opts.packageManager);

  return {
    warn,
    promptForPackageManager,
  };
};

/**
 * @group node
 */
describe('getPackageManager', () => {
  it.each(availablePackageManagers)(
    `should return '%s' from the options`,
    async (packageManager: PackageManager) => {
      const opts = { [packageManager]: true };

      const result = await getPackageManager(opts);

      expect(result).toEqual(packageManager);
    }
  );

  it('should warn the user if more than one package manager selected', async () => {
    const { warn, promptForPackageManager } = mockAllDeps();
    const opts = { pnpm: true, npm: true };

    await getPackageManager(opts);

    expect(promptForPackageManager).toBeCalled();
    expect(warn).toBeCalledWith('More than one package manager was selected.');
  });

  it('should allow inputting of a package manager via prompt', async () => {
    const expectedPackageManager = 'npm';
    const { warn, promptForPackageManager } = mockAllDeps({
      packageManager: expectedPackageManager,
    });
    const opts = {};

    const result = await getPackageManager(opts);

    expect(warn).not.toBeCalled();
    expect(promptForPackageManager).toBeCalled();
    expect(result).toEqual(expectedPackageManager);
  });

  it('should default to pnpm if no package manager is selected', async () => {
    const expectedDefaultPackageManager = 'pnpm';
    const { warn, promptForPackageManager } = mockAllDeps();
    const opts = {};

    const result = await getPackageManager(opts);

    expect(warn).not.toBeCalled();
    expect(promptForPackageManager).toBeCalled();
    expect(result).toEqual(expectedDefaultPackageManager);
  });

  describe('packageManagerCommands', () => {
    const installScenarios: [PackageManager, string][] = [
      ['pnpm', 'pnpm install'],
      ['npm', 'npm install'],
      ['bun', 'bun install'],
    ]

    it.each(installScenarios)('should have the correct install commands', (packageManager, expectedInstallCommand) => {
      const command = packageMangerCommands[packageManager];

      const install = command.install;

      expect(install).toEqual(expectedInstallCommand);
    });

    const runCommand = 'fuels:dev';
    const runScenarios: [PackageManager, string][] = [
      ['pnpm', 'pnpm fuels:dev'],
      ['npm', 'npm run fuels:dev'],
      ['bun', 'bun run fuels:dev'],
    ]

    it.each(runScenarios)('should have the correct run commands', (packageManager, expectedRunCommand) => {
      const command = packageMangerCommands[packageManager as PackageManager];

      const run = command.run(runCommand);

      expect(run).toEqual(expectedRunCommand);
    });
  });
});
