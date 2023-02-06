import type { IFunction, IFunctionAttributes } from '../interfaces/IFunction';
import type { IRawAbiFunction } from '../interfaces/IRawAbiFunction';
import type { IType } from '../interfaces/IType';
import { TargetEnum } from '../interfaces/TargetEnum';
import { findType } from '../utils/findType';
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
      attributes: this.bundleAttributes(),
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

  bundleAttributes() {
    const { types } = this;

    if (!this.rawAbiFunction.attributes) {
      return '';
    }

    // loop through all the attributes
    const attributes = this.rawAbiFunction.attributes.map((attribute) => {
      const { name, arguments: args } = attribute;

      // if there are no arguments, just return the name
      if (!args.length) {
        return name;
      }

      // otherwise, collect all the arguments
      const argsDeclarations = args.map((arg) => {
        const type = findType({ types, typeId: parseInt(arg, 10) });
        return type.attributes.inputLabel;
      });

      // and assemble it in `name<arg1, arg2, ...>` fashion
      return `${name}<${argsDeclarations.join(', ')}>`;
    });

    return attributes.join(', ');
  }

  getDeclaration() {
    const { name, prefixedInputs, output } = this.attributes;
    const decl = `${name}: InvokeFunction<[${prefixedInputs}], ${output}>`;
    return decl;
  }

  isPayable() {
    return this.rawAbiFunction.attributes.some((attribute) => attribute.name === 'payable');
  }
}
