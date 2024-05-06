import type { EncodingVersion } from '../utils/constants';

/**
 * These are configurable options to be used when encoding.
 *
 * Firstly we should consider the encoding version being used. For more info on this
 * please refer to the fuel specs (https://github.com/FuelLabs/fuel-specs);
 *
 * Encoding Version 0:
 *
 * This is the currently supported version. It offers the following configurable options
 * regarding the encoding of small bytes:
 *
 * These options relates only to:
 *  - NumberCoder (u8, u16, u32)
 *  - BooleanCoder
 *
 * 1) isSmallBytes (default=false)
 *
 * Describes how many bytes it will occupy:
 *
 * false — occupies 8 bytes (default), and should be used when underneath:
 *    • standalone
 *    • tuple
 *    • struct
 *    • enum
 *
 * true — occupies 1 byte, and should be used when underneath:
 *    • array
 *    • vector
 *
 *
 *
 * 2) isRightPadded (default=false)
 *
 * Used only when `isSmallBytes` is FALSE.
 *
 * Describes how the padding should happen:
 *
 *  false —— left padded (default), and should be used when underneath:
 *    • standalone
 *    • array
 *    • vector
 *    • enum
 *    • only one function argument
 *
 *  true —— right padded, and should be used when underneath:
 *    • struct
 *    • tuple
 *    • multiple function arguments
 *    • configurable
 *
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
  isSmallBytes?: boolean;
  isRightPadded?: boolean;
  padToWordSize?: boolean;
};
