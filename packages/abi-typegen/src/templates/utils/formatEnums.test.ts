import { getProjectResources, ForcProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { formatEnums } from './formatEnums';

describe('formatEnums.ts', () => {
  test('should format enums just fine', async () => {
    const project = getProjectResources(ForcProjectsEnum.ENUM_OF_ENUMS);

    const abi = new Abi({
      filepath: './enum-simple-abi.json',
      outputDir: './contracts',
      rawContents: project.abiContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    // executing
    const { enums } = formatEnums({ types: abi.types });

    // validating
    expect(enums).toStrictEqual([
      {
        structName: 'LetterEnum',
        inputValues: 'a: [], b: [], c: []',
        outputValues: 'a: [], b: [], c: []',
        recycleRef: true,
      },
      {
        structName: 'MyEnum',
        inputValues: 'letter: LetterEnumInput',
        outputValues: 'letter: LetterEnumOutput',
        recycleRef: false,
      },
    ]);
  });
});
