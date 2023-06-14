import { randomUUID } from 'crypto';
import { rmSync } from 'fs';
import upperFirst from 'lodash.upperfirst';

import { ForcProjectsEnum, getProjectResources } from '../test/fixtures/forc-projects';

import { run } from './cli';
import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';

function getGeneratedObjectName(fileName: string) {
  return fileName
    .split(/\W/)
    .map((x, i) => (i === 0 ? x : upperFirst(x)))
    .join('');
}

function getProgramTypeOption(type: ProgramTypeEnum | undefined) {
  switch (type) {
    case ProgramTypeEnum.PREDICATE:
      return '-p';
    case ProgramTypeEnum.SCRIPT:
      return '-s';
    case ProgramTypeEnum.CONTRACT:
      return '-c';
    default:
      return '';
  }
}

describe('v2 typegen cli', () => {
  it.each([
    {
      project: ForcProjectsEnum.SCRIPT,
      type: ProgramTypeEnum.SCRIPT,
    },
    {
      project: ForcProjectsEnum.PREDICATE,
      type: ProgramTypeEnum.PREDICATE,
    },
    {
      project: ForcProjectsEnum.FULL,
      type: ProgramTypeEnum.CONTRACT,
    },
    {
      project: ForcProjectsEnum.FULL,
    },
  ])('Creates correct ts file with abi and hexlified binary', async (input) => {
    const project = getProjectResources(input.project);

    const outputFolder = `${project.tempDir}/${randomUUID()}`;

    const programTypeOption = getProgramTypeOption(input.type);

    const argv = [
      'node',
      'fuels-typegen',
      '-i',
      project.abiPath,
      '-o',
      outputFolder,
      '-v2',
      programTypeOption,
    ];

    await run({ argv, programName: 'cli.js:test' });

    const json = (await import(`${outputFolder}/${project.abiName}.ts`))[
      getGeneratedObjectName(project.abiName)
    ];

    rmSync(outputFolder, { recursive: true, force: true });

    const expectedAbi = project.abiContents;
    const expectedBin =
      programTypeOption === '-c' || programTypeOption === '' ? undefined : project.binHelixfied;

    expect(json.abi).toEqual(expectedAbi);
    expect(json.bin).toEqual(expectedBin);
  });
});
