import { readFileSync } from 'fs';
import { Script, bn } from 'fuels';
import { join } from 'path';

import { createWallet } from './utils';

let echoScript: Script;
let printScript: Script;
const U8_MAX = 255;
const U16_MAX = 65535;
const U32_MAX = 4294967295;
const U64_MAX = bn(2).pow(64).sub(1);
const U256_MAX = bn(2).pow(256).sub(1);
const B512 =
  '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';

const getScript = async (name: string) => {
  const wallet = await createWallet();
  const path = join(
    __dirname,
    `../test/fixtures/forc-projects-experimental/${name}/out/release/${name}`
  );
  const bytes = readFileSync(`${path}.bin`);
  const abi = JSON.parse(readFileSync(`${path}-abi.json`, 'utf8'));
  return new Script(bytes, abi, wallet);
};

beforeAll(async () => {
  printScript = await getScript('script-print');
  echoScript = await getScript('script-echo');
});

/**
 * @group node
 */
describe('Experimental Script', () => {
  it('prints mixed struct with all types', async () => {
    const { value } = await printScript.functions.main(B512).call();
    expect(value).toStrictEqual({
      a: U8_MAX,
      b: U16_MAX,
      c: U32_MAX,
      d: U64_MAX,
      e: U256_MAX,
      f: '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6',
      g: B512,
      native: 'Pending',
      mixed: { Value: true },
      grades: [1, 4, 6, 22],
      fuel: 'fuel',
      hello: 'Hello World',
      opt: 42,
      nada: undefined,
      bytes: Uint8Array.from([40, 41, 42]),
      tuple: [U8_MAX, U16_MAX, U32_MAX, 'fuel'],
      vec_u8: [40, 41, 42],
      deep: {
        a: U8_MAX,
        b: U16_MAX,
        c: U32_MAX,
        d: U64_MAX,
        e: U256_MAX,
        f: '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6',
        g: B512,
        native: 'Pending',
        mixed: { Value: true },
        grades: [1, 4, 6, 22],
        fuel: 'fuel',
        hello: 'Hello World',
        opt: 42,
        nada: undefined,
        bytes: Uint8Array.from([40, 41, 42]),
        tuple: [U8_MAX, U16_MAX, U32_MAX, 'fuel'],
        vec_u8: [40, 41, 42],
      },
    });
  });

  it('echos number struct', async () => {
    const struct = {
      a: U8_MAX,
      b: U16_MAX,
      c: U32_MAX,
      d: U64_MAX,
      e: U256_MAX,
    };

    const { value } = await echoScript.functions.main(struct).call();
    expect(value).toStrictEqual(struct);
  });
});
