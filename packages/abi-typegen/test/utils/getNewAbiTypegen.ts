import type { IFile, JsonAbiType, JsonAbiConfigurable } from '../../src/index';
import { AbiTypeGen } from '../../src/index';
import { ProgramTypeEnum } from '../../src/types/enums/ProgramTypeEnum';

import { DEFAULT_MOCK_VERSIONS } from './mockVersions';

export function getNewAbiTypegen(
  params: {
    programType?: ProgramTypeEnum;
    includeOptionType?: boolean;
    includeMainFunction?: boolean;
    includeBinFiles?: boolean;
  } = {}
) {
  const {
    includeOptionType = false,
    programType = ProgramTypeEnum.CONTRACT,
    includeMainFunction = false,
    includeBinFiles = false,
  } = params;

  const optionType: JsonAbiType = {
    typeId: 3,
    type: 'enum Option',
    components: [
      {
        name: 'None',
        type: 0,
        typeArguments: null,
      },
      {
        name: 'Some',
        type: 2,
        typeArguments: null,
      },
    ],
    typeParameters: [2],
  };

  const types: JsonAbiType[] = [
    {
      typeId: 1,
      type: 'u8',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 2,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
  ];

  if (includeOptionType) {
    types.push(optionType);
  }

  const main = {
    inputs: [
      {
        name: 'params',
        type: 1,
        typeArguments: null,
      },
    ],
    name: 'main',
    output: {
      name: '',
      type: 2,
      typeArguments: null,
    },
  };

  const functions = includeMainFunction ? [main] : [];

  const configurables: JsonAbiConfigurable[] = [
    {
      name: 'configurable',
      configurableType: {
        name: 'configurableType',
        type: 1,
        typeArguments: null,
      },
      offset: 120,
    },
  ];

  const stubAbi = JSON.stringify({ types, functions, configurables }, null, 2);
  const stubBin = '0x000';
  const stubSlot = '[]';

  const abiFiles: IFile[] = [
    {
      path: './first-abi.json',
      contents: stubAbi,
    },
    {
      path: './second-abi.json',
      contents: stubAbi,
    },
  ];

  const binFiles: IFile[] = [
    {
      path: './first.bin',
      contents: stubBin,
    },
    {
      path: './second.bin',
      contents: stubBin,
    },
  ];

  const storageSlotsFiles: IFile[] = [
    {
      path: './slot1.json',
      contents: stubSlot,
    },
    {
      path: './slot2.json',
      contents: stubSlot,
    },
  ];

  const outputDir = './contracts';

  const versions = DEFAULT_MOCK_VERSIONS;

  const typegen = new AbiTypeGen({
    abiFiles,
    binFiles: includeBinFiles ? binFiles : [],
    storageSlotsFiles,
    outputDir,
    programType,
    versions,
  });

  return { typegen };
}
