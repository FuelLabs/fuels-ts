import { mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

import type { ProgramsToInclude } from '../src/cli';
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

const possibleProgramsToInclude: ProgramsToInclude[] = [
  { contract: true, predicate: false, script: false },
  { contract: false, predicate: true, script: false },
  { contract: false, predicate: false, script: true },
  { contract: true, predicate: true, script: false },
  { contract: true, predicate: false, script: true },
  { contract: false, predicate: true, script: true },
  { contract: true, predicate: true, script: true },
];

/**
 * @group node
 */
describe('CLI', () => {
  const { error } = mockLogger();
  let paths: ProjectPaths;

  beforeEach(() => {
    paths = bootstrapProject(__filename);
    copyTemplate(paths.sourceTemplate, paths.template);
  });

  afterEach(() => {
    resetFilesystem(paths.root);
    resetFilesystem(paths.template);
    vi.resetAllMocks();
  });

  afterAll(() => {
    cleanupFilesystem();
  });

  test.each(possibleProgramsToInclude)(
    'create-fuels extracts the template to the specified directory',
    async (programsToInclude) => {
      const args = generateArgv(programsToInclude, paths.root);

      await runScaffoldCli({
        program: setupProgram(),
        args,
        shouldInstallDeps: false,
      });

      let originalTemplateFiles = await getAllFiles(paths.template);
      originalTemplateFiles = filterOriginalTemplateFiles(originalTemplateFiles, programsToInclude);

      const testProjectFiles = await getAllFiles(paths.root);

      expect(originalTemplateFiles.sort()).toEqual(testProjectFiles.sort());
    }
  );

  test('should rewrite for the appropriate package manager', async () => {
    const args = generateArgv(
      {
        contract: true,
        predicate: true,
        script: true,
      },
      paths.root,
      'bun'
    );

    await runScaffoldCli({
      program: setupProgram(),
      args,
      shouldInstallDeps: false,
    });

    const packageJsonPath = join(paths.root, 'package.json');
    const packageJson = readFileSync(packageJsonPath, 'utf-8');
    expect(packageJson).toContain('bun run prebuild');

    const readmePath = join(paths.root, 'README.md');
    const readme = readFileSync(readmePath, 'utf-8');
    expect(readme).toContain('bun run fuels:dev');
    expect(readme).toContain('bun run dev');
  });

  test('create-fuels reports an error if the project directory already exists', async () => {
    const args = generateArgv(
      {
        contract: true,
        predicate: true,
        script: true,
      },
      paths.root
    );

    // Generate the project once
    mkdirSync(paths.root, { recursive: true });

    // Generate the project again
    await runScaffoldCli({
      program: setupProgram(),
      args,
      shouldInstallDeps: false,
    }).catch((e) => {
      expect(e).toBeInstanceOf(Error);
    });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining(`A folder already exists at ${paths.root}`)
    );
  });

  test('create-fuels reports an error if no programs are chosen to be included', async () => {
    const args = generateArgv(
      {
        contract: false,
        predicate: false,
        script: false,
      },
      paths.root
    );

    await runScaffoldCli({
      program: setupProgram(),
      args,
      shouldInstallDeps: false,
      forceDisablePrompts: true,
    }).catch((e) => {
      expect(e).toBeInstanceOf(Error);
    });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining('You must include at least one Sway program.')
    );
  });
});
