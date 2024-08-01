import { versions } from '@fuel-ts/versions';
import toml from '@iarna/toml';
import { mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

import { runScaffoldCli, setupProgram } from '../src/cli';

import type { ProjectPaths } from './utils/bootstrapProject';
import {
  bootstrapProject,
  cleanupFilesystem,
  copyTemplate,
  resetFilesystem,
} from './utils/bootstrapProject';
import { generateArgv } from './utils/generateArgs';
import { mockLogger } from './utils/mockLogger';
import { filterOriginalTemplateFiles, getAllFiles } from './utils/templateFiles';

/**
 * @group node
 */
describe('CLI', { timeout: 15_000 }, () => {
  const { error } = mockLogger();
  let paths: ProjectPaths;

  beforeEach(() => {
    paths = bootstrapProject(__filename);
    copyTemplate(paths.templateSource, paths.templateRoot);
  });

  afterEach(() => {
    resetFilesystem(paths.projectRoot);
    resetFilesystem(paths.templateRoot);
    vi.resetAllMocks();
  });

  afterAll(() => {
    cleanupFilesystem();
  });

  test('create-fuels extracts the template to the specified directory', async () => {
    const args = generateArgv(paths.projectRoot);

    await runScaffoldCli({
      program: setupProgram(),
      templateName: paths.templateName,
      args,
    });

    let originalTemplateFiles = await getAllFiles(paths.templateSource);
    originalTemplateFiles = filterOriginalTemplateFiles(originalTemplateFiles);

    const testProjectFiles = await getAllFiles(paths.projectRoot);

    expect(originalTemplateFiles.sort()).toEqual(testProjectFiles.sort());
  });

  test('create-fuels checks the versions on the fuel-toolchain file', async () => {
    const args = generateArgv(paths.projectRoot);

    await runScaffoldCli({
      program: setupProgram(),
      templateName: paths.templateName,
      args,
    });

    const fuelToolchainPath = join(paths.projectRoot, 'sway-programs', 'fuel-toolchain.toml');
    const fuelToolchain = readFileSync(fuelToolchainPath, 'utf-8');
    const parsedFuelToolchain = toml.parse(fuelToolchain);

    const { toolchain, components } = parsedFuelToolchain;

    expect(toolchain).toEqual({ channel: 'testnet' });
    expect(components).toEqual({ forc: versions.FORC, 'fuel-core': versions.FUEL_CORE });
  });

  test('should rewrite for the appropriate package manager', async () => {
    const args = generateArgv(paths.projectRoot, 'bun');

    await runScaffoldCli({
      program: setupProgram(),
      templateName: paths.templateName,
      args,
    });

    const packageJsonPath = join(paths.projectRoot, 'package.json');
    const packageJson = readFileSync(packageJsonPath, 'utf-8');
    expect(packageJson).toContain('bun run prebuild');

    const readmePath = join(paths.projectRoot, 'README.md');
    const readme = readFileSync(readmePath, 'utf-8');
    expect(readme).toContain('bun run fuels:dev');
    expect(readme).toContain('bun run dev');
  });

  test('create-fuels reports an error if the project directory already exists', async () => {
    const args = generateArgv(paths.projectRoot);

    // Generate the project once
    mkdirSync(paths.projectRoot, { recursive: true });

    // Generate the project again
    await runScaffoldCli({
      program: setupProgram(),
      templateName: paths.templateName,
      args,
    }).catch((e) => {
      expect(e).toBeInstanceOf(Error);
    });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining(`A folder already exists at ${paths.projectRoot}`)
    );
  });
});
