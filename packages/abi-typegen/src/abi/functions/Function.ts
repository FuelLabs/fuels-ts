import type { IFunction, JsonAbiFunction, IFunctionAttributes } from '../../index';
import { TargetEnum } from '../../types/enums/TargetEnum';
import type { IType } from '../../types/interfaces/IType';
import { findType } from '../../utils/findType';
import { getFunctionInputs } from '../../utils/getFunctionInputs';
import { parseTypeArguments } from '../../utils/parseTypeArguments';

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

    // loop through all mandatory inputs
    const inputs = getFunctionInputs({ types, inputs: this.rawAbiFunction.inputs }).map(
      ({ isOptional, ...input }) => {
        const { name, type: typeId, typeArguments } = input;

        const type = findType({ types, typeId });

        let typeDecl: string;
        const optionalSuffix = isOptional ? '?' : '';

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
          return `${name}${optionalSuffix}: ${typeDecl}`;
        }

        return typeDecl;
      }
    );

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
