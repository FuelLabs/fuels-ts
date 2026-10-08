import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const bytecode = readFileSync(
  join(__dirname, '../../../internal/fuel-core/fuel-core-binaries/fuel-core-wasm-executor.wasm')
);

writeFileSync(
  join(__dirname, '../test/fixtures/chain-config/state_transition_bytecode.generated.ts'),
  `export const STATE_TRANSITION_BYTECODE = '0x${bytecode.toString('hex')}';\n`
);
