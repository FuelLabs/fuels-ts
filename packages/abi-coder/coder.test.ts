import { BigNumber as BN } from '@ethersproject/bignumber';
import { expect } from 'chai';
import AbiCoder from './abi-coder';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
const U32_MAX = 4294967295;
// U64_MAX is greater than Number.MAX_SAFE_INTEGER
// The max safe integer value is 2^53 - 1
const U64_MAX = '18446744073709551615';

describe('AbiCoder', () => {
  let abiCoder: AbiCoder;

  beforeEach(() => {
    abiCoder = new AbiCoder();
  });

  it('encodes and decodes addresses', () => {
    let encoded = abiCoder.encode(['address'], [B256]);
    expect(encoded).to.eql(B256);
    let decoded = abiCoder.decode(['address'], encoded);
    expect(decoded).to.eql([B256]);

    encoded = abiCoder.encode(['address', 'address'], [B256, B256]);
    expect(encoded).to.eql(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );
    decoded = abiCoder.decode(['address', 'address'], encoded);
    expect(decoded).to.eql([B256, B256]);
  });

  it('encodes and decodes b256', () => {
    let encoded = abiCoder.encode(['b256'], [B256]);
    expect(encoded).to.eql(B256);
    let decoded = abiCoder.decode(['b256'], encoded);
    expect(decoded).to.eql([B256]);

    encoded = abiCoder.encode(['b256', 'b256'], [B256, B256]);
    expect(encoded).to.eql(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );
    decoded = abiCoder.decode(['address', 'address'], encoded);
    expect(decoded).to.eql([B256, B256]);
  });

  it('encodes and decodes byte', () => {
    let encoded = abiCoder.encode(['byte'], ['255']);
    expect(encoded).to.eql('0x00000000000000ff');
    expect(abiCoder.decode(['byte'], encoded)).to.eql([BN.from(255)]);

    encoded = abiCoder.encode(['byte'], [255]);
    expect(encoded).to.eql('0x00000000000000ff');
    expect(abiCoder.decode(['byte'], encoded)).to.eql([BN.from(255)]);

    encoded = abiCoder.encode(['byte'], [BN.from(255)]);
    expect(encoded).to.eql('0x00000000000000ff');
    expect(abiCoder.decode(['byte'], encoded)).to.eql([BN.from(255)]);
  });

  it('encodes and decodes boolean', () => {
    let encoded = abiCoder.encode(['bool'], [true]);
    expect(encoded).to.eql('0x0000000000000001');
    expect(abiCoder.decode(['bool'], encoded)).to.eql([true]);

    encoded = abiCoder.encode(['bool'], [false]);
    expect(encoded).to.eql('0x0000000000000000');
    expect(abiCoder.decode(['bool'], encoded)).to.eql([false]);
  });

  it('encodes u8, u16, u32, u64', () => {
    let encoded = abiCoder.encode(['u8'], [1]);
    expect(encoded).to.eql('0x0000000000000001');
    expect(abiCoder.decode(['u8'], encoded)).to.eql([BN.from(1)]);

    encoded = abiCoder.encode(['u8'], [BN.from(1)]);
    expect(encoded).to.eql('0x0000000000000001');
    expect(abiCoder.decode(['u8'], encoded)).to.eql([BN.from(1)]);

    encoded = abiCoder.encode(['u8'], [255]);
    expect(encoded).to.eql('0x00000000000000ff');
    expect(abiCoder.decode(['u8'], encoded)).to.eql([BN.from(255)]);

    encoded = abiCoder.encode(['u16'], [1]);
    expect(encoded).to.eql('0x0000000000000001');
    expect(abiCoder.decode(['u16'], encoded)).to.eql([BN.from(1)]);

    encoded = abiCoder.encode(['u16'], [65535]);
    expect(encoded).to.eql('0x000000000000ffff');
    expect(abiCoder.decode(['u16'], encoded)).to.eql([BN.from(65535)]);

    encoded = abiCoder.encode(['u32'], [U32_MAX]);
    expect(encoded).to.eql('0x00000000ffffffff');
    expect(abiCoder.decode(['u32'], encoded)).to.eql([BN.from(U32_MAX)]);

    encoded = abiCoder.encode(['u32'], [42]);
    expect(encoded).to.eql('0x000000000000002a');
    expect(abiCoder.decode(['u32'], encoded)).to.eql([BN.from(42)]);

    encoded = abiCoder.encode(['u64'], [U64_MAX]);
    expect(encoded).to.eql('0xffffffffffffffff');
    expect(abiCoder.decode(['u64'], encoded)).to.eql([BN.from(U64_MAX)]);

    encoded = abiCoder.encode(['u64'], [BigInt(U64_MAX)]);
    expect(encoded).to.eql('0xffffffffffffffff');
    encoded = abiCoder.encode(['u64'], [BN.from(U64_MAX)]);
    expect(encoded).to.eql('0xffffffffffffffff');
  });

  it('encodes and decodes fixed strings', () => {
    let encoded = abiCoder.encode(['str[12]'], ['Hello, World']);
    expect(encoded).to.eql('0x48656c6c6f2c20576f726c6400000000');
    expect(abiCoder.decode(['str[12]'], encoded)).to.eql(['Hello, World']);

    encoded = abiCoder.encode(['str[23]'], ['This is a full sentence']);
    expect(encoded).to.eql('0x5468697320697320612066756c6c2073656e74656e636500');
    expect(abiCoder.decode(['str[23]'], encoded)).to.eql(['This is a full sentence']);

    encoded = abiCoder.encode(['str[8]'], ['abcdefgh']);
    expect(encoded).to.eql('0x6162636465666768');
    expect(abiCoder.decode(['str[8]'], encoded)).to.eql(['abcdefgh']);

    encoded = abiCoder.encode(
      ['str[23]', 'str[8]', 'str[12]'],
      ['This is a full sentence', 'abcdefgh', 'Hello, World']
    );
    expect(encoded).to.eql(
      '0x5468697320697320612066756c6c2073656e74656e636500616263646566676848656c6c6f2c20576f726c6400000000'
    );
    expect(abiCoder.decode(['str[23]', 'str[8]', 'str[12]'], encoded)).to.eql([
      'This is a full sentence',
      'abcdefgh',
      'Hello, World',
    ]);
  });

  it('encodes and decodes an array of primitives', () => {
    let encoded = abiCoder.encode(['bool', 'u8[2]'], [true, [1, 2]]);
    expect(encoded).to.eql('0x000000000000000100000000000000010000000000000002');
    expect(abiCoder.decode(['bool', 'u8[2]'], encoded)).to.eql([true, [BN.from(1), BN.from(2)]]);

    encoded = abiCoder.encode(['u8[3]', 'bool', 'address'], [[1, 2, 3], true, B256]);
    expect(encoded).to.eql(
      '0x0000000000000001000000000000000200000000000000030000000000000001d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );
    expect(abiCoder.decode(['u8[3]', 'bool', 'address'], encoded)).to.eql([
      [BN.from(1), BN.from(2), BN.from(3)],
      true,
      B256,
    ]);

    encoded = abiCoder.encode(
      ['bool', 'str[8][2]', 'u8[1][1]'],
      [true, ['abcdefgh', 'abcdefgh'], [[1]]]
    );
    expect(encoded).to.eql('0x0000000000000001616263646566676861626364656667680000000000000001');
    expect(abiCoder.decode(['bool', 'str[8][2]', 'u8[1][1]'], encoded)).to.eql([
      true,
      ['abcdefgh', 'abcdefgh'],
      [[BN.from(1)]],
    ]);
  });

  it('encodes and decodes tuples', () => {
    const encoded = abiCoder.encode(['u16', 'tuple(u64, str[12])'], [65535, [42, 'Hello, World']]);
    expect(encoded).to.eql('0x000000000000ffff000000000000002a48656c6c6f2c20576f726c6400000000');
    expect(abiCoder.decode(['u16', 'tuple(u64, str[12])'], encoded)).to.eql([
      BN.from(65535),
      [BN.from(42), 'Hello, World'],
    ]);
  });

  it('encodes and decodes named tuples', () => {
    const encoded = abiCoder.encode(
      ['u16', 'tuple(u64 value, str[12] name) foobar'],
      [65535, { value: 42, name: 'Hello, World' }]
    );
    expect(encoded).to.eql('0x000000000000ffff000000000000002a48656c6c6f2c20576f726c6400000000');

    const decoded = abiCoder.decode(['u16', 'tuple(u64 value, str[12] name) foobar'], encoded);
    expect(decoded).to.eql([BN.from(65535), [BN.from(42), 'Hello, World']]);
  });

  it('throws an error when value and type lengths are different', () => {
    expect(() =>
      abiCoder.encode(['u16', 'tuple(u64 value, str[12] name) foobar'], [65535])
    ).to.throw('Types/values length mismatch');
    expect(() =>
      abiCoder.decode(['u16'], '0x000000000000ffff000000000000002a48656c6c6f2c20576f726c6400000000')
    ).to.throw('Types/values length mismatch');
  });

  it('throws an error if the value type is not valid', () => {
    expect(() => abiCoder.encode(['foobar'], [65535])).to.throw('Invalid type');
  });

  it('throws error on mis-match value and type', () => {
    expect(() => abiCoder.encode(['byte'], [true])).to.throw('Invalid Byte');

    expect(() => abiCoder.encode(['address'], [true])).to.throw('Invalid address');
    expect(() => abiCoder.encode(['address'], ['0x012'])).to.throw('Invalid address');

    expect(() => abiCoder.encode(['b256'], [true])).to.throw('Invalid b256');
    expect(() => abiCoder.encode(['b256'], ['0x012'])).to.throw('Invalid b256');

    expect(() => abiCoder.encode(['u8'], [U64_MAX])).to.throw('Invalid u8');
    expect(() => abiCoder.encode(['u16'], [U64_MAX])).to.throw('Invalid u16');
    expect(() => abiCoder.encode(['u32'], [U64_MAX])).to.throw('Invalid u32');

    expect(() => abiCoder.decode(['bool'], '0x0000000000000003')).to.throw('Invalid boolean value');

    expect(() => abiCoder.encode(['u64'], [18446744073709551615])).to.throw('Invalid u64');
    expect(() => abiCoder.encode(['u64'], [2 ** 53])).to.throw('Invalid u64');

    expect(() => {
      abiCoder.encode(
        ['tuple(u64 value, str[12] value) foobar'],
        [{ value: 42, name: 'Hello, World' }]
      );
    }).to.throw('cannot encode object for signature with duplicate name');
  });
});
