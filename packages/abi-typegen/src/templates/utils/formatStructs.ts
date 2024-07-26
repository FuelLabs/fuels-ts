import type { StructType } from '../../abi/types/StructType';
import type { IType } from '../../types/interfaces/IType';

export function formatStructs(params: { types: IType[] }) {
  const { types } = params;

  const structs = types
    .filter((t) => t.name === 'struct')
    .map((t) => {
      const st = t as StructType; // only structs here
      const structName = st.attributes.structName as string;
      const { input: inputValues, output: outputValues } = st.structContents;
      const typeAnnotations = st.typeDeclarations.inputDecl;
      return {
        structName,
        typeAnnotations,
        inputValues,
        outputValues,
        recycleRef: inputValues === outputValues, // reduces duplication
      };
    })
    .sort((a, b) => (a.structName < b.structName ? -1 : 1));

  return { structs };
}
