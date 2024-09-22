// #region full
import { randomBytes } from 'crypto';
import {
  ArrayCoder,
  B256Coder,
  B512Coder,
  BigNumberCoder,
  BooleanCoder,
  EnumCoder,
  NumberCoder,
  RawSliceCoder,
  StdStringCoder,
  StringCoder,
  StructCoder,
  TupleCoder,
  VecCoder,
  hexlify,
} from 'fuels';

// #region working-with-bytes-1
const u8Coder = new NumberCoder('u8');
const encodedU8 = u8Coder.encode(255);
// encodedU8 = new Uint8Array([255]);

const u16Coder = new NumberCoder('u16');
const encodedU16 = u16Coder.encode(255);
// encodedU16 = new Uint8Array([0, 255]);

const u32Coder = new NumberCoder('u32');
const encodedU32 = u32Coder.encode(255);
// encodedU32 = new Uint8Array([0, 0, 0, 255]);

const u64Coder = new BigNumberCoder('u64');
const encodedU64 = u64Coder.encode(255);
// encodedU64 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]);

const u256Coder = new BigNumberCoder('u256');
const encodedU256 = u256Coder.encode(255);
// encodedU256 = new Uint8Array([
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255
// ]);
// #endregion working-with-bytes-1

console.assert(
  encodedU8.toString() === new Uint8Array([255]).toString(),
  'Encoded U8 should be equal to 255'
);
console.assert(
  encodedU16.toString() === new Uint8Array([0, 255]).toString(),
  'Encoded U16 should be equal to 255'
);
console.assert(
  encodedU32.toString() === new Uint8Array([0, 0, 0, 255]).toString(),
  'Encoded U32 should be equal to 255'
);
console.assert(
  encodedU64.toString() === new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]).toString(),
  'Encoded U64 should be equal to 255'
);
console.assert(
  encodedU256.toString() ===
    new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      255,
    ]).toString(),
  'Encoded U256 should be equal to 255'
);

// #region working-with-bytes-2

const booleanCoder = new BooleanCoder();
const encodedTrue = booleanCoder.encode(true);
// encodedTrue = new Uint8Array([1]);

const encodedFalse = booleanCoder.encode(false);
// encodedFalse = new Uint8Array([0]);
// #endregion working-with-bytes-2

console.assert(
  encodedTrue.toString() === new Uint8Array([1]).toString(),
  'Encoded True should be equal to 1'
);
console.assert(
  encodedFalse.toString() === new Uint8Array([0]).toString(),
  'Encoded False should be equal to 0'
);

// #region working-with-bytes-3

const stringCoder = new StringCoder(5);
const encoded = stringCoder.encode('hello');
// #endregion working-with-bytes-3

console.assert(
  encoded.toString() === new Uint8Array([104, 101, 108, 108, 111]).toString(),
  'Encoded should be equal to hello'
);

// #region working-with-bytes-4

const b256Coder = new B256Coder();
const encodedB256 = b256Coder.encode(hexlify(randomBytes(32)));
// encodedB256 = new Uint8Array(32);

const b512Coder = new B512Coder();
const encodedB512 = b512Coder.encode(hexlify(randomBytes(64)));
// encodedB512 = new Uint8Array(64);
// #endregion working-with-bytes-4

console.assert(encodedB256.length === 32, 'Encoded B256 should be equal to 32');
console.assert(encodedB512.length === 64, 'Encoded B512 should be equal to 64');

// #region working-with-bytes-5

const tupleCoder = new TupleCoder([new NumberCoder('u8'), new NumberCoder('u16')]);
const encodedTuple = tupleCoder.encode([255, 255]);
// encodedTuple = new Uint8Array([255, 0, 255]);

const structCoder = new StructCoder('struct', {
  a: new NumberCoder('u8'),
  b: new NumberCoder('u16'),
});
const encodedStruct = structCoder.encode({ a: 255, b: 255 });
// encodedStruct = new Uint8Array([255, 0, 255]);

const arrayCoder = new ArrayCoder(new NumberCoder('u8'), 4);
const encodedArray = arrayCoder.encode([255, 0, 255, 0]);
// encodedArray = new Uint8Array([255, 0, 255, 0]);

const enumCoder = new EnumCoder('enum', { a: new NumberCoder('u32') });
const encodedEnum = enumCoder.encode({ a: 255 });
// encodedEnum = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255]);
// #endregion working-with-bytes-5

console.assert(
  encodedTuple.toString() === new Uint8Array([255, 0, 255]).toString(),
  'Encoded Tuple should be equal to [255, 0, 255]'
);
console.assert(
  encodedStruct.toString() === new Uint8Array([255, 0, 255]).toString(),
  'Encoded Struct should be equal to [255, 0, 255]'
);
console.assert(
  encodedArray.toString() === new Uint8Array([255, 0, 255, 0]).toString(),
  'Encoded Array should be equal to [255, 0, 255, 0]'
);
console.assert(
  encodedEnum.toString() === new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255]).toString(),
  'Encoded Enum should be equal to [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255]'
);

// #region working-with-bytes-6

const vecCoder = new VecCoder(new NumberCoder('u8'));
const encodedVec = vecCoder.encode([255, 0, 255]);
// encodedVec = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 255, 0, 255]);

const stdStringCoder = new StdStringCoder();
const encodedStdString = stdStringCoder.encode('hello');
// encodedStdString = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 5, 104, 101, 108, 108, 111]);

const rawSliceCoder = new RawSliceCoder();
const encodedRawSlice = rawSliceCoder.encode([1, 2, 3, 4]);
// encodedRawSlice = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4]);
// #endregion working-with-bytes-6

console.assert(
  encodedVec.toString() === new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 255, 0, 255]).toString(),
  'Encoded Vec should be equal to [0, 0, 0, 0, 0, 0, 0, 3, 255, 0, 255]'
);
console.assert(
  encodedStdString.toString() ===
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 5, 104, 101, 108, 108, 111]).toString(),
  'Encoded StdString should be equal to [0, 0, 0, 0, 0, 0, 0, 5, 104, 101, 108, 108, 111]'
);
console.assert(
  encodedRawSlice.toString() === new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4]).toString(),
  'Encoded RawSlice should be equal to [0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4]'
);
// #endregion full
