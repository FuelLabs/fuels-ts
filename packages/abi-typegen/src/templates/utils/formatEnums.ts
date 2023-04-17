import type { EnumType } from '../../abi/types/EnumType';
import { TargetEnum } from '../../types/enums/TargetEnum';
import type { IType } from '../../types/interfaces/IType';

export function formatEnums(params: { types: IType[] }) {
  const { types } = params;

  const enums = types
    .filter((t) => t.name === 'enum')
    .map((t) => {
      const et = t as EnumType; // only enums here
      const structName = et.getStructName();
      const inputValues = et.getStructContents({ types, target: TargetEnum.INPUT });
      const outputValues = et.getStructContents({ types, target: TargetEnum.OUTPUT });
      return {
        structName,
        inputValues,
        outputValues,
        recycleRef: inputValues === outputValues, // reduces duplication
      };
    });

  return { enums };
}
