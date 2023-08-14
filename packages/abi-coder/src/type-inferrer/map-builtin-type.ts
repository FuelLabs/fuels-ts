export type AbiBuiltInType =
  | '()'
  | 'u8'
  | 'u16'
  | 'u32'
  | 'u64'
  | 'b256'
  | 'bool'
  | `str[${number}]`
  | 'struct B512';

export type MapAbiBuiltInType<T extends AbiBuiltInType> = T extends 'u8' | 'u16' | 'u32' | 'u64'
  ? number
  : T extends `str[${string}]`
  ? string
  : T extends 'b256'
  ? string
  : // struct B512 is encoded as a b256x2 string
  T extends 'struct B512'
  ? string
  : T extends 'bool'
  ? boolean
  : T extends '()'
  ? undefined
  : never;
