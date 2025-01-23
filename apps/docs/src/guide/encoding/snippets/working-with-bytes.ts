// #region full
import { randomBytes } from 'crypto';
import { encoding, hexlify } from 'fuels';

// #region working-with-bytes-1
const encodedU8 = encoding.u8.encode(255);

const encodedU16 = encoding.u16.encode(255);

const encodedU32 = encoding.u32.encode(255);

const encodedU64 = encoding.u64.encode(255);

const encodedU256 = encoding.u256.encode(255);
// #endregion working-with-bytes-1

// #region working-with-bytes-2
const encodedTrue = encoding.bool.encode(true);

const encodedFalse = encoding.bool.encode(false);
// #endregion working-with-bytes-2

// #region working-with-bytes-3
const stringCoder = encoding.string(5);
const encodedString = stringCoder.encode('hello');
// #endregion working-with-bytes-3

// #region working-with-bytes-4
const encodedB256 = encoding.b256.encode(hexlify(randomBytes(32)));

const encodedB512 = encoding.b512.encode(hexlify(randomBytes(64)));
// #endregion working-with-bytes-4

// #region working-with-bytes-5
const tupleCoder = encoding.tuple([encoding.u8, encoding.u16]);
const encodedTuple = tupleCoder.encode([255, 255]);

const structCoder = encoding.struct({
  a: encoding.u8,
  b: encoding.u16,
});
const encodedStruct = structCoder.encode({ a: 255, b: 255 });

const arrayCoder = encoding.array(encoding.u8, 4);
const encodedArray = arrayCoder.encode([255, 0, 255, 0]);

const enumCoder = encoding.enum({ a: encoding.u32 });
const encodedEnum = enumCoder.encode({ a: 255 });
// #endregion working-with-bytes-5

// #region working-with-bytes-6
const vecCoder = encoding.vector(encoding.u8);
const encodedVec = vecCoder.encode([255, 0, 255]);

const encodedStdString = encoding.stdString.encode('hello');

const encodedRawSlice = encoding.rawSlice.encode([1, 2, 3, 4]);
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
