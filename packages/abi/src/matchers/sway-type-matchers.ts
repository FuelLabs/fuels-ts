export type SwayType =
  | 'void'
  | 'bool'
  | 'u8'
  | 'u16'
  | 'u32'
  | 'u64'
  | 'u256'
  | 'b256'
  | 'generic'
  | 'string'
  | 'str'
  | 'stdString'
  | 'option'
  | 'result'
  | 'enum'
  | 'struct'
  | 'b512'
  | 'bytes'
  | 'vector'
  | 'tuple'
  | 'array'
  | 'assetId'
  | 'evmAddress'
  | 'rawUntypedPtr' // might not need it
  | 'rawUntypedSlice';

type Matcher = (type: string) => boolean;

const voidMatcher: Matcher = (type) => type === '()';
const bool: Matcher = (type) => type === 'bool';
const u8: Matcher = (type) => type === 'u8';
const u16: Matcher = (type) => type === 'u16';
const u32: Matcher = (type) => type === 'u32';
const u64: Matcher = (type) => type === 'u64';
const u256: Matcher = (type) => type === 'u256';
const b256: Matcher = (type) => type === 'b256';

export const GENERIC_REGEX = /^generic ([^\s]+)$/m;
const generic: Matcher = (type) => GENERIC_REGEX.test(type);

export const STRING_REGEX = /^str\[(?<length>[0-9]+)\]/;
const string: Matcher = (type) => STRING_REGEX.test(type);

const str: Matcher = (type) => type === 'str';

export const TUPLE_REGEX = /^\((?<items>.+)\)$/m;
const tuple: Matcher = (type) => TUPLE_REGEX.test(type);

export const ARRAY_REGEX = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/;
const array: Matcher = (type) => ARRAY_REGEX.test(type);

export const STRUCT_REGEX = /^struct (.+::)?(?<name>.+)$/m;
const STRUCT_STD_REGEX =
  /^struct std::.*(AssetId|B512|Vec|RawVec|EvmAddress|Bytes|String|RawBytes)$/m;
const struct: Matcher = (type) => STRUCT_REGEX.test(type) && !STRUCT_STD_REGEX.test(type);
const assetId: Matcher = (type) => type === 'struct std::asset_id::AssetId';
const b512: Matcher = (type) => type === 'struct std::b512::B512';
const bytes: Matcher = (type) => type === 'struct std::bytes::Bytes';
const evmAddress: Matcher = (type) => type === 'struct std::vm::evm::evm_address::EvmAddress';
const stdString: Matcher = (type) => type === 'struct std::string::String';
const vector: Matcher = (type) => type === 'struct std::vec::Vec';

const option: Matcher = (type) => type === 'enum std::option::Option';
const result: Matcher = (type) => type === 'enum std::result::Result';

export const ENUM_REGEX = /^enum (.+::)?(?<name>.+)$/m;
const enumMatcher: Matcher = (type) => !option(type) && !result(type) && ENUM_REGEX.test(type);

const rawUntypedPtr: Matcher = (type) => type === 'raw untyped ptr';
const rawUntypedSlice: Matcher = (type) => type === 'raw untyped slice';

export const swayTypeMatchers: Record<SwayType, Matcher> = {
  void: voidMatcher,
  generic,
  bool,
  u8,
  u16,
  u32,
  u64,
  u256,
  b256,
  str,

  string,
  tuple,
  array,

  struct,
  assetId,
  b512,
  bytes,
  evmAddress,
  stdString,
  vector,

  enum: enumMatcher,
  option,
  result,

  rawUntypedPtr,
  rawUntypedSlice,
};

const swayTypeMatcherEntries = Object.entries(swayTypeMatchers);

export function createMatcher<T>(mappings: Record<SwayType, T>) {
  return (opts: { swayType: string }): T => {
    const { swayType } = opts;

    for (const [key, matcher] of swayTypeMatcherEntries) {
      if (matcher(swayType)) {
        const mapping = mappings[key as SwayType];
        if (mapping !== undefined) {
          return mapping;
        }
        break;
      }
    }

    throw new Error(`Matcher not found for sway type ${swayType}.`);
  };
}
