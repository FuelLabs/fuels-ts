import upperFirst from 'lodash.upperfirst';

import type { IFunction, IFunctionAttributes } from '../../interfaces/IFunction';
import type { IRawAbiFunction, IRawAbiFunctionIO } from '../../interfaces/IRawAbiFunction';
import type { IType } from '../../interfaces/IType';
import { findType } from '../../utils/findType';

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
    const inputs = this.rawAbiFunction.inputs.map((input) => {
      const labelName = 'inputLabel';
      const source = input;
      return this.buildLabelsFor({ labelName, source });
    });

    return inputs.join(', ');
  }

  bundleOutputLabels() {
    const labelName = 'outputLabel';
    const source = this.rawAbiFunction.output;
    return this.buildLabelsFor({ labelName, source });
  }

  buildLabelsFor(params: { labelName: 'inputLabel' | 'outputLabel'; source: IRawAbiFunctionIO }) {
    const { types } = this;

    const { labelName, source } = params;
    const { type: typeId, typeArguments } = source;

    const { name, attributes } = findType({ types, typeId });

    let decl: string;

    // It's simple if type is not not Vector or Option
    if (!/vector|option/.test(name)) {
      decl = attributes[labelName];
      return decl;
    }

    // Otherwise, let's apply Vector|Option exceptions
    if (!typeArguments || !typeArguments.length) {
      throw new Error(`Property 'typeArguments' is required for ${upperFirst(name)} parameters.`);
    }

    const subType = findType({ types, typeId: typeArguments[0].type });
    const labelAttribute = subType.attributes[labelName];

    if (name === 'vector') {
      decl = `${labelAttribute}[]`;
    } else {
      // here (name === 'option')
      decl = `Option<${labelAttribute}>`;
    }

    return decl;
  }

  getDeclaration() {
    const { name, inputs, output } = this.attributes;
    const decl = `${name}: InvokeFunction<[${inputs}], ${output}>;`;
    return decl;
  }
}
