import enumOfEnumsAbiJson from '../../../test/fixtures/out/abis/enum-of-enums-abi.json';
import { Abi } from '../../abi/Abi';
import { CategoryEnum } from '../../types/enums/CategoryEnum';

import { formatEnums } from './formatEnums';

describe('formatEnums.ts', () => {
  test('should format enums just fine', async () => {
    const abi = new Abi({
      filepath: './enum-simple-abi.json',
      outputDir: './contracts',
      rawContents: enumOfEnumsAbiJson,
      category: CategoryEnum.CONTRACT,
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
