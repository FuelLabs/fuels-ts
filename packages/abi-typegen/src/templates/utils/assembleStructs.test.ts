import structSimpleAbiJson from '../../../test/fixtures/out/abis/struct-simple-abi.json';
import { Abi } from '../../abi/Abi';

import { assembleStructs } from './assembleStructs';

describe('assembleStructs.ts', () => {
  test('should assemble structs just fine', async () => {
    const abi = new Abi({
      filepath: './struct-simple-abi.json',
      outputDir: './contracts',
      rawContents: structSimpleAbiJson,
    });

    // executing
    const structs = assembleStructs({ types: abi.types });

    // validating
    expect(structs).toStrictEqual([
      {
        structName: 'StructA',
        typeAnnotations: '<T, U>',
        inputValues: 'propA1: T, propA2: U',
        outputValues: 'propA1: T, propA2: U',
        recycleRef: true,
      },
      {
        structName: 'StructB',
        typeAnnotations: '<T>',
        inputValues: 'propB1: T',
        outputValues: 'propB1: T',
        recycleRef: true,
      },
      {
        structName: 'StructC',
        typeAnnotations: '',
        inputValues: 'propC1: StructAInput<StructBInput<BigNumberish>, BigNumberish>',
        outputValues: 'propC1: StructAOutput<StructBOutput<number>, number>',
        recycleRef: false,
      },
    ]);
  });
});
