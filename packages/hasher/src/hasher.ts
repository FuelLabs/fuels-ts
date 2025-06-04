/**
 * Convert a uint64 number to a big-endian byte array
 */
export function uint64ToBytesBE(value: number): Uint8Array {
  const bigIntValue = BigInt(value);
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);
  dataView.setBigUint64(0, bigIntValue, false); // write the uint64 value in big-endian order
  return new Uint8Array(dataView.buffer);
}
