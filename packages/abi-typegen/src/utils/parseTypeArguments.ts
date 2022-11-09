import type { IRawAbiTypeComponent } from '../interfaces/IRawAbiType';
import type { IType } from '../interfaces/IType';
import type { TargetEnum } from '../interfaces/TargetEnum';

import { findType } from './findType';

/*
  Recursively parses the given `typeArguments` node
*/
export function parseTypeArguments(params: {
  types: IType[];
  parentTypeId?: number;
  typeArguments: IRawAbiTypeComponent[];
  target: TargetEnum;
  prefixForFunctionParams?: boolean;
}): string {
  const { types, typeArguments, parentTypeId, target, prefixForFunctionParams } = params;

  const attributeKey: 'inputLabel' | 'outputLabel' = `${target}Label`;

  const buffer: string[] = [];

  let parentType: IType | undefined;
  let parentLabel: string | undefined;

  if (parentTypeId !== undefined) {
    parentType = findType({ types, typeId: parentTypeId });
    parentLabel = parentType.attributes[attributeKey];
  }

  // loop through all `typeArgument` items
  typeArguments.forEach((typeArgument) => {
    const name = typeArgument.name;
    const currentTypeId = typeArgument.type;
    const currentType = findType({ types, typeId: currentTypeId });
    const currentLabel = currentType.attributes[attributeKey];

    if (typeArgument.typeArguments) {
      // recursively process nested `typeArguments`
      buffer.push(
        parseTypeArguments({
          types,
          target,
          parentTypeId: typeArgument.type,
          typeArguments: typeArgument.typeArguments,
          prefixForFunctionParams,
        })
      );
    } else {
      /*
        If there's no nested `typeArguments`, check if
        we need to prefix the generated input/output type.

        This will be used, for example, inside the generated
        Typescript code for `InvokeFunction` declarations, i.e.:

          ————
          export class ArraySimpleAbi extends Contract {
            ...
            functions: {
              <method_name>: InvokeFunction<[<param_name>: <Type>], <Type>>;
            }
          }
          ————

        In the example above, the prefix would go where the `<param_name>` is.
      */

      let prefix = '';
      if (prefixForFunctionParams) {
        prefix = name !== '' ? `${name}: ` : '';
      }

      buffer.push(`${prefix}${currentLabel}`);

      /*
        ANNOTATIONS: Code to convert `Vec<x>` to `x[]`
      */
      // let finalLabel: string;
      // if (parentType && parentType.name === 'vector') {
      //   // exception: vector are hanbdled as arrays
      //   finalLabel = `${currentLabel}[]`;
      // } else {
      //   finalLabel = currentLabel;
      // }
      // buffer.push(finalLabel);
    }
  });

  let output = buffer.join(', ');

  /*
    ANNOTATIONS: Code to convert `Vec<x>` to `x[]`
  */
  // // Code to prevent wrapping types with `Vec<x>`
  // if (parentLabel && parentType && parentType.name !== 'vector') {
  //   output = `${parentLabel}<${output}>`;
  // }

  if (parentLabel) {
    output = `${parentLabel}<${output}>`;
  }

  return output;
}
