import { mkdirSync } from 'fs';

import type { ProgramsToInclude } from '../src/cli';
import { runScaffoldCli, setupProgram } from '../src/cli';

import type { ProjectPaths } from './utils/bootstrapProject';
import { bootstrapProject, cleanupFilesystem, resetFilesystem } from './utils/bootstrapProject';
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

const defaultFlags = ['--pnpm'];

const generateArgs = (programsToInclude: ProgramsToInclude, projectName?: string) => {
  const args = ['', ''];
  if (projectName) {
    args.push(projectName);
  }
  if (programsToInclude.contract) {
    args.push('-c');
  }
  if (programsToInclude.predicate) {
    args.push('-p');
  }
  if (programsToInclude.script) {
    args.push('-s');
  }
  args.push(...defaultFlags);
  return args;
};

/**
 * @group node
 */
describe('CLI', () => {
  const { error } = mockLogger();
  let paths: ProjectPaths;

  beforeEach(() => {
    paths = bootstrapProject(__filename);
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
      const args = generateArgs(programsToInclude, paths.root);

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

  test('create-fuels reports an error if the project directory already exists', async () => {
    const args = generateArgs(
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
    const args = generateArgs(
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
