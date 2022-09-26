import type { DatumType } from '../parser/parseSvmTypes';
import { getNamePrefix } from '../utils';

import { generateInputType, generateOutputType } from './types';

/**
 * Generates TS structs for ABI target
 */
export default function generateStruct(datum: DatumType): string {
  if (datum.structName) {
    return `
      export type ${getNamePrefix(datum)}Input = ${generateInputType(datum, {
      useStructs: false,
    })}

      export type ${getNamePrefix(datum)}Output = ${generateOutputType(datum, {
      useStructs: false,
    })}
      `;
  }
  return '';
}
