import type { IFile, IRawAbiTypeRoot, IRawAbiConfigurable } from '../../src/index';
import { AbiTypeGen } from '../../src/index';
import { ProgramTypeEnum } from '../../src/types/enums/ProgramTypeEnum';

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

  const optionType: IRawAbiTypeRoot = {
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

  const types: IRawAbiTypeRoot[] = [
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

  const configurables: IRawAbiConfigurable[] = [
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

  const outputDir = './contracts';

  const typegen = new AbiTypeGen({
    binFiles: includeBinFiles ? binFiles : [],
    abiFiles,
    outputDir,
    programType,
  });

  return { typegen };
}
