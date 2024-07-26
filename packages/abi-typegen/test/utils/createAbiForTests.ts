import type { ProgramTypeEnum } from '../../src';
import { Abi } from '../../src/abi/Abi';
import type { AbiTypegenProjectsEnum } from '../fixtures/forc-projects';
import { getTypegenForcProject } from '../fixtures/forc-projects';

export function createAbisForTests(
  programType: ProgramTypeEnum,
  projects: AbiTypegenProjectsEnum[]
): Abi[] {
  const outputDir = './directory';
  return projects.map((project) => {
    const { abiPath, abiContents } = getTypegenForcProject(project);
    return new Abi({
      filepath: abiPath,
      programType,
      rawContents: abiContents,
      outputDir,
    });
  });
}
