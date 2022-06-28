import type { DatumType } from '../parser/parseSvmTypes';

import { generateInputType, generateOutputType } from './types';

/**
 * Generates TS structs for ABI target
 */
export default function generateStruct(datum: DatumType): string {
  if (datum.structName) {
    return `
      export type ${datum.structName}Input = ${generateInputType(datum, {
      useStructs: false,
    })}

      export type ${datum.structName}Output = ${generateOutputType(datum, {
      useStructs: false,
    })}
      `;
  }
  return '';
}
