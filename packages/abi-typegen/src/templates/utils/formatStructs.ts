import type { StructType } from '../../abi/types/StructType';
import type { IType } from '../../types/interfaces/IType';

export function formatStructs(params: { types: IType[] }) {
  const { types } = params;

  const structs = types
    .filter((t) => t.name === 'struct')
    .map((t) => {
      const st = t as StructType; // only structs here
      const { input: inputValues, output: outputValues } = st.structContents;
      return {
        inputLabel: st.attributes.inputLabel,
        outputLabel: st.attributes.outputLabel,
        inputValues,
        outputValues,
        recycleRef: inputValues === outputValues, // reduces duplication
      };
    })
    .sort((a, b) => (a.inputLabel < b.inputLabel ? -1 : 1));

  return { structs };
}
