import BN from 'bn.js';

export { BN };

export const bn = (
  value: number | string | number[] | Uint8Array | Buffer | BN,
  base?: number | 'hex',
  endian?: BN.Endianness
) => {
  // trim '0x' from hex strings as BN doesn't support it - https://github.com/ChainSafe/web3.js/issues/3847
  if (typeof value === 'string' && value.slice(0, 2) === '0x') {
    return new BN(value.substring(2), base || 'hex', endian);
  }

  return new BN(value, base, endian);
};
