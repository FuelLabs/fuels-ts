// #region full
import { randomBytes } from 'crypto';
import { AbiEncoding, hexlify } from 'fuels';

// #region working-with-bytes-1
const u8Coder = AbiEncoding.v1.coders.u8;
const encodedU8 = u8Coder.encode(255);

const u16Coder = AbiEncoding.v1.coders.u16;
const encodedU16 = u16Coder.encode(255);

const u32Coder = AbiEncoding.v1.coders.u32;
const encodedU32 = u32Coder.encode(255);

const u64Coder = AbiEncoding.v1.coders.u64;
const encodedU64 = u64Coder.encode(255);

const u256Coder = AbiEncoding.v1.coders.u256;
const encodedU256 = u256Coder.encode(255);
// #endregion working-with-bytes-1

// #region working-with-bytes-2
const booleanCoder = AbiEncoding.v1.coders.bool;
const encodedTrue = booleanCoder.encode(true);

const encodedFalse = booleanCoder.encode(false);

// #endregion working-with-bytes-2

// #region working-with-bytes-3
const stringCoder = AbiEncoding.v1.coders.string({ encodedLength: 5 });
const encodedString = stringCoder.encode('hello');
// #endregion working-with-bytes-3

// #region working-with-bytes-4
const b256Coder = AbiEncoding.v1.coders.b256;
const encodedB256 = b256Coder.encode(hexlify(randomBytes(32)));
const b512Coder = AbiEncoding.v1.coders.b512;
const encodedB512 = b512Coder.encode(hexlify(randomBytes(64)));
// #endregion working-with-bytes-4

// #region working-with-bytes-5
const tupleCoder = AbiEncoding.v1.coders.tuple({
  coders: [AbiEncoding.v1.coders.u8, AbiEncoding.v1.coders.u16],
});
const encodedTuple = tupleCoder.encode([255, 255]);

const structCoder = AbiEncoding.v1.coders.struct({
  coders: {
    a: AbiEncoding.v1.coders.u8,
    b: AbiEncoding.v1.coders.u16,
  },
});
const encodedStruct = structCoder.encode({ a: 255, b: 255 });

const arrayCoder = AbiEncoding.v1.coders.array({
  coder: AbiEncoding.v1.coders.u8,
  size: 4,
});
const encodedArray = arrayCoder.encode([255, 0, 255, 0]);

const enumCoder = AbiEncoding.v1.coders.enum({
  coders: { a: AbiEncoding.v1.coders.u32 },
});
const encodedEnum = enumCoder.encode({ a: 255 });
// #endregion working-with-bytes-5

// #region working-with-bytes-6
const vecCoder = AbiEncoding.v1.coders.vector({
  coder: AbiEncoding.v1.coders.u8,
});
const encodedVec = vecCoder.encode([255, 0, 255]);

const stdStringCoder = AbiEncoding.v1.coders.stdString;
const encodedStdString = stdStringCoder.encode('hello');

const rawSliceCoder = AbiEncoding.v1.coders.rawSlice;
const encodedRawSlice = rawSliceCoder.encode([1, 2, 3, 4]);
// #endregion working-with-bytes-6
// #endregion full

console.log('encodedU8 should be [255]', encodedU8.toString() === '255');
console.log('encodedU16 should be [0, 255]', encodedU16.toString() === '0,255');
console.log(
  'encodedU32 should be [0, 0, 0, 255]',
  encodedU32.toString() === '0,0,0,255'
);
console.log(
  'encodedU64 should be [0, 0, 0, 0, 0, 0, 0, 255]',
  encodedU64.toString() === '0,0,0,0,0,0,0,255'
);
console.log(
  'encodedU256 should be [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255]',
  encodedU256.toString() ===
    '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255'
);

console.log('encodedTrue should be [1]', encodedTrue.toString() === '1');
console.log('encodedFalse should be [0]', encodedFalse.toString() === '0');

console.log(
  'encodedString should be [104, 101, 108, 108, 111]',
  encodedString.toString() === '104,101,108,108,111'
);

console.log('encodedB256 should be 32', encodedB256.length === 32);
console.log('encodedB512 should be 64', encodedB512.length === 64);

console.log(
  'encodedTuple should be [255, 0, 255]',
  encodedTuple.toString() === '255,0,255'
);
console.log(
  'encodedStruct should be [255, 0, 255]',
  encodedStruct.toString() === '255,0,255'
);
console.log(
  'encodedArray should be [255, 0, 255, 0]',
  encodedArray.toString() === '255,0,255,0'
);
console.log(
  'encodedEnum should be [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255]',
  encodedEnum.toString() === '0,0,0,0,0,0,0,0,0,0,0,255'
);
console.log(
  'encodedVec should be [0, 0, 0, 0, 0, 0, 0, 3, 255, 0, 255]',
  encodedVec.toString() === '0,0,0,0,0,0,0,3,255,0,255'
);
console.log(
  'encodedStdString should be [0, 0, 0, 0, 0, 0, 0, 5, 104, 101, 108, 108, 111]',
  encodedStdString.toString() === '0,0,0,0,0,0,0,5,104,101,108,108,111'
);
console.log(
  'encodedRawSlice should be [0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4]',
  encodedRawSlice.toString() === '0,0,0,0,0,0,0,4,1,2,3,4'
);
