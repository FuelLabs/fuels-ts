import { readFileSync } from 'fs';
import type { BN } from 'fuels';
import { Script } from 'fuels';
import { join } from 'path';

import { createWallet } from './utils';

let script: Script;
let gasPrice: BN;

const U8_MAX = 255;
const U16_MAX = 65535;
const U32_MAX = 4294967295;

beforeAll(async () => {
  const projectName = 'script';
  const path = join(
    __dirname,
    `../test/fixtures/forc-projects-experimental/${projectName}/out/release/${projectName}`
  );
  const bytes = readFileSync(`${path}.bin`);
  const abi = JSON.parse(readFileSync(`${path}-abi.json`, 'utf8'));

  const wallet = await createWallet();

  script = new Script(bytes, abi, wallet);

  ({ minGasPrice: gasPrice } = wallet.provider.getGasConfig());
});

/**
 * @group node
 */
describe('Experimental Logging', () => {
  it('prints u8 u16 tuple', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual([U8_MAX, U16_MAX]);
  });
});
