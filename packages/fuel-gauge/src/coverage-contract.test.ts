import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { WalletConfig } from '@fuel-ts/wallet/test-utils';
import type { BN } from 'fuels';
import {
  bn,
  toHex,
  Wallet,
  ScriptTransactionRequest,
  BaseAssetId,
  isMessage,
  isCoin,
  randomBytes,
  hexlify,
  getRandomB256,
} from 'fuels';

import { getContractDir } from './utils';

const RUST_U8_MAX = 255;
const RUST_U16_MAX = 65535;
const RUST_U32_MAX = 4294967295;
const B256 = '0x000000000000000000000000000000000000000000000000000000000000002a';
const B512 =
  '0x059bc9c43ea1112f3eb2bd30415de72ed24c1c4416a1316f0f48cc6f958073f42a6d8c12e4829826316d8dcf444498717b5a2fbf27defac367271065f6a1d4a5';

const coverageContractDir = getContractDir('coverage-contract');

enum SmallEnum {
  Empty = 'Empty',
}

enum ColorEnumInput {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
}

enum ColorEnumOutput {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
}

/**
 * @group node
 */
describe('Coverage Contract', () => {
  beforeAll(async () => {
    const start = vi.getRealSystemTime();
    await TestNodeLauncher.prepareCache(52);
    const end = vi.getRealSystemTime();
    console.log('time', start, end, (end - start) / 1000, 's');
    return async () => TestNodeLauncher.cleanCache();
  });
  it('can return outputs', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    // Call contract methods
    expect((await contractInstance.functions.get_id().txParams({ gasPrice }).call()).value).toEqual(
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    expect(
      (await contractInstance.functions.get_small_string().txParams({ gasPrice }).call()).value
    ).toEqual('gggggggg');
    expect(
      (await contractInstance.functions.get_large_string().txParams({ gasPrice }).call()).value
    ).toEqual('ggggggggg');
    expect(
      (await contractInstance.functions.get_u32_struct().txParams({ gasPrice }).call()).value
    ).toStrictEqual({
      foo: 100,
    });
    expect(
      (await contractInstance.functions.get_large_struct().txParams({ gasPrice }).call()).value
    ).toStrictEqual({
      foo: 12,
      bar: 42,
    });
    expect(
      (await contractInstance.functions.get_large_array().txParams({ gasPrice }).call()).value
    ).toStrictEqual([1, 2]);
    expect(
      (await contractInstance.functions.get_empty_enum().txParams({ gasPrice }).call()).value
    ).toStrictEqual(SmallEnum.Empty);
    expect(
      (await contractInstance.functions.get_contract_id().txParams({ gasPrice }).call()).value
    ).toStrictEqual({
      value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    });
    expect(
      (await contractInstance.functions.get_some_option_u8().txParams({ gasPrice }).call()).value
    ).toEqual(113);
    expect(
      (await contractInstance.functions.get_none_option_u8().txParams({ gasPrice }).call()).value
    ).toEqual(undefined);
  });

  it('should test u8 variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    // #region U8
    const { value } = await contractInstance.functions.echo_u8(3).txParams({ gasPrice }).call();
    expect(value).toBe(3);
    // #endregion U8
  });

  it('should test u8 variable type multiple params', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_u8_addition(3, 4, 3)
      .txParams({ gasPrice })
      .call();
    expect(value).toBe(10);
  });

  it('should test u16 variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_u16(RUST_U8_MAX + 1)
      .txParams({ gasPrice })
      .call();
    expect(value).toBe(RUST_U8_MAX + 1);
  });

  it('should test u32 variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_u32(RUST_U16_MAX + 1)
      .txParams({ gasPrice })
      .call();
    expect(value).toBe(RUST_U16_MAX + 1);
  });

  it('should test u64 variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = bn(RUST_U32_MAX).add(1).toHex();
    const { value } = await contractInstance.functions
      .echo_u64(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(value.toHex()).toBe(INPUT);
  });

  it('should test bool variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_bool(false)
      .txParams({ gasPrice })
      .call();
    expect(value).toBe(false);
  });

  it('should test b256 variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_b256(B256)
      .txParams({ gasPrice })
      .call();
    expect(value).toBe(B256);
  });

  it('should test b512 variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_b512(B512)
      .txParams({ gasPrice })
      .call();
    expect(value).toBe(B512);
  });

  it('should test str[1] variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_str_1('f')
      .txParams({ gasPrice })
      .call();
    expect(value).toBe('f');
  });

  it('should test str[2] variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_str_2('fu')
      .txParams({ gasPrice })
      .call();
    expect(value).toBe('fu');
  });

  it('should test str[3] variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_str_3('fue')
      .txParams({ gasPrice })
      .call();
    expect(value).toBe('fue');
  });

  it('should test str[8] variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_str_8('fuel-sdk')
      .txParams({ gasPrice })
      .call();

    expect(value).toBe('fuel-sdk');
  });

  it('should test str[9] variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_str_9('fuel-sdks')
      .txParams({ gasPrice })
      .call();
    expect(value).toBe('fuel-sdks');
  });

  it('should test tuple < 8 bytes variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_tuple_u8([21, 22])
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual([21, 22]);
  });

  it('should test tuple > 8 bytes variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = [bn(RUST_U32_MAX).add(1), bn(RUST_U32_MAX).add(2)];
    const { value } = await contractInstance.functions
      .echo_tuple_u64(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(INPUT));
  });

  it('should test tuple mixed variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = [true, bn(RUST_U32_MAX).add(1)];
    const { value } = await contractInstance.functions
      .echo_tuple_mixed(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(INPUT));
  });

  it('should test array < 8 bytes variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_array_u8([4, 3])
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual([4, 3]);
  });

  it('should test array > 8 bytes variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT: [number, string, BN, string, string] = [
      11,
      toHex(RUST_U32_MAX + 2),
      bn(RUST_U32_MAX).add(3),
      toHex(bn('9009', 10)),
      '0x1fffffffffffff',
    ];
    const { value } = await contractInstance.functions
      .echo_array_u64(INPUT)
      .txParams({ gasPrice })
      .call();

    const OUTPUT = INPUT.map((v) => toHex(v));
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(OUTPUT));
  });

  it('should test array bool variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_array_bool([true, true])
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual([true, true]);
  });

  it('should test struct < 8 bytes variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = { i: 4 };
    const { value } = await contractInstance.functions
      .echo_struct_u8(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test struct > 8 bytes variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = { i: B256 };
    const { value } = await contractInstance.functions
      .echo_struct_b256(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test enum < 8 byte variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = SmallEnum.Empty;
    const { value } = await contractInstance.functions
      .echo_enum_small(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test enum > 8 bytes variable type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = { AddressB: B256 };

    const { value } = await contractInstance.functions
      .echo_enum_big(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test Option<u8> type', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = 187;
    const { value } = await contractInstance.functions
      .echo_option_u8(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test Option<u32> extraction [Some]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_SOME = 123;
    const { value: Some } = await contractInstance.functions
      .echo_option_extract_u32(INPUT_SOME)
      .txParams({ gasPrice })
      .call();
    expect(Some).toStrictEqual(INPUT_SOME);
  });

  it('should test Option<u32> extraction [None]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_NONE = undefined;
    const { value: None } = await contractInstance.functions
      .echo_option_extract_u32(INPUT_NONE)
      .txParams({ gasPrice })
      .call();
    expect(None).toStrictEqual(500);

    const { value: NoneVoid } = await contractInstance.functions
      .echo_option_extract_u32()
      .txParams({ gasPrice })
      .call();
    expect(NoneVoid).toStrictEqual(500);
  });

  it('should test multiple Option<u32> params [Some]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_A = 1;
    const INPUT_B = 4;
    const INPUT_C = 5;

    // adds the three values (if Some value given) together
    const { value: Some } = await contractInstance.functions
      .echo_option_three_u8(INPUT_A, INPUT_B, INPUT_C)
      .txParams({ gasPrice })
      .call();

    // we receive the result of adding whatever was passed
    expect(Some).toStrictEqual(10);
  });

  it('should test multiple Option<u32> params [None]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = 1;

    // adds the three values together, but only first param value is supplied
    const { value: Some } = await contractInstance.functions
      .echo_option_three_u8(INPUT)
      .txParams({ gasPrice })
      .call();

    // we receive the result of adding whatever was passed
    expect(Some).toStrictEqual(1);
  });

  it('should test u8 empty vector input', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .check_u8_vector([])
      .txParams({ gasPrice })
      .call();
    expect(value).toBeFalsy();
  });

  it('should test u8 vector input', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value, logs } = await contractInstance.functions
      .check_u8_vector([1, 2, 3, 4, 5])
      .txParams({ gasPrice })
      .call();

    expect(value).toBeTruthy();

    const formattedLog = logs.map((l) => (typeof l === 'string' ? l : bn(l).toNumber()));
    expect(formattedLog).toEqual(['vector.items', 1, 2, 3, 4, 5, 'vector.len', 5]);
  });

  it('should echo u8 vector input', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_u8_vector_first([23, 6, 1, 51, 2])
      .txParams({ gasPrice })
      .call();

    expect(value).toBe(23);
  });

  it('should echo a vector of optional u8 input', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_u8_option_vector_first([28])
      .txParams({ gasPrice })
      .call();

    expect(value).toBe(28);
  });

  it('should echo u64 vector input', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = bn(54).toHex();
    const { value } = await contractInstance.functions
      .echo_u64_vector_last([200, 100, 24, 51, 23, INPUT])
      .txParams({ gasPrice })
      .call();
    expect(value.toHex()).toBe(INPUT);
  });

  it('should echo u32 vector addition of mixed params', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_u32_vector_addition_other_type([100, 2], 47)
      .txParams({ gasPrice })
      .call();
    expect(value).toBe(147);
  });

  it('should echo u32 vector addition', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2], [24, 54])
      .txParams({ gasPrice })
      .call();
    expect(value).toBe(124);
  });

  it('should echo u32 vector addition [variable lengths]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2, 1, 2, 3], [24, 54])
      .txParams({ gasPrice })
      .call();
    expect(value).toBe(124);
  });

  it('should echo struct vector input', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const first = {
      foo: 1,
      bar: 10,
    };
    const { value } = await contractInstance.functions
      .echo_struct_vector_first([
        first,
        {
          foo: 2,
          bar: 20,
        },
        {
          foo: 3,
          bar: 30,
        },
      ])
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual(first);
  });

  it('should echo complex struct vector input', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const last = {
      foo: 3,
      bar: bn(31337).toHex(),
      baz: 'abcdefghi',
    };
    const { value } = await contractInstance.functions
      .echo_struct_vector_last([
        {
          foo: 1,
          bar: 11337n,
          baz: '123456789',
        },
        {
          foo: 2,
          bar: 21337n,
          baz: 'alphabet!',
        },
        last,
      ])
      .txParams({ gasPrice })
      .call();
    const unhexed = {
      foo: value.foo,
      bar: bn(value.bar).toHex(),
      baz: value.baz,
    };
    expect(unhexed).toStrictEqual(last);
  });

  it.skip('should get initial state messages from node', async () => {
    const WALLET_A = Wallet.fromPrivateKey(
      '0x1ff16505df75735a5bcf4cb4cf839903120c181dd9be6781b82cda23543bd242',
      // @ts-expect-error will be set
      null
    );
    const WALLET_B = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      // @ts-expect-error will be set
      null
    );

    const EXPECTED_MESSAGE_A = {
      messageId: '0x9ca8b2c626327692c7a865d0bbfe6232503e8dc0f7c442abe0b864ffdcca2da9',
      sender: WALLET_B.address.toB256(),
      recipient: WALLET_A.address.toB256(),
      nonce: '0x0101010101010101010101010101010101010101010101010101010101010101',
      amount: bn('ffff', 'hex').toHex(),
      data: '',
      da_height: '0x00',
    };
    const EXPECTED_MESSAGES_B = {
      messageId: '0x39578ef8c047ae994d0dadce8015559953b32fffa657c25c4c068fe4d6995a4b',
      sender: WALLET_A.address.toB256(),
      recipient: WALLET_B.address.toB256(),
      nonce: '0x0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b0e1ef2963832068b',
      amount: bn('12704439083013451934').toHex(),
      data: '',
      da_height: '0x00',
    };

    await using launched = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({ wallets: [WALLET_A, WALLET_B] }),
      nodeOptions: {
        chainConfig: {
          initial_state: {
            messages: [EXPECTED_MESSAGE_A, EXPECTED_MESSAGES_B],
          },
        },
      },
    });

    // #region Message-getMessages

    const aMessages = await WALLET_A.getMessages();
    const bMessages = await WALLET_B.getMessages();

    expect(aMessages).toStrictEqual([EXPECTED_MESSAGE_A]);
    expect(bMessages).toStrictEqual([EXPECTED_MESSAGES_B]);
    // #endregion Message-getMessages
  });

  it('should test spending input messages', async () => {
    const recipient = Wallet.generate({
      // @ts-expect-error will be set
      provider: null,
    });
    const sender = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      // @ts-expect-error will be set
      null
    );

    const senderMessage = {
      messageId: '0x9ca8b2c626327692c7a865d0bbfe6232503e8dc0f7c442abe0b864ffdcca2da9',
      sender: getRandomB256(),
      recipient: sender.address.toB256(),
      nonce: '0x0101010101010101010101010101010101010101010101010101010101010101',
      amount: bn('ffff', 'hex').toHex(),
      data: '',
      da_height: '0x00',
    };

    await using launched = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({ wallets: [recipient, sender], amountPerCoin: 10 }),
      nodeOptions: {
        chainConfig: {
          initial_state: {
            messages: [senderMessage],
          },
        },
      },
    });
    const { provider } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const request = new ScriptTransactionRequest({ gasLimit: 1000000, gasPrice });

    const coins = await sender.getResourcesToSpend([[bn(100), BaseAssetId]]);

    expect(coins.length).toEqual(1);
    expect(isMessage(coins[0])).toBeTruthy();
    expect(isCoin(coins[0])).toBeFalsy();

    request.addResources(coins);
    request.addCoinOutput(recipient.address, 10, BaseAssetId);

    const response = await sender.sendTransaction(request);
    const result = await response.waitForResult();

    expect(result.status).toEqual('success');
  });

  it('can read from produce_logs_variables', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { logs } = await contractInstance.functions
      .produce_logs_variables()
      .txParams({ gasPrice })
      .call();

    expect(logs[0].toHex()).toEqual(bn(64).toHex());
    expect(logs[1]).toEqual('0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a');
    expect(logs[2]).toEqual('Fuel');
    expect(logs[3]).toEqual([1, 2, 3]);
  });

  it('should test native enum [Red->Green]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT: ColorEnumInput = ColorEnumInput.Red;
    const OUTPUT: ColorEnumOutput = ColorEnumOutput.Green;
    const { value } = await contractInstance.functions
      .color_enum(INPUT)
      .txParams({ gasPrice })
      .call();

    expect(value).toStrictEqual(OUTPUT);
  });

  it('should test native enum [Green->Blue]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT: ColorEnumInput = ColorEnumInput.Green;
    const OUTPUT: ColorEnumOutput = ColorEnumOutput.Blue;

    const { value } = await contractInstance.functions
      .color_enum(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual(OUTPUT);
  });

  it('should test native enum [Blue->Red]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT: ColorEnumInput = ColorEnumInput.Blue;
    const OUTPUT: ColorEnumOutput = ColorEnumOutput.Red;

    const { value } = await contractInstance.functions
      .color_enum(INPUT)
      .txParams({ gasPrice })
      .call();
    expect(value).toStrictEqual(OUTPUT);
  });

  it('should try vec_as_only_param', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .vec_as_only_param([100, 450, 202, 340])
      .txParams({ gasPrice })
      .call();

    expect(value.map((v: BN) => v.toHex())).toStrictEqual([
      bn(4).toHex(),
      bn(100).toHex(),
      bn(450).toHex(),
      bn(202).toHex(),
    ]);
  });

  it('should try u32_and_vec_params', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const { value } = await contractInstance.functions
      .u32_and_vec_params(33, [450, 202, 340])
      .txParams({ gasPrice })
      .call();

    expect(value.map((v: BN) => v.toHex())).toStrictEqual([
      bn(3).toHex(),
      bn(450).toHex(),
      bn(202).toHex(),
      bn(340).toHex(),
    ]);
  });

  it('should support vec in vec', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = [
      [0, 1, 2],
      [0, 1, 2],
    ];
    await contractInstance.functions.vec_in_vec(INPUT).txParams({ gasPrice }).call();

    // asserted in Sway file
    expect(1).toEqual(1);
  });

  it('should support array in vec', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT = [
      [0, 1, 2],
      [0, 1, 2],
    ];
    await contractInstance.functions.vec_in_array(INPUT).txParams({ gasPrice }).call();

    // asserted in Sway file
    expect(1).toEqual(1);
  });

  it('should test b256 multiple params vector input/output', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_A = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];
    const INPUT_B = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];
    const INPUT_C = hexlify(randomBytes(32));
    const INPUT_D = hexlify(randomBytes(32));

    const { value } = await contractInstance.functions
      .echo_b256_middle(INPUT_A, INPUT_B, INPUT_C, INPUT_D)
      .txParams({ gasPrice })
      .call<string[]>();

    expect(value).toStrictEqual(INPUT_B);
  });

  it.skip('should handle multiple calls [with vectors]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_A = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];
    const INPUT_B = [hexlify(randomBytes(32))];
    const INPUT_C = hexlify(randomBytes(32));
    const INPUT_D = hexlify(randomBytes(32));

    const { value: results } = await contractInstance
      .multiCall([
        contractInstance.functions.echo_b256_middle(INPUT_A, INPUT_B, INPUT_C, INPUT_D),
        contractInstance.functions.echo_u8(13),
        contractInstance.functions.echo_u8(23),
        contractInstance.functions.echo_enum_small(SmallEnum.Empty),
        contractInstance.functions.echo_b256_middle(INPUT_B, INPUT_A, INPUT_C, INPUT_D),
      ])
      .txParams({ gasPrice })
      .call();
    expect(results).toStrictEqual([INPUT_B, 13, 23, SmallEnum.Empty, INPUT_A]);
  });

  it.skip('should handle multiple calls [with vectors + stack data first]', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [coverageContractDir],
    });
    const {
      contracts: [contractInstance],
    } = launched;
    const { minGasPrice: gasPrice } = contractInstance.provider.getGasConfig();

    const INPUT_A = [hexlify(randomBytes(32)), hexlify(randomBytes(32)), hexlify(randomBytes(32))];
    const INPUT_B = [hexlify(randomBytes(32))];
    const INPUT_C = hexlify(randomBytes(32));
    const INPUT_D = hexlify(randomBytes(32));

    const { value: results } = await contractInstance
      .multiCall([
        contractInstance.functions.echo_u8(1),
        contractInstance.functions.echo_u8(2),
        contractInstance.functions.echo_enum_small(SmallEnum.Empty),
        contractInstance.functions.echo_b256_middle(INPUT_A, INPUT_B, INPUT_C, INPUT_D),
        contractInstance.functions.echo_b256_middle(INPUT_B, INPUT_A, INPUT_C, INPUT_D),
      ])
      .txParams({ gasPrice })
      .call();
    expect(results).toStrictEqual([1, 2, SmallEnum.Empty, INPUT_B, INPUT_A]);
  });
});
