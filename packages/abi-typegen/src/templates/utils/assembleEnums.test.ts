import enumOfEnumsAbiJson from '../../../test/fixtures/out/abis/enum-of-enums-abi.json';
import { Abi } from '../../abi/Abi';

import { assembleEnums } from './assembleEnums';

describe('assembleEnums.ts', () => {
  test('should assemble enums just fine', async () => {
    const abi = new Abi({
      filepath: './enum-simple-abi.json',
      outputDir: './contracts',
      rawContents: enumOfEnumsAbiJson,
    });

    // executing
    const enums = assembleEnums({ types: abi.types });

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
