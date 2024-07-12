import { readFileSync } from 'fs';
import { join } from 'path';

import {
  bootstrapProject,
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
    copyTemplate(paths.sourceTemplate, paths.template, false);
  });

  afterEach(() => {
    resetFilesystem(paths.root);
    resetFilesystem(paths.template);
    vi.resetAllMocks();
  });

  it('should rewrite the package.json', () => {
    const packageJsonPath = join(paths.template, 'package.json');

    rewriteTemplateFiles(paths.template);

    const packageJson = readFileSync(packageJsonPath, 'utf-8');

    expect(packageJson).not.toContain('"xprebuild": "fuels build"');
    expect(packageJson).toContain('"prebuild": "fuels build"');
    expect(packageJson).not.toContain('"build": "pnpm run xprebuild && next build"');
    expect(packageJson).toContain('"build": "pnpm run prebuild && next build"');
    expect(packageJson).not.toContain(`"fuels": "workspace:\\*"`);
    expect(packageJson).toContain(`"fuels": "^0.0.0"`);
  });

  it('should rewrite the fuels.config.ts', () => {
    const fuelsConfigPath = join(paths.template, 'fuels.config.ts');

    rewriteTemplateFiles(paths.template);

    const fuelsConfig = readFileSync(fuelsConfigPath, 'utf-8');

    expect(fuelsConfig).not.toContain(/\n\W+forcPath: 'fuels-forc',/g);
    expect(fuelsConfig).not.toContain(/\n\W+fuelCorePath: 'fuels-core',/g);
  });

  it('should rewrite the test files', () => {
    const testDir = join(paths.template, 'test');
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

    rewriteTemplateFiles(paths.template);

    programs.forEach(({ program, capitalised }) => {
      const testFilePath = join(testDir, `${program}.test.ts`);
      const testFileContents = readFileSync(testFilePath, 'utf-8');

      expect(testFileContents).not.toContain('@group node');
      expect(testFileContents).not.toContain('@group browser');
      expect(testFileContents).toContain(`${capitalised} Testing`);
    });
  });
});
