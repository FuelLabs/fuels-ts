import type { IFile, IRawAbiTypeRoot } from '../../src/index';
import { AbiTypeGen } from '../../src/index';
import { CategoryEnum } from '../../src/interfaces/CategoryEnum';

export function getNewAbiTypegen(
  params: {
    category?: CategoryEnum;
    includeOptionType?: boolean;
    includeMainFunction?: boolean;
  } = {}
) {
  const {
    includeOptionType = false,
    category = CategoryEnum.CONTRACT,
    includeMainFunction = false,
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

  const stubAbi = JSON.stringify({ types, functions }, null, 2);

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

  const outputDir = './contracts';

  const typegen = new AbiTypeGen({ abiFiles, outputDir, category });

  return { typegen };
}
