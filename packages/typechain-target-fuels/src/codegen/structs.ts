import type { TupleType } from '../parser/parseSvmTypes';

import { generateInputType, parseClassName } from './types';

/**
 * Generates TS structs for ABI target
 */
export default function generateStruct(struct: TupleType): string {
  if (struct.structName) {
    return `
      export type ${parseClassName(struct)} = ${generateInputType(struct, {
      useStructs: false,
    })}
      `;
  }
  return '';
}
