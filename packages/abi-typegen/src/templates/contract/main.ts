import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';
import { formatConfigurables } from '../utils/formatConfigurables';
import { formatEnums } from '../utils/formatEnums';
import { formatImports } from '../utils/formatImports';
import { formatStructs } from '../utils/formatStructs';

import mainTemplate from './main.hbs';

export function renderMainTemplate(params: { abi: Abi }) {
  const {
    camelizedName,
    capitalizedName,
    types,
    functions,
    commonTypesInUse,
    configurables,
    hexlifiedBinContents,
  } = params.abi;

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
      // 'Interface',
      'FunctionFragment',
      // 'DecodedValue',
      // 'Contract',
      // 'BytesLike',
      'InvokeFunction',
    ],
  });

  const { formattedConfigurables } = formatConfigurables({ configurables });

  const { rawContents, storageSlotsContents } = params.abi;
  const abiJsonString = JSON.stringify(rawContents, null, 2);
  const storageSlotsJsonString = storageSlotsContents ?? '[]';

  /*
    And finally render template
  */
  const text = renderHbsTemplate({
    template: mainTemplate,
    data: {
      camelizedName,
      capitalizedName,
      commonTypesInUse: commonTypesInUse.join(', '),
      functionsTypedefs,
      functionsFragments,
      encoders,
      decoders,
      structs,
      enums,
      imports,
      formattedConfigurables,
      abiJsonString,
      storageSlotsJsonString,
    },
  });

  return text;
}
