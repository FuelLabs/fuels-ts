import { bn } from 'fuels';

export const U8_MIN = 0;
export const U8_MAX = 2 ** 8 - 1;
export const U8_MAX_ENCODED = new Uint8Array([255]);
export const U8_MIN_ENCODED = new Uint8Array([0]);
export const U16_MIN = 0;
export const U16_MAX = 2 ** 16 - 1;
export const U16_MAX_ENCODED = new Uint8Array([255, 255]);
export const U16_MIN_ENCODED = new Uint8Array([0, 0]);
export const U32_MIN = 0;
export const U32_MAX = 2 ** 32 - 1;
export const U32_MAX_ENCODED = new Uint8Array([255, 255, 255, 255]);
export const U32_MIN_ENCODED = new Uint8Array([0, 0, 0, 0]);
export const U64_MIN = 0;
export const U64_MAX = bn(2).pow(64).sub(1);
export const U64_MAX_ENCODED = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]);
export const U64_MIN_ENCODED = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
export const U256_MIN = 0;
export const U256_MAX = bn(2).pow(256).sub(1);
export const U256_MAX_ENCODED = new Uint8Array(32).fill(255);
export const U256_MIN_ENCODED = new Uint8Array(32).fill(0);

export const EMPTY_8_BYTE_ARRAY = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
export const ENUM_FIRST_INDEX = EMPTY_8_BYTE_ARRAY;
export const ENUM_SECOND_INDEX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
export const ENUM_THIRD_INDEX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]);

export const STRING_MIN_DECODED = '';
export const STRING_MIN_ENCODED = new Uint8Array();
export const STRING_MAX_DECODED = 'a'.repeat(U8_MAX);
export const STRING_MAX_ENCODED = new Uint8Array([
  ...Array.from(Array(U8_MAX + 1).fill(97, 0, U8_MAX)),
]);

export const B256_DECODED = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
export const B256_ENCODED = new Uint8Array([
  213, 87, 156, 70, 223, 204, 127, 24, 32, 112, 19, 230, 91, 68, 228, 203, 78, 44, 34, 152, 244,
  172, 69, 123, 168, 248, 39, 67, 243, 30, 147, 11,
]);
export const B256_ZERO_DECODED =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
export const B256_ZERO_ENCODED = new Uint8Array(32);

export const BYTE_MIN_DECODED = 0;
export const BYTE_MIN_ENCODED = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
export const BYTE_MAX_DECODED = U8_MAX;
export const BYTE_MAX_ENCODED = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]);

export const BOOL_TRUE_ENCODED = new Uint8Array([1]);
export const BOOL_FALSE_ENCODED = new Uint8Array([0]);

export const B512_DECODED =
  '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';
export const B512_ENCODED = new Uint8Array([
  142, 157, 218, 111, 119, 147, 116, 90, 197, 170, 207, 158, 144, 124, 174, 48, 178, 160, 31, 223,
  13, 35, 183, 117, 10, 133, 198, 164, 79, 202, 12, 41, 240, 144, 111, 157, 31, 30, 146, 230, 161,
  251, 60, 61, 206, 243, 204, 59, 60, 219, 170, 226, 126, 71, 185, 217, 164, 198, 164, 252, 228,
  207, 22, 178,
]);
export const B512_ZERO_DECODED =
  '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
export const B512_ZERO_ENCODED = new Uint8Array(64);
