import { readFileSync } from 'fs';
import { join } from 'path';

import {
  bootstrapProject,
  cleanupFilesystem,
  copyTemplate,
  resetFilesystem,
  type ProjectPaths,
} from '../../test/utils/bootstrapProject';

import { rewriteTemplateFiles } from './rewriteTemplateFiles';

vi.mock('@fuel-ts/versions', () => ({
  versions: {
    FUELS: '^0.0.0',
  },
}));

/**
 * @group node
 */
describe('rewriteTemplateFiles', () => {
  let paths: ProjectPaths;

  beforeEach(() => {
    paths = bootstrapProject(__filename);
    copyTemplate(paths.templateSource, paths.templateRoot, false);
  });

  afterEach(() => {
    resetFilesystem(paths.projectRoot);
    resetFilesystem(paths.templateRoot);
    vi.resetAllMocks();
  });

  afterAll(() => {
    cleanupFilesystem();
  });

  it('should rewrite the package.json', () => {
    const packageJsonPath = join(paths.templateRoot, 'package.json');

    rewriteTemplateFiles(paths.templateRoot);

    const packageJson = readFileSync(packageJsonPath, 'utf-8');

    expect(packageJson).not.toContain('"xprebuild": "fuels build"');
    expect(packageJson).toContain('"prebuild": "fuels build"');
    expect(packageJson).not.toContain('"build": "pnpm run xprebuild && next build"');
    expect(packageJson).toContain('"build": "pnpm run prebuild && next build"');
    expect(packageJson).not.toContain(`"fuels": "workspace:\\*"`);
    expect(packageJson).toContain(`"fuels": "^0.0.0"`);
  });

  it('should rewrite the fuels.config.ts', () => {
    const fuelsConfigPath = join(paths.templateRoot, 'fuels.config.ts');

    rewriteTemplateFiles(paths.templateRoot);

    const fuelsConfig = readFileSync(fuelsConfigPath, 'utf-8');

    expect(fuelsConfig).not.toContain(/\n\W+forcPath: 'fuels-forc',/g);
    expect(fuelsConfig).not.toContain(/\n\W+fuelCorePath: 'fuels-core',/g);
  });

  it('should rewrite the test files', () => {
    const testDir = join(paths.templateRoot, 'test');
    const programs = [
      {
        program: 'contract',
        capitalised: 'Contract',
      },
      {
        program: 'predicate',
        capitalised: 'Predicate',
      },
      {
        program: 'script',
        capitalised: 'Script',
      },
    ];

    rewriteTemplateFiles(paths.templateRoot);

    programs.forEach(({ program, capitalised }) => {
      const testFilePath = join(testDir, `${program}.test.ts`);
      const testFileContents = readFileSync(testFilePath, 'utf-8');

      expect(testFileContents).not.toContain('@group node');
      expect(testFileContents).not.toContain('@group browser');
      expect(testFileContents).toContain(`${capitalised} Testing`);
    });
  });
});
