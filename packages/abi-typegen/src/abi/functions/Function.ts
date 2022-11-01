import { findType } from '../../utils/findType';
import type { IRawAbiFunction } from '../interfaces/IAbiFunction';
import type { IFunction, IFunctionPieces } from '../interfaces/IFunction';
import type { IType } from '../interfaces/IType';

export class Function implements IFunction {
  public types: IType[];
  public abiFunction: IRawAbiFunction;
  public attributes: IFunctionPieces;

  constructor(params: { types: IType[]; abiFunction: IRawAbiFunction }) {
    this.types = params.types;
    this.abiFunction = params.abiFunction;

    this.attributes = {
      name: this.abiFunction.name,
      inputs: this.bundleInputLabels(),
      output: this.bundleOutputLabels(),
    };
  }

  bundleInputLabels() {
    const { types } = this;

    const input = this.abiFunction.inputs.map((abiFunctionInput) => {
      const { name, type: typeId, typeArguments } = abiFunctionInput;
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
    const { type: typeId, typeArguments } = this.abiFunction.output;
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
