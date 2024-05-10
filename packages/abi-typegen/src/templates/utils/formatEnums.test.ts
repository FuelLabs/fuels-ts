import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { formatEnums } from './formatEnums';

/**
 * @group node
 */
describe('formatEnums.ts', () => {
  test('should format enums just fine', () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.ENUM_OF_ENUMS);
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
        inputNativeValues: "a = 'a', b = 'b', c = 'c'",
        inputValues: 'a: [], b: [], c: []',
        outputNativeValues: "a = 'a', b = 'b', c = 'c'",
        outputValues: 'a: [], b: [], c: []',
        recycleRef: true,
      },
      {
        structName: 'MyEnum',
        inputNativeValues: undefined,
        inputValues: 'letter: LetterEnumInput',
        outputNativeValues: undefined,
        outputValues: 'letter: LetterEnumOutput',
        recycleRef: false,
      },
    ]);
  });
});
