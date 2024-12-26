import type { PackageManager } from './getPackageManager';
import { availablePackageManagers, getPackageManager, packageMangers } from './getPackageManager';

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
  beforeEach(() => {
    delete process.env.npm_config_user_agent;
  });

  it.each(availablePackageManagers)(
    `should get the correct package manager for %s`,
    (packageManager: PackageManager) => {
      const expectedPackageManager = packageMangers[packageManager];

      process.env.npm_config_user_agent = packageManager;

      const result = getPackageManager();

      expect(result).toEqual(expectedPackageManager);
    }
  );

  it.each(installScenarios)(
    'should have the correct install commands',
    (packageManager, expectedInstallCommand) => {
      process.env.npm_config_user_agent = packageManager;

      const command = getPackageManager();

      const install = command.install;

      expect(install).toEqual(expectedInstallCommand);
    }
  );

  it.each(runScenarios)(
    'should have the correct run commands',
    (packageManager, expectedRunCommand) => {
      process.env.npm_config_user_agent = packageManager;

      const command = getPackageManager();

      const run = command.run(runCommand);

      expect(run).toEqual(expectedRunCommand);
    }
  );

  it('should default to npm', () => {
    const packageManager = 'npm';
    const expectedPackageManager = packageMangers[packageManager];

    const result = getPackageManager();

    expect(result).toEqual(expectedPackageManager);
  });
});
