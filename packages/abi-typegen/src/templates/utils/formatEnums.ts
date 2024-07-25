import type { EnumType } from '../../abi/types/EnumType';
import type { IType } from '../../types/interfaces/IType';
import { supportedTypes } from '../../utils/supportedTypes';

export function formatEnums(params: { types: IType[] }) {
  const { types } = params;

  const enums = types
    .filter((t) => t.name === 'enum')
    .map((t) => {
      const et = t as EnumType; // only enums here
      const structName = et.getStructName();
      const inputNativeValues = et.getNativeEnum();
      const outputNativeValues = inputNativeValues;

      const { input, output } = et.getStructContents(supportedTypes);
      const inputValues = inputNativeValues ? undefined : input;
      const outputValues = outputNativeValues ? undefined : output;

      const typeAnnotations = et.typeDeclarations.input;

      return {
        structName,
        inputValues,
        outputValues,
        recycleRef: inputValues === outputValues, // reduces duplication
        inputNativeValues,
        outputNativeValues,
        typeAnnotations,
      };
    })
    .sort((a, b) => (a.structName < b.structName ? -1 : 1));

  return { enums };
}
