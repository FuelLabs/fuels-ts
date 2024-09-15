// /**
//  * `struct` coder
//  */
// type StructValue<TCoders extends Record<string, Coder>> = Record<
//   string,
//   ReturnType<TCoders[keyof TCoders]['decode']>
// >;

// export const struct = <TCoders extends Record<string, Coder>>(opts: {
//   coders: TCoders;
//   encodedLength: number;
// }): Coder<StructValue<TCoders>> => ({
//   encodedLength: opts.encodedLength,
//   encode: (value: StructValue<TCoders>): Uint8Array => {
//     const encodedValues = Object.entries(value).map(([key, val]) => {
//       const coder = opts.coders[key];
//       if (!coder) {
//         throw new Error(`No coder found for field "${key}".`);
//       }
//       return coder.encode(val);
//     });
//     return concatBytes(encodedValues);
//   },
//   decode: (data: Uint8Array): StructValue<TCoders> => {
//     const decodedValue = Object.entries(opts.coders).reduce((acc, [caseKey, fieldCoder]) => {
//       const decoded = fieldCoder.decode(data) as StructValue<TCoders>[string];
//       acc[caseKey as keyof StructValue<TCoders>] = decoded;
//       return acc;
//     }, {} as StructValue<TCoders>);
//     return decodedValue;
//   },
// });
