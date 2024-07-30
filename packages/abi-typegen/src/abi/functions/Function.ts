import type { IFunction, JsonAbiFunction, IFunctionAttributes } from '../../index';
import { TargetEnum } from '../../types/enums/TargetEnum';
import type { IType } from '../../types/interfaces/IType';
import { findType } from '../../utils/findType';
import { resolveInputLabel } from '../../utils/getTypeDeclaration';
import { parseTypeArguments } from '../../utils/parseTypeArguments';
import { EmptyType } from '../types/EmptyType';

export class Function implements IFunction {
  public name: string;
  public types: IType[];
  public rawAbiFunction: JsonAbiFunction;
  public attributes: IFunctionAttributes;

  constructor(params: { types: IType[]; rawAbiFunction: JsonAbiFunction }) {
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
    const inputs = this.rawAbiFunction.inputs
      .filter((input) => {
        const type = findType({ types, typeId: input.type });
        return type.rawAbiType.type !== EmptyType.swayType;
      })
      .map((input) => {
        const { name, type: typeId, typeArguments } = input;

        const typeDecl = resolveInputLabel(types, typeId, typeArguments);

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
