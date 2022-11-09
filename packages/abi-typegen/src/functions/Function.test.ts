import { contractPaths } from '../../test/fixtures';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import { parseTypes } from '../utils/parseTypes';

import { Function } from './Function';

describe('Function.ts', () => {
  /*
    Method: `getDeclaration`
  */
  test('should properly get function declaration', () => {
    const { rawContents } = compileSwayToJson({
      contractPath: contractPaths.minimal,
      inPlace: true,
    });

    const { types: rawAbiTypes, functions } = rawContents;

    const [rawAbiFunction] = functions;
    const types = parseTypes({ rawAbiTypes });

    const func = new Function({ rawAbiFunction, types });

    const expectedDecl = 'hello: InvokeFunction<[string], string>;';

    expect(func.getDeclaration()).toEqual(expectedDecl);
  });

  /*
    Inputs / Output
  */
  test('should compute i/o types for Vector', () => {
    const { rawContents } = compileSwayToJson({
      contractPath: contractPaths.vectorSimple,
      inPlace: true,
    });

    const { types: rawAbiTypes, functions } = rawContents;

    const [rawAbiFunction] = functions;
    const types = parseTypes({ rawAbiTypes });

    const func = new Function({ rawAbiFunction, types });

    expect(func.attributes.name).toEqual(rawAbiFunction.name);
    expect(func.attributes.inputs).toEqual('Vec<BigNumberish>');
    expect(func.attributes.output).toEqual('Vec<number>');
  });

  test('should build i/o types for Option', () => {
    const { rawContents } = compileSwayToJson({
      contractPath: contractPaths.optionSimple,
      inPlace: true,
    });

    const { types: rawAbiTypes, functions } = rawContents;

    const [rawAbiFunction] = functions;
    const types = parseTypes({ rawAbiTypes });

    const func = new Function({ rawAbiFunction, types });

    expect(func.attributes.name).toEqual(rawAbiFunction.name);
    expect(func.attributes.inputs).toEqual('Option<BigNumberish>');
    expect(func.attributes.output).toEqual('Option<number>');
  });
});
