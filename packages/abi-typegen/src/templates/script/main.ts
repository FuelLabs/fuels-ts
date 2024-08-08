import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { compressBytecode } from '@fuel-ts/utils';

import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';
import { formatEnums } from '../utils/formatEnums';
import { formatImports } from '../utils/formatImports';
import { formatStructs } from '../utils/formatStructs';

import mainTemplate from './main.hbs';

export function renderMainTemplate(params: { abi: Abi }) {
  const { abi } = params;

  const { types, configurables } = abi;

  const {
    rawContents,
    capitalizedName,
    hexlifiedBinContents: hexlifiedBinString,
    commonTypesInUse,
  } = params.abi;

  const abiJsonString = JSON.stringify(rawContents, null, 2);

  const func = abi.functions.find((f) => f.name === 'main');

  if (!func) {
    throw new FuelError(ErrorCode.ABI_MAIN_METHOD_MISSING, `ABI doesn't have a 'main()' method.`);
  }

  const { enums } = formatEnums({ types });
  const { structs } = formatStructs({ types });
  const { imports } = formatImports({
    types,
    baseMembers: ['Script', 'Account', 'decompressBytecode'],
  });

  const { prefixedInputs: inputs, output } = func.attributes;

  const text = renderHbsTemplate({
    template: mainTemplate,
    data: {
      inputs,
      output,
      structs,
      enums,
      abiJsonString,
      compressedBytecode: compressBytecode(hexlifiedBinString),
      capitalizedName,
      imports,
      configurables,
      commonTypesInUse: commonTypesInUse.join(', '),
    },
  });

  return text;
}
