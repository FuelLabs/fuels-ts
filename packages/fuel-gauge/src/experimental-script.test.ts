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
const U64_MAX = bn(2).pow(64).sub(1);
const U256_MAX = bn(2).pow(256).sub(1);
const B512 =
  '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';

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

  it.skip('prints b256', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual(
      '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6'
    );
  });

  it.skip('echos b512', async () => {
    const { value } = await script.functions.main(B512).call();
    expect(value).toStrictEqual(B512);
  });

  it.skip('prints string', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual('fuel');
  });

  it.skip('prints std string', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual('Hello World');
  });

  /**
   * Currently throws, need to confirm with Daniel
   */
  it.skip('logs str slice', async () => {
    const expected = 'fuel';

    const { value } = await script.functions.main(expected).call();
    expect(value).toStrictEqual(expected);
  });

  it.skip('prints struct enum u8 vec', async () => {
    const { value } = await script.functions.main().call();
    expect(value).toStrictEqual({
      x: 5,
      y: 128,
      state: 'Pending',
      grades: [1, 4, 6, 22],
      tag: 'fuel',
    });
  });

  it('prints mixed struct', async () => {
    const { value } = await script.functions.main(B512).call();
    expect(value).toStrictEqual({
      a: 5,
      b: 65535,
      c: 4294967295,
      d: U64_MAX,
      e: U256_MAX,
      f: '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6',
      g: B512,
      native: 'Pending',
      mixed: { Value: true },
      grades: [1, 4, 6, 22],
      fuel: 'fuel',
      hello: 'Hello World',
    });
  });
});
