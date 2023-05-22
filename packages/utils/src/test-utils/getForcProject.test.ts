import { basename, join } from 'path';

import { normalizeString } from '../utils/normalizeString';

import { getForcProject } from './getForcProject';

describe('getForcProject.js', () => {
  const PROJECT_DIR = join(__dirname, '..', '..', 'test', 'forc-projects', 'simple');

  it('should get forc project just fine', () => {
    const project = getForcProject(PROJECT_DIR);
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
      '0x900000044700000000000000000000345dfcc00110fff3005d4060495d47f000134904407348000c72f0007b36f0000024040000000000002151bd4b'
    );

    expect(project.inputGlobal).toEqual(join(debugDir, '*-abi.json'));
  });
});
