import { readFileSync } from 'fs';
import type { BN } from 'fuels';
import { Script, bn } from 'fuels';
import { join } from 'path';

import { createWallet } from './utils';

let script: Script;
let gasPrice: BN;

const U8_MAX = 255;
const U16_MAX = 65535;
const U32_MAX = 4294967295;
export const U64_MAX = bn(2).pow(64).sub(1);
export const U256_MAX = bn(2).pow(256).sub(1);

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
  it.skip('prints u8', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual(U8_MAX);
  });

  it.skip('prints u16', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual(U16_MAX);
  });

  it.skip('prints u32', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual(U32_MAX);
  });

  it.skip('prints u64', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual(U64_MAX);
  });

  it.skip('prints u256', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual(U256_MAX);
  });

  it('prints b256', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual(
      '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6'
    );
  });
});
