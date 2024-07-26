import type { JsonAbiFunction } from '../../index';
import type { IType } from '../../types/interfaces/IType';
import { EmptyType } from '../types/EmptyType';

interface AbiFunctionAttributes {
  inputs: string;
  output: string;
  prefixedInputs: string;
}
export class AbiFunction {
  public name: string;
  public attributes: AbiFunctionAttributes;
  constructor(
    private types: Record<string, IType>,
    private rawAbiFunction: JsonAbiFunction
  ) {
    this.name = rawAbiFunction.name;

    this.attributes = {
      inputs: this.bundleInputTypes(),
      output: this.bundleOutputTypes(),
      prefixedInputs: this.bundleInputTypes(true),
    };
  }

  bundleInputTypes(shouldPrefixParams: boolean = false) {
    // loop through all inputs
    const inputs = this.rawAbiFunction.inputs
      .map((input) => ({
        name: input.name,
        type: this.types[input.concreteTypeId],
      }))
      .filter(({ type }) => !(type instanceof EmptyType))
      .map(({ name, type }) => {
        const inputLabel = type.attributes.inputLabel;
        const typeDeclaration = type.typeDeclarations.inputDecl;
        const typeDecl = `${inputLabel}${typeDeclaration}`;

        // assemble it in `[key: string]: <Type>` fashion
        if (shouldPrefixParams) {
          return `${name}: ${typeDecl}`;
        }

        return typeDecl;
      });

    return inputs.join(', ');
  }

  bundleOutputTypes() {
    const type = this.types[this.rawAbiFunction.output];
    const outputLabel = type.attributes.outputLabel;
    const typeDeclaration = type.typeDeclarations.outputDecl;
    return `${outputLabel}${typeDeclaration}`;
  }

  getDeclaration() {
    const { name } = this;
    const { prefixedInputs, output } = this.attributes;
    const decl = `${name}: InvokeFunction<[${prefixedInputs}], ${output}>`;
    return decl;
  }
}
