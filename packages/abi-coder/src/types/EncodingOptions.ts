import type { EncodingVersion } from '../utils/constants';

/**
 * These are configurable options to be used when encoding.
 *
 * Firstly we should consider the encoding version being used. For more info on this
 * please refer to the fuel specs (https://github.com/FuelLabs/fuel-specs);
 *
 * Encoding Version 1:
 *
 * As version 1 aims to make call data as compact as possible, types are only using their required
 * property space. In the VM, they are still padded. Therefore the following option is available:
 *
 * 1) padToWordSize (default=false)
 *
 * Describes if the encoding should be padded to the word size.
 *
 * false —— no padding (default).
 * true —— padding to the word size, and should be used when underneath:
 *   • number(u8, u16, u32)
 *   • boolean
 */
export type EncodingOptions = {
  encoding?: EncodingVersion;
  padToWordSize?: boolean;
};
