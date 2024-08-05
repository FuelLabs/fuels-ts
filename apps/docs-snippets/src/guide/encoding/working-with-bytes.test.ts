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

/**
 * @group node
 */
describe('working with bytes', () => {
  it('integers', () => {
    // #region working-with-bytes-1
    // #import { NumberCoder, BigNumberCoder };

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

    expect(encodedU8).toEqual(new Uint8Array([255]));
    expect(encodedU16).toEqual(new Uint8Array([0, 255]));
    expect(encodedU32).toEqual(new Uint8Array([0, 0, 0, 255]));
    expect(encodedU64).toEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]));
    expect(encodedU256).toEqual(
      new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        255,
      ])
    );
  });

  it('boolean', () => {
    // #region working-with-bytes-2
    // #import { BooleanCoder };

    const booleanCoder = new BooleanCoder();
    const encodedTrue = booleanCoder.encode(true);
    // encodedTrue = new Uint8Array([1]);

    const encodedFalse = booleanCoder.encode(false);
    // encodedFalse = new Uint8Array([0]);
    // #endregion working-with-bytes-2

    expect(encodedTrue).toEqual(new Uint8Array([1]));
    expect(encodedFalse).toEqual(new Uint8Array([0]));
  });

  it('fixed len strings', () => {
    // #region working-with-bytes-3
    // #import { StringCoder };

    const stringCoder = new StringCoder(5);
    const encoded = stringCoder.encode('hello');
    // encoded = new Uint8Array([104, 101, 108, 108, 111]);
    // #endregion working-with-bytes-3

    expect(encoded).toEqual(new Uint8Array([104, 101, 108, 108, 111]));
  });

  it('b256 / b512', () => {
    // #region working-with-bytes-4
    // #import { B256Coder, B512Coder, hexlify, randomBytes };

    const b256Coder = new B256Coder();
    const encodedB256 = b256Coder.encode(hexlify(randomBytes(32)));
    // encodedB256 = new Uint8Array(32);

    const b512Coder = new B512Coder();
    const encodedB512 = b512Coder.encode(hexlify(randomBytes(64)));
    // encodedB512 = new Uint8Array(64);
    // #endregion working-with-bytes-4

    expect(encodedB256).toHaveLength(32);
    expect(encodedB512).toHaveLength(64);
  });

  it('automatically encoded types', () => {
    // #region working-with-bytes-5
    // #import { TupleCoder, StructCoder, ArrayCoder, EnumCoder };

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

    expect(encodedTuple).toEqual(new Uint8Array([255, 0, 255]));
    expect(encodedStruct).toEqual(new Uint8Array([255, 0, 255]));
    expect(encodedArray).toEqual(new Uint8Array([255, 0, 255, 0]));
    expect(encodedEnum).toEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255]));
  });

  it('heap types', () => {
    // #region working-with-bytes-6
    // #import { VecCoder, StdStringCoder, RawSliceCoder };

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

    expect(encodedVec).toEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 255, 0, 255]));
    expect(encodedStdString).toEqual(
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 5, 104, 101, 108, 108, 111])
    );
    expect(encodedRawSlice).toEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 3, 4]));
  });
});
