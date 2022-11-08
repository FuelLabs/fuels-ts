import { join } from 'path';

const fixturesDir = join(__dirname);

const arrayOnly = join(fixturesDir, 'contract-array-only.sw');
const enumOnly = join(fixturesDir, 'contract-enum-only.sw');
const enumsOfEnums = join(fixturesDir, 'contract-enums-of-enums.sw');
const enumsOfStructs = join(fixturesDir, 'contract-enums-of-structs.sw');
const full = join(fixturesDir, 'contract-full.sw');
const minimal = join(fixturesDir, 'contract-minimal.sw');
const multiLevelStructs = join(fixturesDir, 'contract-multi-level-structs.sw');
const optionOnly = join(fixturesDir, 'contract-option-only.sw');
const structOnly = join(fixturesDir, 'contract-struct-only.sw');
const tupleOnly = join(fixturesDir, 'contract-tuple-only.sw');
const vectorOnly = join(fixturesDir, 'contract-vector-only.sw');

export const contractPaths = {
  arrayOnly,
  enumOnly,
  enumsOfEnums,
  enumsOfStructs,
  full,
  minimal,
  multiLevelStructs,
  optionOnly,
  structOnly,
  tupleOnly,
  vectorOnly,
};
