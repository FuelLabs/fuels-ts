import { basename, join } from 'path';

import { normalize } from '../src/normalize';

import { getForcProject } from './getForcProject';

describe('getForcProject.js', () => {
  const PROJECT_DIR = join(__dirname, 'forc-projects', 'simple');

  it('should get forc project just fine', () => {
    const project = getForcProject(PROJECT_DIR);
    const projectName = basename(PROJECT_DIR);

    const debugDir = join(PROJECT_DIR, 'out', 'debug');
    const tempDir = join(debugDir, '__temp__');

    const abiName = `${projectName}-abi`;
    const abiFileName = `${abiName}.json`;
    const abiPath = join(debugDir, abiFileName);
    const abiNormalizedName = normalize(projectName);

    const binPath = join(debugDir, `${projectName}.bin`);

    expect(project.debugDir).toEqual(debugDir);
    expect(project.tempDir).toEqual(tempDir);

    expect(project.abiName).toEqual(abiName);
    expect(project.abiNormalizedName).toEqual(abiNormalizedName);
    expect(project.abiPath).toEqual(abiPath);
    expect(project.abiContents).toBeTruthy();

    expect(project.binPath).toEqual(binPath);

    expect(project.inputGlobal).toEqual(join(debugDir, '*-abi.json'));
  });
});
