import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';
import { parseEnums } from '../utils/parseEnums';
import { parseStructs } from '../utils/parseStructs';

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

  const { enums } = parseEnums({ types });
  const { structs } = parseStructs({ types });

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
