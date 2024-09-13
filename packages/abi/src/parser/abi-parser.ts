import type { Abi } from './abi';
import type { AbiSpecificationV1 } from './specifications';
import { AbiParserV1 } from './specifications';

/**
 * A typed ABI object or a stringified json of a Sway program's ABI
 */
export type AbiSpecification = AbiSpecificationV1;

export class AbiParser {
  /**
   * ABI specifications transpilers
   */
  private static specifications = {
    '1': AbiParserV1.parse,
  } as const;

  /**
   * Parses an ABI in JSON format.
   *
   * @param abi - a JSON ABI of a Sway program
   * @returns an public interface for the Abi
   */
  static parse(abi: AbiSpecification): Abi {
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
