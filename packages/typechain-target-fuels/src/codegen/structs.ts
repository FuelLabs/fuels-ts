import type { TupleType } from '../parser/parseSvmTypes';

import { generateInputType, generateOutputType } from './types';

/**
 * Generates TS structs for ABI target
 */
export default function generateStruct(struct: TupleType): string {
  if (struct.structName) {
    return `
      export type ${struct.structName}Input = ${generateInputType(struct, {
      useStructs: false,
    })}

      export type ${struct.structName} = ${generateOutputType(struct, {
      useStructs: false,
    })}
      `;
  }
  return '';
}
