import type { StructType } from '../../abi/types/StructType';
import { TargetEnum } from '../../types/enums/TargetEnum';
import type { IType } from '../../types/interfaces/IType';

export function formatStructs(params: { types: IType[] }) {
  const { types } = params;

  const structs = types
    .filter((t) => t.name === 'struct')
    .map((t) => {
      const st = t as StructType; // only structs here
      const structName = st.getStructName();
      const inputValues = st.getStructContents({ types, target: TargetEnum.INPUT });
      const outputValues = st.getStructContents({ types, target: TargetEnum.OUTPUT });
      const typeAnnotations = st.getStructDeclaration({ types });
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
