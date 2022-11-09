import type { IFunction, IFunctionAttributes } from '../interfaces/IFunction';
import type { IRawAbiFunction } from '../interfaces/IRawAbiFunction';
import type { IType } from '../interfaces/IType';
import { TargetEnum } from '../interfaces/TargetEnum';
import { parseTypeArguments } from '../utils/parseTypeArguments';

export class Function implements IFunction {
  public types: IType[];
  public rawAbiFunction: IRawAbiFunction;
  public attributes: IFunctionAttributes;

  constructor(params: { types: IType[]; rawAbiFunction: IRawAbiFunction }) {
    this.types = params.types;
    this.rawAbiFunction = params.rawAbiFunction;

    this.attributes = {
      name: this.rawAbiFunction.name,
      inputs: this.bundleInputTypes(),
      output: this.bundleOutputTypes(),
      prefixedInputs: this.bundleInputTypes(true),
      prefixedOutput: this.bundleOutputTypes(true),
    };
  }

  bundleInputTypes(prefixForFunctionParams: boolean = false) {
    return parseTypeArguments({
      types: this.types,
      target: TargetEnum.INPUT,
      typeArguments: this.rawAbiFunction.inputs,
      prefixForFunctionParams,
    });
  }

  bundleOutputTypes(prefixForFunctionParams: boolean = false) {
    return parseTypeArguments({
      types: this.types,
      target: TargetEnum.OUTPUT,
      typeArguments: [this.rawAbiFunction.output],
      prefixForFunctionParams,
    });
  }

  getDeclaration() {
    const { name, prefixedInputs, prefixedOutput } = this.attributes;
    const decl = `${name}: InvokeFunction<[${prefixedInputs}], ${prefixedOutput}>;`;
    return decl;
  }
}
