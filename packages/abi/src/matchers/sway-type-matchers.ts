type SwayType =
  | 'empty'
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

type Matcher = (type: string) => boolean;

const empty: Matcher = (type) => type === '()';
const bool: Matcher = (type) => type === 'bool';
const u8: Matcher = (type) => type === 'u8';
const u16: Matcher = (type) => type === 'u16';
const u32: Matcher = (type) => type === 'u32';
const u64: Matcher = (type) => type === 'u64';
const u256: Matcher = (type) => type === 'u256';
const b256: Matcher = (type) => type === 'b256';

export const genericRegEx = /^generic.+$/;
const generic: Matcher = (type) => genericRegEx.test(type);

export const stringRegEx = /str\[(?<length>[0-9]+)\]/;
const string: Matcher = (type) => stringRegEx.test(type);

export const tupleRegEx = /^\((?<items>.*)\)$/m;
const tuple: Matcher = (type) => tupleRegEx.test(type);

export const arrayRegEx = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/;
const array: Matcher = (type) => arrayRegEx.test(type);

const struct: Matcher = (type) =>
  /^struct .+$/m.test(type) &&
  !/^struct (std::.*)?(AssetId|B512|Vec|RawVec|EvmAddress|Bytes|String|RawBytes)$/m.test(type);
const assetId: Matcher = (type) => type === 'struct std::asset_id::AssetId';
const b512: Matcher = (type) => type === 'struct std::b512::B512';
const bytes: Matcher = (type) => type === 'struct std::bytes::Bytes';
const evmAddress: Matcher = (type) => type === 'struct std::vm::evm::evm_address::EvmAddress';
const stdString: Matcher = (type) => type === 'struct std::string::String';
const vector: Matcher = (type) => type === 'struct std::vec::Vec';

const option: Matcher = (type) => type === 'enum std::option::Option';
const result: Matcher = (type) => type === 'enum std::result::Result';
const enumMatcher: Matcher = (type) => !option(type) && !result(type) && /^enum .*$/m.test(type);

const rawUntypedPtr: Matcher = (type) => type === 'raw untyped ptr';
const rawUntypedSlice: Matcher = (type) => type === 'raw untyped slice';

export const swayTypeMatchers: Record<SwayType, Matcher> = {
  empty,
  generic,
  bool,
  u8,
  u16,
  u32,
  u64,
  u256,
  b256,

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

export const swayTypeMatcherEntries = Object.entries(swayTypeMatchers);
