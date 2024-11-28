import type { BytesLike } from '@fuel-ts/interfaces';
import { arrayify } from '@fuel-ts/utils';

import type { AbiFunction } from '../../parser';
import type { AbiCoderFunction, DecodedValue, InputValue } from '../abi-coder-types';
import type { AbiEncoding } from '../encoding/encoding';

import { createFunctionSelector } from './createFunctionSelector';
import { createFunctionSignature } from './createFunctionSignature';

export const makeFunction = (fn: AbiFunction, encoding: AbiEncoding): AbiCoderFunction => {
  const signature = createFunctionSignature(fn);
  const argumentCoder = encoding.coders.tuple({
    coders: fn.inputs.map((input) => encoding.getCoder(input)),
  });
  const outputCoder = encoding.getCoder({ type: fn.output });

  const storageAttribute = fn.attributes?.find((attr) => attr.name === 'storage');
  const isReadOnly = !storageAttribute?.arguments?.includes('write');

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
    encodeArguments: (values: InputValue[]): Uint8Array => argumentCoder.encode(values),
    decodeArguments: (data: BytesLike): DecodedValue[] => {
      const bytes = arrayify(data);
      return argumentCoder.decode(bytes) as DecodedValue[];
    },
    encodeOutput: (value: InputValue): Uint8Array => outputCoder.encode(value),
    decodeOutput: (data: BytesLike): DecodedValue => {
      const bytes = arrayify(data);
      return outputCoder.decode(bytes) as DecodedValue;
    },
  };
};
