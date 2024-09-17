import { concatBytes } from '@fuel-ts/utils';

import type { Coder, GetCoderFn, GetCoderParams } from '../../abi-coder-types';

/**
 * `struct` coder
 */
type StructValue<TCoders extends Record<string, Coder>> = Record<
  string,
  ReturnType<TCoders[keyof TCoders]['decode']>
>;

export const struct = <TCoders extends Record<string, Coder>>(opts: {
  coders: TCoders;
}): Coder<StructValue<TCoders>> => ({
  type: 'struct',
  encodedLength: (data: Uint8Array) =>
    Object.values(opts.coders).reduce((acc, coder) => acc + coder.encodedLength(data), 0),
  encode: (value: StructValue<TCoders>): Uint8Array => {
    const encodedValues = Object.entries(value).map(([key, val]) => {
      const coder = opts.coders[key];
      if (!coder) {
        throw new Error(`No coder found for field "${key}".`);
      }
      return coder.encode(val);
    });
    return concatBytes(encodedValues);
  },
  decode: (data: Uint8Array): StructValue<TCoders> => {
    let offset = 0;
    const decodedValue = Object.entries(opts.coders).reduce((acc, [caseKey, fieldCoder]) => {
      const fieldDataLength = fieldCoder.encodedLength(data);
      const fieldData = data.slice(offset, (offset += fieldDataLength));
      const decoded = fieldCoder.decode(fieldData) as StructValue<TCoders>[string];
      acc[caseKey as keyof StructValue<TCoders>] = decoded;
      return acc;
    }, {} as StructValue<TCoders>);
    return decodedValue;
  },
});

struct.fromAbi = ({ type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Tuple type is missing an item of 'components'.`);
  }

  const coders = components.reduce((obj, component) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = getCoder(component);
    return o;
  }, {});
  return struct({ coders });
};
