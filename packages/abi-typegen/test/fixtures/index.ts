import { join } from 'path';

const fixturesDir = join(__dirname);

const arraySimple = join(fixturesDir, 'array-simple.sw');
const enumOfEnums = join(fixturesDir, 'enum-of-enums.sw');
const enumOfStructs = join(fixturesDir, 'enum-of-structs.sw');
const enumSimple = join(fixturesDir, 'enum-simple.sw');
const full = join(fixturesDir, 'full.sw');
const minimal = join(fixturesDir, 'minimal.sw');
const optionSimple = join(fixturesDir, 'option-simple.sw');
const structSimple = join(fixturesDir, 'struct-simple.sw');
const structsMultiLevel = join(fixturesDir, 'structs-multi-level.sw');
const tupleSimple = join(fixturesDir, 'tuple-simple.sw');
const vectorSimple = join(fixturesDir, 'vector-simple.sw');

export const contractPaths = {
  arraySimple,
  enumOfEnums,
  enumOfStructs,
  enumSimple,
  full,
  minimal,
  optionSimple,
  structSimple,
  structsMultiLevel,
  tupleSimple,
  vectorSimple,
};
