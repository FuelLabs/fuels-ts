import type { IRawAbiTypeComponent } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';
import { findType } from '../../utils/findType';

/*
  Recursively parses the given `typeArguments` node
*/
export function parseTypeArguments(params: {
  types: IType[];
  parentTypeId?: number;
  typeArguments: IRawAbiTypeComponent[];
  targetMode: 'input' | 'output';
}): string {
  const { types, typeArguments, parentTypeId, targetMode } = params;

  const attributeKey: 'inputLabel' | 'outputLabel' = `${targetMode}Label`;

  const buffer: string[] = [];

  let parentType: IType | undefined;
  let parentLabel: string | undefined;

  if (parentTypeId !== undefined) {
    parentType = findType({ types, typeId: parentTypeId });
    parentLabel = parentType.attributes[attributeKey];
  }

  // loop through all `typeArgument` items
  typeArguments.forEach((typeArgument) => {
    const currentTypeId = typeArgument.type;
    const currentType = findType({ types, typeId: currentTypeId });
    const currentLabel = currentType.attributes[attributeKey];

    if (typeArgument.typeArguments) {
      // recursively process child `typeArguments`
      buffer.push(
        parseTypeArguments({
          types,
          targetMode,
          parentTypeId: typeArgument.type,
          typeArguments: typeArgument.typeArguments,
        })
      );
    } else {
      // or just collect type declaration
      buffer.push(currentLabel);

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
