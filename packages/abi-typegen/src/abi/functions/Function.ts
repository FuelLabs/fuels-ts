import upperFirst from 'lodash.upperfirst';

import type { IFunction, IFunctionAttributes } from '../../interfaces/IFunction';
import type { IRawAbiFunction, IRawAbiFunctionIO } from '../../interfaces/IRawAbiFunction';
import type { IType } from '../../interfaces/IType';
import { findType } from '../../utils/findType';
import type { StructType } from '../types/StructType';

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

    const type = findType({ types, typeId });

    const { name, attributes } = type;

    // Vectors and Options are tricky, so we handle them
    // down below, after addressing the more common types
    let decl: string;
    if (!/vector|option/.test(name)) {
      // structs can have multi-level properties, hence
      // why we use the `getStructContents` method for it
      if (/struct/.test(name)) {
        decl = (type as StructType).getStructContents({ types });
      } else {
        // otherwise just read type label as-is
        decl = attributes[labelName];
      }

      return decl;
    }

    // Now, back Vector and Options, let's apply their exceptions
    const subType = findType({ types, typeId: typeArguments![0].type });
    const labelAttribute = subType.attributes[labelName];

    if (name === 'vector') {
      // if it's a vector, we transform it to array
      decl = `${labelAttribute}[]`;
    } else {
      // or else we can guarantee that (name === 'option'),
      // so we simply wrap it
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
