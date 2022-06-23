import type { EnumType, StructType, TupleType } from '../parser/parseSvmTypes';

import { generateInputType, generateOutputType } from './types';

/**
 * Generates TS structs for ABI target
 */
export default function generateStruct(struct: StructType | TupleType | EnumType): string {
  if (struct.structName) {
    return `
      export type ${struct.structName}Input = ${generateInputType(struct, {
      useStructs: false,
    })}

      export type ${struct.structName}Output = ${generateOutputType(struct, {
      useStructs: false,
    })}
      `;
  }
  return '';
}
