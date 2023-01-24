import type { Abi } from '../../abi/Abi';
import type { EnumType } from '../../abi/types/EnumType';
import type { StructType } from '../../abi/types/StructType';
import { TargetEnum } from '../../types/enums/TargetEnum';
import { renderHbsTemplate } from '../renderHbsTemplate';

import dtsTemplate from './dts.hbs';

export function renderDtsTemplate(params: { abi: Abi }) {
  const { name: capitalizedName, types, functions, commonTypesInUse } = params.abi;

  /*
    First we format all attributes
  */
  const functionsTypedefs = functions.map((f) => f.getDeclaration());

  const functionsFragments = functions.map((f) => f.name);

  const encoders = functions.map((f) => ({
    functionName: f.name,
    input: f.attributes.inputs,
  }));

  const decoders = functions.map((f) => ({
    functionName: f.name,
  }));

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
    });

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

  /*
    And finally render template
  */
  const text = renderHbsTemplate({
    template: dtsTemplate,
    data: {
      capitalizedName,
      commonTypesInUse: commonTypesInUse.join(', '),
      functionsTypedefs,
      functionsFragments,
      encoders,
      decoders,
      structs,
      enums,
    },
  });

  return text;
}
