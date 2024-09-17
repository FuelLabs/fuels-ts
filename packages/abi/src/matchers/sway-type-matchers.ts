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
  | 'stdString'
  | 'strSlice'
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
  | 'rawUntypedSlice'; // might not need it

export type Matcher<T = boolean> = (opts: { swayType: string }) => T;

const voidMatcher: Matcher = ({ swayType }) => swayType === '()';
const bool: Matcher = ({ swayType }) => swayType === 'bool';
const u8: Matcher = ({ swayType }) => swayType === 'u8';
const u16: Matcher = ({ swayType }) => swayType === 'u16';
const u32: Matcher = ({ swayType }) => swayType === 'u32';
const u64: Matcher = ({ swayType }) => swayType === 'u64';
const u256: Matcher = ({ swayType }) => swayType === 'u256';
const b256: Matcher = ({ swayType }) => swayType === 'b256';

export const GENERIC_REGEX = /^generic ([^\s]+)$/m;
const generic: Matcher = ({ swayType }) => GENERIC_REGEX.test(swayType);

export const STRING_REGEX = /^str\[(?<length>[0-9]+)\]/;
const string: Matcher = ({ swayType }) => STRING_REGEX.test(swayType);
const strSlice: Matcher = ({ swayType }) => swayType === 'str';

export const TUPLE_REGEX = /^\((?<items>.+)\)$/m;
const tuple: Matcher = ({ swayType }) => TUPLE_REGEX.test(swayType);

export const ARRAY_REGEX = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/;
const array: Matcher = ({ swayType }) => ARRAY_REGEX.test(swayType);

const STRUCT_REGEX = /^struct .+$/m;
const STRUCT_STD_REGEX =
  /^struct std::.*(AssetId|B512|Vec|RawVec|EvmAddress|Bytes|String|RawBytes)$/m;
const struct: Matcher = ({ swayType }) =>
  STRUCT_REGEX.test(swayType) && !STRUCT_STD_REGEX.test(swayType);
const assetId: Matcher = ({ swayType }) => swayType === 'struct std::asset_id::AssetId';
const b512: Matcher = ({ swayType }) => swayType === 'struct std::b512::B512';
const bytes: Matcher = ({ swayType }) => swayType === 'struct std::bytes::Bytes';
const evmAddress: Matcher = ({ swayType }) =>
  swayType === 'struct std::vm::evm::evm_address::EvmAddress';
const stdString: Matcher = ({ swayType }) => swayType === 'struct std::string::String';
const vector: Matcher = ({ swayType }) => swayType === 'struct std::vec::Vec';

const option: Matcher = ({ swayType }) => swayType === 'enum std::option::Option';
const result: Matcher = ({ swayType }) => swayType === 'enum std::result::Result';
const enumMatcher: Matcher = ({ swayType }) =>
  !option({ swayType }) && !result({ swayType }) && /^enum .*$/m.test(swayType);

const rawUntypedPtr: Matcher = ({ swayType }) => swayType === 'raw untyped ptr';
const rawUntypedSlice: Matcher = ({ swayType }) => swayType === 'raw untyped slice';

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

  string,
  strSlice,
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

export function createMatcher<T>(mappings: Record<SwayType, T>): Matcher<T> {
  return (opts: { swayType: string }): T => {
    const { swayType } = opts;

    for (const [key, matcher] of swayTypeMatcherEntries) {
      if (matcher({ swayType })) {
        if (key in mappings) {
          return mappings[key as SwayType];
        }
        break;
      }
    }

    throw new Error(`Matcher not found for sway type ${swayType}.`);
  };
}