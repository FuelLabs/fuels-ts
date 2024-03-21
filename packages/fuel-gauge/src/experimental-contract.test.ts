import { readFileSync } from 'fs';
import type { BN, Contract } from 'fuels';
import { bn } from 'fuels';
import { join } from 'path';

import { setup } from './utils';

let contractInstance: Contract;
let gasPrice: BN;

const U8_MAX = 2 ** 8 - 1;
const U16_MAX = 2 ** 16 - 1;
const U32_MAX = 2 ** 32 - 1;
const U64_MAX = bn(2).pow(64).sub(1);
const U256_MAX = bn(2).pow(256).sub(1);
const B512 =
  '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';

beforeAll(async () => {
  const projectName = 'contract-echo';
  const path = join(
    __dirname,
    `../test/fixtures/forc-projects-experimental/${projectName}/out/release/${projectName}`
  );
  const contractBytecode = readFileSync(`${path}.bin`);
  const abi = JSON.parse(readFileSync(`${path}-abi.json`, 'utf8'));

  contractInstance = await setup({ contractBytecode, abi });

  ({ minGasPrice: gasPrice } = contractInstance.provider.getGasConfig());
});

describe('Experimental Contract', () => {
  it('echos mixed struct with all types', async () => {
    const struct = {
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
      str_slice: 'fuel',
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
        even_deeper: {
          nested_vec: [1, 2, 3, 4, 5],
          nested_str: 'fuel labs',
          nested_raw: [88, 89, 90, 100],
        },
      },
    };

    const { value } = await contractInstance.functions.echo_struct(struct).call();
    expect(value).toStrictEqual(struct);
  });

  it('extracts str slice from revert', async () => {
    await expect(contractInstance.functions.test_revert().call()).rejects.toThrow(
      /The script reverted with reason RequireFailed/
    );
  });
});
