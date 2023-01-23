import type { IFile } from '../../src/index';
import { AbiTypeGen } from '../../src/index';
import { CategoryEnum } from '../../src/interfaces/CategoryEnum';

export function getNewAbiTypegen(
  params: {
    category?: CategoryEnum;
    includeOptionType?: boolean;
  } = {}
) {
  const { includeOptionType = false, category = CategoryEnum.CONTRACT } = params;

  const optionTypes = [
    {
      typeId: 1,
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
    },
    {
      typeId: 2,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
  ];

  const types = includeOptionType ? optionTypes : [];

  const stubAbi = JSON.stringify({ types, functions: [] }, null, 2);

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
