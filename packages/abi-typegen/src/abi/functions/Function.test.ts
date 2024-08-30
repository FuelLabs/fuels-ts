import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import { parseTypes } from '../../utils/parseTypes';

import { Function } from './Function';

/**
 * @group node
 */
describe('Function.ts', () => {
  /*
    Method: `getDeclaration`
  */
  test('should properly get function declaration', () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.MINIMAL, { transpile: true });

    const { types: rawAbiTypes, functions } = project.abiContents;

    const [rawAbiFunction] = functions;
    const types = parseTypes({ rawAbiTypes });

    const func = new Function({ rawAbiFunction, types });

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
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.VECTOR_SIMPLE, {
      transpile: true,
    });

    const { types: rawAbiTypes, functions } = project.abiContents;

    const [rawAbiFunction] = functions;
    const types = parseTypes({ rawAbiTypes });

    const func = new Function({ rawAbiFunction, types });

    expect(func.name).toEqual(rawAbiFunction.name);
    expect(func.attributes.inputs).toEqual('Vec<BigNumberish>');
    expect(func.attributes.output).toEqual('Vec<number>');
    expect(func.attributes.prefixedInputs).toEqual('x: Vec<BigNumberish>');
  });

  test('should build i/o types for Option', () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.OPTION_SIMPLE, {
      transpile: true,
    });

    const { types: rawAbiTypes, functions } = project.abiContents;

    const [rawAbiFunction] = functions;
    const types = parseTypes({ rawAbiTypes });

    const func = new Function({ rawAbiFunction, types });

    expect(func.name).toEqual(rawAbiFunction.name);
    expect(func.attributes.inputs).toEqual('Option<BigNumberish>');
    expect(func.attributes.output).toEqual('Option<number>');
    expect(func.attributes.prefixedInputs).toEqual('x?: Option<BigNumberish>');
  });
});
