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
      '0x7400000347000000000000000000003c5dfcc00110fff3005d4060495d47f000134904407648000272f0007b36f000001aec50009100000024040000000000002151bd4b'
    );

    expect(project.inputGlobal).toEqual(join(debugDir, '*-abi.json'));
  });
});
