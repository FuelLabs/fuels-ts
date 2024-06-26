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
    (packageManager: PackageManager) => {
      const expectedPackageManager = packageMangers[packageManager];
      const opts = { [packageManager]: true };

      const result = getPackageManager(opts);

      expect(result).toEqual(expectedPackageManager);
    }
  );

  it.each(installScenarios)(
    'should have the correct install commands',
    (packageManager, expectedInstallCommand) => {
      const command = getPackageManager({ [packageManager]: true });

      const install = command.install;

      expect(install).toEqual(expectedInstallCommand);
    }
  );

  it.each(runScenarios)(
    'should have the correct run commands',
    (packageManager, expectedRunCommand) => {
      const command = getPackageManager({ [packageManager]: true });

      const run = command.run(runCommand);

      expect(run).toEqual(expectedRunCommand);
    }
  );

  it('should warn the user if more than one package manager selected', () => {
    const { warn } = mockAllDeps();
    const opts = { pnpm: true, npm: true };

    getPackageManager(opts);

    expect(warn).toBeCalledWith('More than one package manager was selected.');
  });

  it('should default to npm if no package manager is selected', () => {
    const packageManager = 'npm';
    const expectedPackageManager = packageMangers[packageManager];
    const { warn } = mockAllDeps();
    const opts = {};

    const result = getPackageManager(opts);

    expect(warn).not.toBeCalled();
    expect(result).toEqual(expectedPackageManager);
  });
});
