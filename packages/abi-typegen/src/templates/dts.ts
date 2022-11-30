import type { Abi } from '../Abi';
import { TargetEnum } from '../interfaces/TargetEnum';
import type { EnumType } from '../types/EnumType';
import type { StructType } from '../types/StructType';

import dtsTemplate from './hbs/dts.hbs';
import { renderHbsTemplate } from './utils/renderHbsTemplate';

export function renderDtsTemplate(params: { abi: Abi }) {
  const { name: capitalizedName, types, functions, commonTypesInUse } = params.abi;

  /*
    First we format all attributes
  */
  const functionsTypedefs = functions.map((f) => f.getDeclaration());

  const functionsFragments = functions.map((f) => f.attributes.name);

  const encoders = functions.map((f) => ({
    functionName: f.attributes.name,
    input: f.attributes.inputs,
  }));

  const decoders = functions.map((f) => ({
    functionName: f.attributes.name,
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
