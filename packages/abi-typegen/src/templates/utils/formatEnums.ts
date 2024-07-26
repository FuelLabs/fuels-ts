import type { EnumType } from '../../abi/types/EnumType';
import type { IType } from '../../types/interfaces/IType';

export function formatEnums(params: { types: IType[] }) {
  const { types } = params;

  const enums = types
    .filter((t) => t.name === 'enum')
    .map((t) => {
      const et = t as EnumType; // only enums here
      const inputNativeValues = et.getNativeEnum();
      const outputNativeValues = inputNativeValues;

      const { input, output } = et.structContents;
      const inputValues = inputNativeValues ? undefined : input;
      const outputValues = outputNativeValues ? undefined : output;

      return {
        inputLabel: et.attributes.inputLabel,
        outputLabel: et.attributes.outputLabel,
        inputValues,
        outputValues,
        recycleRef: inputValues === outputValues, // reduces duplication
        inputNativeValues,
        outputNativeValues,
      };
    })
    .sort((a, b) => (a.inputLabel < b.inputLabel ? -1 : 1));

  return { enums };
}
