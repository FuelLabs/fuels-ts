import { AbiTypegenProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import { createAbisForTests } from '../../../test/utils/createAbiForTests';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';

import type { AbiFunction } from './AbiFunction';

/**
 * @group node
 */
describe('Function.ts', () => {
  /*
    Method: `getDeclaration`
  */
  test('should properly get function declaration', () => {
    const [abi] = createAbisForTests(ProgramTypeEnum.CONTRACT, [AbiTypegenProjectsEnum.MINIMAL]);

    const func = abi.functions.find((fn) => fn.name === 'main') as AbiFunction;

    const expectedDecl = 'main: InvokeFunction<[x: string, y: string], boolean>';

    expect(func.getDeclaration()).toEqual(expectedDecl);
    expect(func.attributes.inputs).toEqual('string, string');
    expect(func.attributes.prefixedInputs).toEqual('x: string, y: string');
    expect(func.attributes.output).toEqual('boolean');
  });

  /*
    Inputs / Output
  */
  test('should compute i/o types for Vector', () => {
    const [abi] = createAbisForTests(ProgramTypeEnum.CONTRACT, [
      AbiTypegenProjectsEnum.VECTOR_SIMPLE,
    ]);

    const func = abi.functions.find((fn) => fn.name === 'main') as AbiFunction;

    expect(func.attributes.inputs).toEqual('Vec<BigNumberish>');
    expect(func.attributes.output).toEqual('Vec<number>');
    expect(func.attributes.prefixedInputs).toEqual('x: Vec<BigNumberish>');
  });

  test('should build i/o types for Option', () => {
    const [abi] = createAbisForTests(ProgramTypeEnum.CONTRACT, [
      AbiTypegenProjectsEnum.OPTION_SIMPLE,
    ]);

    const func = abi.functions.find((fn) => fn.name === 'main') as AbiFunction;

    expect(func.attributes.inputs).toEqual('Option<BigNumberish>');
    expect(func.attributes.output).toEqual('Option<number>');
    expect(func.attributes.prefixedInputs).toEqual('x: Option<BigNumberish>');
  });
});
