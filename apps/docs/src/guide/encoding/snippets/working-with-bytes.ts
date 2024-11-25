/* eslint-disable @typescript-eslint/no-unused-vars */
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

const u16Coder = new NumberCoder('u16');
const encodedU16 = u16Coder.encode(255);

const u32Coder = new NumberCoder('u32');
const encodedU32 = u32Coder.encode(255);

const u64Coder = new BigNumberCoder('u64');
const encodedU64 = u64Coder.encode(255);

const u256Coder = new BigNumberCoder('u256');
const encodedU256 = u256Coder.encode(255);
// #endregion working-with-bytes-1

// #region working-with-bytes-2
const booleanCoder = new BooleanCoder();
const encodedTrue = booleanCoder.encode(true);

const encodedFalse = booleanCoder.encode(false);

// #endregion working-with-bytes-2

// #region working-with-bytes-3
const stringCoder = new StringCoder(5);
const encoded = stringCoder.encode('hello');
// #endregion working-with-bytes-3

// #region working-with-bytes-4
const b256Coder = new B256Coder();
const encodedB256 = b256Coder.encode(hexlify(randomBytes(32)));
const b512Coder = new B512Coder();
const encodedB512 = b512Coder.encode(hexlify(randomBytes(64)));
// #endregion working-with-bytes-4

// #region working-with-bytes-5
const tupleCoder = new TupleCoder([
  new NumberCoder('u8'),
  new NumberCoder('u16'),
]);
const encodedTuple = tupleCoder.encode([255, 255]);

const structCoder = new StructCoder('struct', {
  a: new NumberCoder('u8'),
  b: new NumberCoder('u16'),
});
const encodedStruct = structCoder.encode({ a: 255, b: 255 });

const arrayCoder = new ArrayCoder(new NumberCoder('u8'), 4);
const encodedArray = arrayCoder.encode([255, 0, 255, 0]);

const enumCoder = new EnumCoder('enum', { a: new NumberCoder('u32') });
const encodedEnum = enumCoder.encode({ a: 255 });
// #endregion working-with-bytes-5

// #region working-with-bytes-6
const vecCoder = new VecCoder(new NumberCoder('u8'));
const encodedVec = vecCoder.encode([255, 0, 255]);

const stdStringCoder = new StdStringCoder();
const encodedStdString = stdStringCoder.encode('hello');

const rawSliceCoder = new RawSliceCoder();
const encodedRawSlice = rawSliceCoder.encode([1, 2, 3, 4]);
// #endregion working-with-bytes-6
// #endregion full
