import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';
import { formatConfigurables } from '../utils/formatConfigurables';
import { formatEnums } from '../utils/formatEnums';
import { formatImports } from '../utils/formatImports';
import { formatStructs } from '../utils/formatStructs';

import factoryTemplate from './factory.hbs';

/**
 * @throws {FuelError} {@link ErrorCode.ABI_MAIN_METHOD_MISSING}
 * When the ABI doesn't have a 'main()' method.
 */
export function renderFactoryTemplate(params: { abi: Abi }) {
  const { abi } = params;

  const { types, configurables } = abi;

  const {
    rawContents,
    name: capitalizedName,
    hexlifiedBinContents: hexlifiedBinString,
  } = params.abi;

  const abiJsonString = JSON.stringify(rawContents, null, 2);

  const func = abi.functions.find((f) => f.name === 'main');

  if (!func) {
    throw new FuelError(ErrorCode.ABI_MAIN_METHOD_MISSING, `ABI doesn't have a 'main()' method.`);
  }

  const { enums } = formatEnums({ types });
  const { structs } = formatStructs({ types });
  const { imports } = formatImports({ types, baseMembers: ['Script', 'Account'] });
  const { formattedConfigurables } = formatConfigurables({ configurables });

  const { prefixedInputs: inputs, output } = func.attributes;

  const text = renderHbsTemplate({
    template: factoryTemplate,
    data: {
      inputs,
      output,
      structs,
      enums,
      abiJsonString,
      hexlifiedBinString,
      capitalizedName,
      imports,
      formattedConfigurables,
    },
  });

  return text;
}
