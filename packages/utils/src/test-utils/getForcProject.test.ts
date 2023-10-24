import { basename, join } from 'path';

import { getForcProject } from '../../dist/test-utils';
import { normalizeString } from '../utils/normalizeString';

import {
  AbiTypegenProjectsEnum,
  DocSnippetProjectsEnum,
  ForcProjectDirsEnum,
  FuelGaugeProjectsEnum,
} from './types/enums';

describe('getForcProject', () => {
  it('should get forc project just fine (DOC SNIPPET PROJECT)', () => {
    const PROJECT_DIR = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'apps',
      'docs-snippets',
      'projects',
      'simple-predicate'
    );

    const project = getForcProject({
      dir: ForcProjectDirsEnum.DOCS_SNIPPETS,
      projectName: DocSnippetProjectsEnum.SIMPLE_PREDICATE,
    });

    const projectName = basename(PROJECT_DIR);

    const debugDir = join(PROJECT_DIR, 'out', 'debug');
    const tempDir = join(debugDir, '__temp__');

    const abiName = `${projectName}-abi`;
    const abiFileName = `${abiName}.json`;
    const abiPath = join(debugDir, abiFileName);
    const normalizedName = normalizeString(projectName);

    const binPath = join(debugDir, `${projectName}.bin`);

    expect(project.debugDir).toEqual(debugDir);
    expect(project.tempDir).toEqual(tempDir);

    expect(project.abiName).toEqual(abiName);
    expect(project.normalizedName).toEqual(normalizedName);
    expect(project.abiPath).toEqual(abiPath);
    expect(project.abiContents).toBeTruthy();

    expect(project.binPath).toEqual(binPath);
    expect(project.binHexlified).toEqual(
      '0x740000034700000000000000000000605dfcc00110fff3001aec5000910000007144000361491101764800026141110d74000007724c0002134924c05a492001764800026141111f74000001240000005d47f00410451300a141046024400000fc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d40000000000000060'
    );

    expect(project.inputGlobal).toEqual(join(debugDir, '*-abi.json'));
  });

  it('should get forc project just fine (ABI TYPEGEN PROJECTS)', () => {
    const PROJECT_DIR = join(
      __dirname,
      '..',
      '..',
      '..',
      'abi-typegen',
      'test',
      'fixtures',
      'forc-projects',
      'predicate'
    );

    const project = getForcProject({
      dir: ForcProjectDirsEnum.ABI_TYPEGEN,
      projectName: AbiTypegenProjectsEnum.PREDICATE,
    });

    const projectName = basename(PROJECT_DIR);

    const debugDir = join(PROJECT_DIR, 'out', 'debug');
    const tempDir = join(debugDir, '__temp__');

    const abiName = `${projectName}-abi`;
    const abiFileName = `${abiName}.json`;
    const abiPath = join(debugDir, abiFileName);
    const normalizedName = normalizeString(projectName);

    const binPath = join(debugDir, `${projectName}.bin`);

    expect(project.debugDir).toEqual(debugDir);
    expect(project.tempDir).toEqual(tempDir);

    expect(project.abiName).toEqual(abiName);
    expect(project.normalizedName).toEqual(normalizedName);
    expect(project.abiPath).toEqual(abiPath);
    expect(project.abiContents).toBeTruthy();

    expect(project.binPath).toEqual(binPath);
    expect(project.binHexlified).toEqual(
      '0x740000034700000000000000000000745dfcc00110fff3001aec5000910000007144000361491101764800026141110d74000007724c0002134924c05a492001764800026141111f74000001240000005d450000134510407644000174000004504100085d4100005d47f00013450440244400000000000000000064'
    );

    expect(project.inputGlobal).toEqual(join(debugDir, '*-abi.json'));
  });

  it('should get forc project just fine (FUEL GAUGE PROJECTS)', () => {
    const PROJECT_DIR = join(
      __dirname,
      '..',
      '..',
      '..',
      'fuel-gauge',
      'fixtures',
      'forc-projects',
      'predicate-false'
    );

    const project = getForcProject({
      dir: ForcProjectDirsEnum.FUEL_GAUGE,
      projectName: FuelGaugeProjectsEnum.PREDICATE_FALSE,
    });

    const projectName = basename(PROJECT_DIR);

    const debugDir = join(PROJECT_DIR, 'out', 'debug');
    const tempDir = join(debugDir, '__temp__');

    const abiName = `${projectName}-abi`;
    const abiFileName = `${abiName}.json`;
    const abiPath = join(debugDir, abiFileName);
    const normalizedName = normalizeString(projectName);

    const binPath = join(debugDir, `${projectName}.bin`);

    expect(project.debugDir).toEqual(debugDir);
    expect(project.tempDir).toEqual(tempDir);

    expect(project.abiName).toEqual(abiName);
    expect(project.normalizedName).toEqual(normalizedName);
    expect(project.abiPath).toEqual(abiPath);
    expect(project.abiContents).toBeTruthy();

    expect(project.binPath).toEqual(binPath);
    expect(project.binHexlified).toEqual(
      '0x740000034700000000000000000000245dfcc00110fff3001aec50009100000024000000'
    );

    expect(project.inputGlobal).toEqual(join(debugDir, '*-abi.json'));
  });
});
