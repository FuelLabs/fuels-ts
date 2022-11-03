import { join } from 'path';

const fixturesDir = join(__dirname);
const enumOnly = join(fixturesDir, 'contract-enum-only.sw');
const optionOnly = join(fixturesDir, 'contract-option-only.sw');
const minimal = join(fixturesDir, 'contract-minimal.sw');
const full = join(fixturesDir, 'contract-full.sw');

export const contractPaths = {
  enumOnly,
  optionOnly,
  minimal,
  full,
};
