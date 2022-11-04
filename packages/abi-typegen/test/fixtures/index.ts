import { join } from 'path';

const fixturesDir = join(__dirname);

const enumOnly = join(fixturesDir, 'contract-enum-only.sw');
const full = join(fixturesDir, 'contract-full.sw');
const minimal = join(fixturesDir, 'contract-minimal.sw');
const optionOnly = join(fixturesDir, 'contract-option-only.sw');
const multiLevelStructs = join(fixturesDir, 'contract-multi-level-structs.sw');
const vectorOnly = join(fixturesDir, 'contract-vector-only.sw');

export const contractPaths = {
  enumOnly,
  full,
  minimal,
  optionOnly,
  vectorOnly,
  multiLevelStructs,
};
