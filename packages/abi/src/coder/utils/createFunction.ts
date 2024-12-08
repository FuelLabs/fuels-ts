import { FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import type { AbiFunction } from '../../parser';
import type { AbiCoderFunction } from '../abi-coder-types';
import type { AbiEncoding, DecodedValue, InputValue } from '../encoding';

import { createFunctionSelector } from './createFunctionSelector';
import { createFunctionSignature } from './createFunctionSignature';
import { getFunctionInputs } from './getFunctionInputs';
import { padValuesWithUndefined } from './padValuesWithUndefined';

export const createFunction = (fn: AbiFunction, encoding: AbiEncoding): AbiCoderFunction => {
  const signature = createFunctionSignature(fn);
  const argumentCoder = encoding.coders.tuple(fn.inputs.map((input) => encoding.getCoder(input)));
  const outputCoder = encoding.getCoder({ type: fn.output });

  const storageAttribute = fn.attributes?.find((attr) => attr.name === 'storage');
  const isReadOnly = !storageAttribute?.arguments?.includes('write');

  const functionInputs = getFunctionInputs({ inputs: fn.inputs });
  const mandatoryInputLength = functionInputs.filter((i) => !i.isOptional).length;

  return {
    // Function fields
    name: fn.name,
    inputs: fn.inputs,
    signature,
    selector: createFunctionSelector(signature),
    selectorBytes: encoding.coders.stdString.encode(fn.name),
    attributes: fn.attributes ?? [],
    isReadOnly: () => isReadOnly,

    // Coders
    encodeArguments: (values: InputValue[]): Uint8Array => {
      if (values.length < mandatoryInputLength) {
        throw new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          `Invalid number of arguments. Expected a minimum of ${mandatoryInputLength} arguments, received ${values.length}`
        );
      }

      const paddedValues = padValuesWithUndefined(values, functionInputs);
      return argumentCoder.encode(paddedValues);
    },
    decodeArguments: (data: BytesLike): DecodedValue[] => {
      const bytes = arrayify(data);
      const [decoded] = argumentCoder.decode(bytes);
      return decoded as DecodedValue[];
    },
    encodeOutput: (value: InputValue): Uint8Array => outputCoder.encode(value),
    decodeOutput: (data: BytesLike): DecodedValue => {
      const bytes = arrayify(data);
      const [decoded] = outputCoder.decode(bytes);
      return decoded as DecodedValue;
    },
  };
};
