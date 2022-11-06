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
      const innerTypeArguments = parseTypeArguments({
        types,
        targetMode,
        parentTypeId: typeArgument.type,
        typeArguments: typeArgument.typeArguments,
      });

      buffer.push(innerTypeArguments);
    } else {
      // or just collect type declaration
      let finalLabel: string;

      if (parentType && parentType.name === 'vector') {
        // exception: vector are hanbdled as arrays
        finalLabel = `${currentLabel}[]`;
      } else {
        finalLabel = currentLabel;
      }

      buffer.push(finalLabel);
    }
  });

  let output = buffer.join(', ');

  // here we enclose the output with the first direct parent type, unless
  // it's a Vector — in which case we do nothing, because we don't want
  // `Vec<T>` annotations in typescript AND we just transformed all
  // Vec's to `T[]` on the exception a few lines above
  if (parentLabel && parentType && parentType.name !== 'vector') {
    output = `${parentLabel}<${output}>`;
  }

  return output;
}
