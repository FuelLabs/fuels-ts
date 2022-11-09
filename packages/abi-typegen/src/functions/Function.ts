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
    };
  }

  bundleInputTypes() {
    return parseTypeArguments({
      types: this.types,
      target: TargetEnum.INPUT,
      typeArguments: this.rawAbiFunction.inputs,
      prefixForFunctionParams: true,
    });
  }

  bundleOutputTypes() {
    return parseTypeArguments({
      types: this.types,
      target: TargetEnum.OUTPUT,
      typeArguments: [this.rawAbiFunction.output],
      prefixForFunctionParams: true,
    });
  }

  getDeclaration() {
    const { name, inputs, output } = this.attributes;
    const decl = `${name}: InvokeFunction<[${inputs}], ${output}>;`;
    return decl;
  }
}
