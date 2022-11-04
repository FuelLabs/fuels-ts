import { contractPaths } from '../../../test/fixtures';
import { executeAndCatch } from '../../../test/utils/executeAndCatch';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import { parseTypes } from '../helpers/types';

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
  test('should build labels for Vector', () => {
    const { rawContents } = compileSwayToJson({
      contractPath: contractPaths.vectorOnly,
      inPlace: true,
    });

    const { types: rawAbiTypes, functions } = rawContents;

    const [rawAbiFunction] = functions;
    const types = parseTypes({ rawAbiTypes });

    const func = new Function({ rawAbiFunction, types });

    expect(func.attributes.name).toEqual(rawAbiFunction.name);
    expect(func.attributes.inputs).toEqual('BigNumberish[]');
    expect(func.attributes.output).toEqual('number[]');
  });

  test('should build labels for Option', () => {
    const { rawContents } = compileSwayToJson({
      contractPath: contractPaths.optionOnly,
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

  test('should throw for Option w/o `typeArguemnts`', async () => {
    const { rawContents } = compileSwayToJson({
      contractPath: contractPaths.optionOnly,
      inPlace: true,
    });

    // mess up with the abi json to provoke the error
    rawContents.functions[0].inputs[0].typeArguments = null;

    const { types: rawAbiTypes, functions } = rawContents;

    const [rawAbiFunction] = functions;
    const types = parseTypes({ rawAbiTypes });

    const fn = () => new Function({ rawAbiFunction, types });
    const { error, result } = await executeAndCatch(fn);

    expect(error).toBeTruthy;
    expect(result).toBeFalsy;
  });

  test('should throw for Vector w/o `typeArguemnts`', async () => {
    const { rawContents } = compileSwayToJson({
      contractPath: contractPaths.vectorOnly,
      inPlace: true,
    });

    // mess up with the abi json to provoke the error
    rawContents.functions[0].inputs[0].typeArguments = null;

    const { types: rawAbiTypes, functions } = rawContents;

    const [rawAbiFunction] = functions;
    const types = parseTypes({ rawAbiTypes });

    const fn = () => new Function({ rawAbiFunction, types });
    const { error, result } = await executeAndCatch(fn);

    expect(error).toBeTruthy;
    expect(result).toBeFalsy;
  });
});
