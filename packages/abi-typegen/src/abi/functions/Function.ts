import type { IFunction, IRawAbiFunction, IFunctionAttributes } from '../../index';
import { TargetEnum } from '../../types/enums/TargetEnum';
import type { IType } from '../../types/interfaces/IType';
import { findType } from '../../utils/findType';
import { parseTypeArguments } from '../../utils/parseTypeArguments';

export class Function implements IFunction {
  public name: string;
  public types: IType[];
  public rawAbiFunction: IRawAbiFunction;
  public attributes: IFunctionAttributes;

  constructor(params: { types: IType[]; rawAbiFunction: IRawAbiFunction }) {
    this.rawAbiFunction = params.rawAbiFunction;
    this.types = params.types;
    this.name = params.rawAbiFunction.name;

    this.attributes = {
      inputs: this.bundleInputTypes(),
      output: this.bundleOutputTypes(),
      prefixedInputs: this.bundleInputTypes(true),
    };
  }

  bundleInputTypes(shouldPrefixParams: boolean = false) {
    const { types } = this;

    // loop through all inputs
    const inputs = this.rawAbiFunction.inputs.map((input) => {
      const { name, type: typeId, typeArguments } = input;

      const type = findType({ types, typeId });

      let typeDecl: string;

      if (typeArguments) {
        // recursively process child `typeArguments`
        typeDecl = parseTypeArguments({
          types,
          target: TargetEnum.INPUT,
          parentTypeId: typeId,
          typeArguments,
        });
      } else {
        // or just collect type declaration
        typeDecl = type.attributes.inputLabel;
      }

      // assemble it in `[key: string]: <Type>` fashion
      if (shouldPrefixParams) {
        return `${name}: ${typeDecl}`;
      }

      return typeDecl;
    });

    return inputs.join(', ');
  }

  bundleOutputTypes() {
    return parseTypeArguments({
      types: this.types,
      target: TargetEnum.OUTPUT,
      typeArguments: [this.rawAbiFunction.output],
    });
  }

  getDeclaration() {
    const { name } = this;
    const { prefixedInputs, output } = this.attributes;
    const decl = `${name}: InvokeFunction<[${prefixedInputs}], ${output}>`;
    return decl;
  }
}
