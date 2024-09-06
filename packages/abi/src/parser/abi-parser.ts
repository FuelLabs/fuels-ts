import type { Abi } from './abi';
import type { AbiSpecificationV1 } from './specifications';
import { ParserV1 } from './specifications';

/**
 * A typed ABI object or a stringified json of a Sway program's ABI
 */
export type AbiSpecification = AbiSpecificationV1;

export class AbiParser {
  /**
   * ABI specifications transpilers
   */
  private static specifications = {
    '1': ParserV1.parse,
  } as const;

  /**
   * Parses an ABI in JSON format.
   *
   * @param opts
   * @param opts.abi - a JSON ABI of a Sway program
   * @returns an public interface for the Abi
   */
  static parse(abi: AbiSpecification, opts = {}): Abi {
    if (typeof abi !== 'object' || abi === null) {
      throw new Error('Invalid ABI: not an object');
    }

    if (typeof abi.specVersion !== 'string') {
      // TODO: change to FuelError
      throw new Error('Invalid ABI: specVersion is not a string');
    }

    const parse = AbiParser.specifications[abi.specVersion];
    if (!parse) {
      // TODO: change to FuelError
      throw new Error(`Unsupported ABI specVersion: ${abi.specVersion}`);
    }

    return parse(abi);
  }
}
