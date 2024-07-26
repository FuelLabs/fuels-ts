import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import { formatStructs } from './formatStructs';

/**
 * @group node
 */
describe('formatStructs.ts', () => {
  test('should format structs just fine', () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.STRUCT_SIMPLE);
    const abi = new Abi({
      filepath: './struct-simple-abi.json',
      outputDir: './contracts',
      rawContents: project.abiContents,
      programType: ProgramTypeEnum.CONTRACT,
    });

    // executing
    const { structs } = formatStructs({ types: abi.metadataTypes });

    // validating
    expect(structs).toStrictEqual([
      {
        inputLabel: 'StructAInput<T, U>',
        outputLabel: 'StructAOutput<T, U>',
        inputValues: 'propA1: T, propA2: U',
        outputValues: 'propA1: T, propA2: U',
        recycleRef: true,
      },
      {
        inputLabel: 'StructBInput<T>',
        outputLabel: 'StructBOutput<T>',
        inputValues: 'propB1: T',
        outputValues: 'propB1: T',
        recycleRef: true,
      },
      {
        inputLabel: 'StructCInput',
        outputLabel: 'StructCOutput',
        inputValues: 'propC1: StructAInput<StructBInput<BigNumberish>, BigNumberish>',
        outputValues: 'propC1: StructAOutput<StructBOutput<number>, number>',
        recycleRef: false,
      },
    ]);
  });
});
