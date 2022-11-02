import type { IFunction, IFunctionAttributes } from 'src/interfaces/IFunction';
import type { IRawAbiFunction } from 'src/interfaces/IRawAbiFunction';
import type { IType } from 'src/interfaces/IType';
import { findType } from 'src/utils/findType';

export class Function implements IFunction {
  public types: IType[];
  public rawAbiFunction: IRawAbiFunction;
  public attributes: IFunctionAttributes;

  constructor(params: { types: IType[]; rawAbiFunction: IRawAbiFunction }) {
    this.types = params.types;
    this.rawAbiFunction = params.rawAbiFunction;

    this.attributes = {
      name: this.rawAbiFunction.name,
      inputs: this.bundleInputLabels(),
      output: this.bundleOutputLabels(),
    };
  }

  bundleInputLabels() {
    const { types } = this;

    const input = this.rawAbiFunction.inputs.map((rawAbiFunctionInput) => {
      const { name, type: typeId, typeArguments } = rawAbiFunctionInput;
      const type = findType({ types, typeId });
      const {
        attributes: { inputLabel: inputs },
      } = type;

      let decl: string;

      if (type.name === 'vector') {
        if (!typeArguments || !typeArguments.length) {
          throw new Error(`Property 'typeArguments' is required for Vector parameters.`);
        }
        const subType = findType({ types, typeId: typeArguments[0].type });
        decl = `${name}: ${subType.attributes.inputLabel}[]`;
      } else {
        decl = `${name}: ${inputs}`;
      }

      return decl;
    });

    return input.join(', ');
  }

  bundleOutputLabels() {
    const { types } = this;
    const { type: typeId, typeArguments } = this.rawAbiFunction.output;
    const type = findType({ types, typeId });

    let decl: string;

    if (type.name === 'vector') {
      if (!typeArguments || !typeArguments.length) {
        throw new Error(`Property 'typeArguments' is required for Vector parameters.`);
      }
      const subType = findType({ types, typeId: typeArguments[0].type });
      decl = `${subType.attributes.outputLabel}[]`;
    } else {
      decl = type.attributes.outputLabel;
    }

    return decl;
  }

  getDeclaration() {
    const { name, inputs, output } = this.attributes;
    const decl = `${name}: InvokeFunction<[${inputs}], ${output}>;`;
    return decl;
  }
}
