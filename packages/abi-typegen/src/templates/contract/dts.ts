import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';
import { formatEnums } from '../utils/formatEnums';
import { formatImports } from '../utils/formatImports';
import { formatStructs } from '../utils/formatStructs';

import dtsTemplate from './dts.hbs';

export function renderDtsTemplate(params: { abi: Abi }) {
  const { name: capitalizedName, types, functions, commonTypesInUse, configurables } = params.abi;

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

  const { enums } = formatEnums({ types });
  const { structs } = formatStructs({ types });
  const { imports } = formatImports({
    types,
    baseMembers: [
      'Interface',
      'FunctionFragment',
      'DecodedValue',
      'Contract',
      'BytesLike',
      'InvokeFunction',
    ],
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
      imports,
      configurables,
    },
  });

  return text;
}
