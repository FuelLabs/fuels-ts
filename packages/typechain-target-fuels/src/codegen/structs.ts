import type { TupleType } from '../parser/parseSvmTypes';

import { STRUCT_POSTFIX } from './reserved-keywords';
import { generateInputType } from './types';

/**
 * Generates TS structs for ABI target
 */
export default function generateStruct(struct: TupleType): string {
  if (struct.structName) {
    return `
      export type ${struct.structName}${STRUCT_POSTFIX} = ${generateInputType(struct, {
      useStructs: false,
    })}
      `;
  }
  return '';
}
