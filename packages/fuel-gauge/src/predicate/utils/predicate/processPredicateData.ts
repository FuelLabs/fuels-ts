import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { arrayify, Interface } from 'fuels';
import type { BytesLike, JsonAbi, InputValue } from 'fuels';

function setConfigurableConstants(
  bytes: Uint8Array,
  configurableConstants: { [name: string]: unknown },
  abiInterface: Interface
) {
  const mutatedBytes = bytes;

  try {
    if (Object.keys(abiInterface.configurables).length === 0) {
      throw new FuelError(
        ErrorCode.INVALID_CONFIGURABLE_CONSTANTS,
        'Predicate has no configurable constants to be set'
      );
    }

    Object.entries(configurableConstants).forEach(([key, value]) => {
      if (!abiInterface?.configurables[key]) {
        throw new FuelError(
          ErrorCode.CONFIGURABLE_NOT_FOUND,
          `No configurable constant named '${key}' found in the Predicate`
        );
      }

      const { offset } = abiInterface.configurables[key];

      const encoded = abiInterface.encodeConfigurable(key, value as InputValue);

      mutatedBytes.set(encoded, offset);
    });
  } catch (err) {
    throw new FuelError(
      ErrorCode.INVALID_CONFIGURABLE_CONSTANTS,
      `Error setting configurable constants: ${(<Error>err).message}.`
    );
  }

  return mutatedBytes;
}

export function processPredicateData(
  bytes: BytesLike,
  jsonAbi: JsonAbi,
  configurableConstants?: { [name: string]: unknown }
) {
  let predicateBytes = arrayify(bytes);
  const abiInterface: Interface = new Interface(jsonAbi);

  if (abiInterface.functions.main === undefined) {
    throw new FuelError(
      ErrorCode.ABI_MAIN_METHOD_MISSING,
      'Cannot use ABI without "main" function.'
    );
  }

  if (configurableConstants && Object.keys(configurableConstants).length) {
    predicateBytes = setConfigurableConstants(predicateBytes, configurableConstants, abiInterface);
  }

  return {
    predicateBytes,
    predicateInterface: abiInterface,
  };
}
