import { join } from 'path';

const fixturesDir = join(__dirname);

const arrayOfEnums = join(fixturesDir, 'array-of-enums.sw');
const arrayWithGenerics = join(fixturesDir, 'array-with-generics.sw');
const enumOfEnums = join(fixturesDir, 'enum-of-enums.sw');
const enumOfStructs = join(fixturesDir, 'enum-of-structs.sw');
const enumSimple = join(fixturesDir, 'enum-simple.sw');
const fnVoid = join(fixturesDir, 'fn-void.sw');
const full = join(fixturesDir, 'full.sw');
const minimal = join(fixturesDir, 'minimal.sw');
const optionSimple = join(fixturesDir, 'option-simple.sw');
const script = join(fixturesDir, 'script.sw');
const structNested = join(fixturesDir, 'struct-nested.sw');
const structSimple = join(fixturesDir, 'struct-simple.sw');
const structWithArray = join(fixturesDir, 'struct-with-array.sw');
const tupleSimple = join(fixturesDir, 'tuple-simple.sw');
const vectorSimple = join(fixturesDir, 'vector-simple.sw');

export const contractPaths: { [key: string]: string } = {
  arrayOfEnums,
  arrayWithGenerics,
  enumOfEnums,
  enumOfStructs,
  enumSimple,
  fnVoid,
  full,
  minimal,
  optionSimple,
  script,
  structNested,
  structSimple,
  structWithArray,
  tupleSimple,
  vectorSimple,
};
