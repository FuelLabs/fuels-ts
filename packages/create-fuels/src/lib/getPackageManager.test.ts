import { mockLogger } from '../../test/utils/mockLogger';

import type { PackageManager } from './getPackageManager';
import { availablePackageManagers, getPackageManager, packageMangers } from './getPackageManager';

const mockAllDeps = () => {
  const { warn } = mockLogger();

  return {
    warn,
  };
};

const installScenarios: [PackageManager, string][] = [
  ['pnpm', 'pnpm install'],
  ['npm', 'npm install'],
  ['bun', 'bun install'],
];

const runCommand = 'fuels:dev';
const runScenarios: [PackageManager, string][] = [
  ['pnpm', 'pnpm fuels:dev'],
  ['npm', 'npm run fuels:dev'],
  ['bun', 'bun run fuels:dev'],
];

/**
 * @group node
 */
describe('getPackageManager', () => {
  it.each(availablePackageManagers)(
    `should get the correct package manager for %s`,
    async (packageManager: PackageManager) => {
      const expectedPackageManager = packageMangers[packageManager];
      const opts = { [packageManager]: true };

      const result = await getPackageManager(opts);

      expect(result).toEqual(expectedPackageManager);
    }
  );

  it.each(installScenarios)(
    'should have the correct install commands',
    async (packageManager, expectedInstallCommand) => {
      const command = await getPackageManager({ [packageManager]: true });

      const install = command.install;

      expect(install).toEqual(expectedInstallCommand);
    }
  );

  it.each(runScenarios)(
    'should have the correct run commands',
    async (packageManager, expectedRunCommand) => {
      const command = await getPackageManager({ [packageManager]: true });

      const run = command.run(runCommand);

      expect(run).toEqual(expectedRunCommand);
    }
  );

  it('should warn the user if more than one package manager selected', async () => {
    const { warn } = mockAllDeps();
    const opts = { pnpm: true, npm: true };

    await getPackageManager(opts);

    expect(warn).toBeCalledWith('More than one package manager was selected.');
  });

  it('should default to pnpm if no package manager is selected', async () => {
    const packageManager = 'pnpm';
    const expectedPackageManager = packageMangers[packageManager];
    const { warn } = mockAllDeps();
    const opts = {};

    const result = await getPackageManager(opts);

    expect(warn).not.toBeCalled();
    expect(result).toEqual(expectedPackageManager);
  });
});
