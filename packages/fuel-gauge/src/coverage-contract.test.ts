import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BN, Message, Contract } from 'fuels';
import {
  zeroPad,
  arrayify,
  NativeAssetId,
  bn,
  toHex,
  Provider,
  ScriptTransactionRequest,
  Wallet,
} from 'fuels';

import { getSetupContract } from './utils';

const RUST_U8_MAX = 255;
const RUST_U16_MAX = 65535;
const RUST_U32_MAX = 4294967295;
const B256 = '0x000000000000000000000000000000000000000000000000000000000000002a';

const setupContract = getSetupContract('coverage-contract');

let contractInstance: Contract;

beforeAll(async () => {
  contractInstance = await setupContract();
});

describe('Coverage Contract', () => {
  it('can return outputs', async () => {
    // Call contract methods
    expect((await contractInstance.functions.get_id().call()).value).toEqual(
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    expect((await contractInstance.functions.get_small_string().call()).value).toEqual('gggggggg');
    expect((await contractInstance.functions.get_large_string().call()).value).toEqual('ggggggggg');
    expect((await contractInstance.functions.get_u32_struct().call()).value).toStrictEqual({
      foo: 100,
    });
    expect((await contractInstance.functions.get_large_struct().call()).value).toStrictEqual({
      foo: 12,
      bar: 42,
    });
    expect((await contractInstance.functions.get_large_array().call()).value).toStrictEqual([1, 2]);
    expect((await contractInstance.functions.get_empty_enum().call()).value).toStrictEqual({
      Empty: [],
    });
    expect((await contractInstance.functions.get_contract_id().call()).value).toStrictEqual({
      value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    });
    expect((await contractInstance.functions.get_some_option_u8().call()).value).toEqual(113);
    expect((await contractInstance.functions.get_none_option_u8().call()).value).toEqual(undefined);
  });

  it('should test u8 variable type', async () => {
    // #region typedoc:U8
    const { value } = await contractInstance.functions.echo_u8(3).call();
    expect(value).toBe(3);
    // #endregion
  });

  it('should test u8 variable type multiple params', async () => {
    const { value } = await contractInstance.functions.echo_u8_addition(3, 4, 3).call();
    expect(value).toBe(10);
  });

  it('should test u16 variable type', async () => {
    const { value } = await contractInstance.functions.echo_u16(RUST_U8_MAX + 1).call();
    expect(value).toBe(RUST_U8_MAX + 1);
  });

  it('should test u32 variable type', async () => {
    const { value } = await contractInstance.functions.echo_u32(RUST_U16_MAX + 1).call();
    expect(value).toBe(RUST_U16_MAX + 1);
  });

  it('should test u64 variable type', async () => {
    const INPUT = bn(RUST_U32_MAX).add(1).toHex();
    const { value } = await contractInstance.functions.echo_u64(INPUT).call();
    expect(value.toHex()).toBe(INPUT);
  });

  it('should test bool variable type', async () => {
    const { value } = await contractInstance.functions.echo_bool(false).call();
    expect(value).toBe(false);
  });

  it('should test b256 variable type', async () => {
    const { value } = await contractInstance.functions.echo_b256(B256).call();
    expect(value).toBe(B256);
  });

  it('should test str[1] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_1('f').call();
    expect(value).toBe('f');
  });

  it('should test str[2] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_2('fu').call();
    expect(value).toBe('fu');
  });

  it('should test str[3] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_3('fue').call();
    expect(value).toBe('fue');
  });

  it('should test str[8] variable type', async () => {
    // #region typedoc:String-size8
    const { value } = await contractInstance.functions.echo_str_8('fuel-sdk').call();

    expect(value).toBe('fuel-sdk');
    // #endregion
  });

  it('should test str[9] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_9('fuel-sdks').call();
    expect(value).toBe('fuel-sdks');
  });

  it('should test tuple < 8 bytes variable type', async () => {
    const { value } = await contractInstance.functions.echo_tuple_u8([21, 22]).call();
    expect(value).toStrictEqual([21, 22]);
  });

  it('should test tuple > 8 bytes variable type', async () => {
    const INPUT = [bn(RUST_U32_MAX).add(1), bn(RUST_U32_MAX).add(2)];
    const { value } = await contractInstance.functions.echo_tuple_u64(INPUT).call();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(INPUT));
  });

  it('should test tuple mixed variable type', async () => {
    const INPUT = [true, bn(RUST_U32_MAX).add(1)];
    const { value } = await contractInstance.functions.echo_tuple_mixed(INPUT).call();
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(INPUT));
  });

  it('should test array < 8 bytes variable type', async () => {
    const { value } = await contractInstance.functions.echo_array_u8([4, 3]).call();
    expect(value).toStrictEqual([4, 3]);
  });

  it('should test array > 8 bytes variable type', async () => {
    const INPUT: [number, string, BN, string, string] = [
      11,
      toHex(RUST_U32_MAX + 2),
      bn(RUST_U32_MAX).add(3),
      toHex(bn('9009', 10)),
      '0x1fffffffffffff',
    ];
    const { value } = await contractInstance.functions.echo_array_u64(INPUT).call();

    const OUTPUT = INPUT.map((v) => toHex(v));
    expect(JSON.stringify(value)).toStrictEqual(JSON.stringify(OUTPUT));
  });

  it('should test array bool variable type', async () => {
    const { value } = await contractInstance.functions.echo_array_bool([true, true]).call();
    expect(value).toStrictEqual([true, true]);
  });

  it('should test struct < 8 bytes variable type', async () => {
    const INPUT = { i: 4 };
    const { value } = await contractInstance.functions.echo_struct_u8(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test struct > 8 bytes variable type', async () => {
    const INPUT = { i: B256 };
    const { value } = await contractInstance.functions.echo_struct_b256(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test enum < 8 byte variable type', async () => {
    // #region typedoc:Enum-small
    const INPUT = { Empty: [] };
    // #endregion
    const { value } = await contractInstance.functions.echo_enum_small(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test enum > 8 bytes variable type', async () => {
    // #region typedoc:Enum-big
    const INPUT = { AddressB: B256 };
    // #endregion
    const { value } = await contractInstance.functions.echo_enum_big(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test Option<u8> type', async () => {
    const INPUT = 187;
    const { value } = await contractInstance.functions.echo_option_u8(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test Option<u32> extraction [Some]', async () => {
    const INPUT_SOME = 123;
    const { value: Some } = await contractInstance.functions
      .echo_option_extract_u32(INPUT_SOME)
      .call();
    expect(Some).toStrictEqual(INPUT_SOME);
  });

  it('should test Option<u32> extraction [None]', async () => {
    const INPUT_NONE = undefined;
    const { value: None } = await contractInstance.functions
      .echo_option_extract_u32(INPUT_NONE)
      .call();
    expect(None).toStrictEqual(500);

    const { value: NoneVoid } = await contractInstance.functions.echo_option_extract_u32().call();
    expect(NoneVoid).toStrictEqual(500);
  });

  it('should test multiple Option<u32> params [Some]', async () => {
    // #region typedoc:Option-Some
    const INPUT_A = 1;
    const INPUT_B = 4;
    const INPUT_C = 5;

    // adds the three values (if Some value given) together
    const { value: Some } = await contractInstance.functions
      .echo_option_three_u8(INPUT_A, INPUT_B, INPUT_C)
      .call();

    // we receive the result of adding whatever was passed
    expect(Some).toStrictEqual(10);
    // #endregion
  });

  it('should test multiple Option<u32> params [None]', async () => {
    // #region typedoc:Option-None
    const INPUT = 1;

    // adds the three values together, but only first param value is supplied
    const { value: Some } = await contractInstance.functions.echo_option_three_u8(INPUT).call();

    // we receive the result of adding whatever was passed
    expect(Some).toStrictEqual(1);
    // #endregion
  });

  it('should test u8 empty vector input', async () => {
    const { value } = await contractInstance.functions.check_u8_vector([]).call();
    expect(value).toBeFalsy();
  });

  it('should test u8 vector input', async () => {
    const { value, logs } = await contractInstance.functions
      .check_u8_vector([1, 2, 3, 4, 5])
      .call();

    expect(value).toBeTruthy();

    const formattedLog = logs.map((l) => (typeof l === 'string' ? l : l.toNumber()));

    expect(formattedLog).toEqual([
      'vector.buf.ptr',
      14464,
      'vector.buf.cap',
      5,
      'vector.len',
      5,
      'addr_of vector',
      14440,
    ]);
  });

  it('should echo u8 vector input', async () => {
    const { value } = await contractInstance.functions
      .echo_u8_vector_first([23, 6, 1, 51, 2])
      .call();

    expect(value).toBe(23);
  });

  it('should echo a vector of optional u8 input', async () => {
    const { value } = await contractInstance.functions.echo_u8_option_vector_first([28]).call();

    expect(value).toBe(28);
  });

  it('should echo u64 vector input', async () => {
    const INPUT = bn(54).toHex();
    const { value } = await contractInstance.functions
      .echo_u64_vector_last([200, 100, 24, 51, 23, INPUT])
      .call();
    expect(value.toHex()).toBe(INPUT);
  });

  it('should echo u32 vector addition of mixed params', async () => {
    const { value } = await contractInstance.functions
      .echo_u32_vector_addition_other_type([100, 2], 47)
      .call();
    expect(value).toBe(147);
  });

  it('should echo u32 vector addition', async () => {
    const { value } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2], [24, 54])
      .call();
    expect(value).toBe(124);
  });

  it('should echo u32 vector addition [variable lengths]', async () => {
    const { value } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2, 1, 2, 3], [24, 54])
      .call();
    expect(value).toBe(124);
  });

  it('should echo struct vector input', async () => {
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
      .call();
    expect(value).toStrictEqual(first);
  });

  it('should echo complex struct vector input', async () => {
    const last = {
      foo: 3,
      bar: bn(31337).toHex(),
      baz: 'abcdefghi',
    };
    const { value } = await contractInstance.functions
      .echo_struct_vector_last(
        // #region typedoc:Vector-Struct
        [
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
        ]
        // #endregion
      )
      .call();
    const unhexed = {
      foo: value.foo,
      bar: bn(value.bar).toHex(),
      baz: value.baz,
    };
    expect(unhexed).toStrictEqual(last);
  });

  it('should get initial state messages from node', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // #region typedoc:Message-getMessages
    const WALLET_A = Wallet.fromPrivateKey(
      '0x1ff16505df75735a5bcf4cb4cf839903120c181dd9be6781b82cda23543bd242',
      provider
    );
    const WALLET_B = Wallet.fromPrivateKey(
      '0x30bb0bc68f5d2ec3b523cee5a65503031b40679d9c72280cd8088c2cfbc34e38',
      provider
    );

    const EXPECTED_MESSAGES_A: Message[] = [
      {
        sender: WALLET_B.address,
        recipient: WALLET_A.address,
        nonce: bn(1),
        amount: bn(1),
        data: arrayify(
          '0x00000000000000080000000000000007000000000000000600000000000000050000000000000004'
        ),
        daHeight: bn(0),
        fuelBlockSpend: bn(0),
      },
    ];
    const EXPECTED_MESSAGES_B: Message[] = [
      {
        sender: WALLET_A.address,
        recipient: WALLET_B.address,
        nonce: bn('1017517292834129547'),
        amount: bn('12704439083013451934'),
        data: arrayify('0x0000000000000007'),
        daHeight: bn('3684546456337077810'),
        fuelBlockSpend: bn(0),
      },
    ];

    const aMessages = await WALLET_A.getMessages();
    const bMessages = await WALLET_B.getMessages();

    expect(aMessages).toStrictEqual(EXPECTED_MESSAGES_A);
    expect(bMessages).toStrictEqual(EXPECTED_MESSAGES_B);
    // #endregion
  });

  it('should test sending input messages [1]', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const request = new ScriptTransactionRequest({ gasLimit: 1000000 });

    const sender = await generateTestWallet(provider, [[1_000, NativeAssetId]]);
    const receiver = await generateTestWallet(provider);

    const message: Message = {
      sender: sender.address,
      recipient: receiver.address,
      nonce: bn(823),
      amount: bn(900),
      data: zeroPad([12, 13, 14], 8),
      daHeight: bn(0),
      fuelBlockSpend: bn(0),
    };
    request.addMessages([message]);
    const response = await sender.sendTransaction(request);
    await response.waitForResult();
    const receiverMessages = await receiver.getMessages();

    expect(receiverMessages[0].amount).toEqual(message.amount);
    expect(receiverMessages[0].sender).toEqual(message.sender);
    expect(receiverMessages[0].recipient).toEqual(message.recipient);
    expect(receiverMessages[0].nonce).toEqual(message.nonce);
    expect(receiverMessages[0].data).toEqual(message.data);
  });

  it('should test sending input messages [3]', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const request = new ScriptTransactionRequest({ gasLimit: 1000000 });

    const sender = await generateTestWallet(provider, [[1_000, NativeAssetId]]);
    const receiver = await generateTestWallet(provider);

    const messages: Message[] = [
      {
        sender: sender.address,
        recipient: receiver.address,
        nonce: bn(100),
        amount: bn(111),
        data: zeroPad([11, 11, 11], 8),
        daHeight: bn(0),
        fuelBlockSpend: bn(0),
      },
      {
        sender: sender.address,
        recipient: receiver.address,
        nonce: bn(200),
        amount: bn(222),
        data: zeroPad([22, 22, 22], 8),
        daHeight: bn(0),
        fuelBlockSpend: bn(0),
      },
      {
        sender: sender.address,
        recipient: receiver.address,
        nonce: bn(300),
        amount: bn(333),
        data: zeroPad([33, 33, 33], 8),
        daHeight: bn(0),
        fuelBlockSpend: bn(0),
      },
    ];

    request.addMessages(messages);
    const response = await sender.sendTransaction(request);

    await response.wait();
    const receiverMessages = await receiver.getMessages();

    // sort by nonce, messages are not guaranteed in order
    receiverMessages.sort((a, b) => a.nonce.toNumber() - b.nonce.toNumber());

    expect(receiverMessages.length).toEqual(messages.length);
    for (let i = 0; i < receiverMessages.length; i += 1) {
      expect(receiverMessages[i].amount).toEqual(messages[i].amount);
      expect(receiverMessages[i].sender).toEqual(messages[i].sender);
      expect(receiverMessages[i].recipient).toEqual(messages[i].recipient);
      expect(receiverMessages[i].nonce).toEqual(messages[i].nonce);
      expect(receiverMessages[i].data).toEqual(messages[i].data);
    }
  });

  it('can read from produce_logs_variables', async () => {
    // #region typedoc:Log-output
    const { logs } = await contractInstance.functions.produce_logs_variables().call();

    expect(logs[0].toHex()).toEqual(bn(64).toHex());
    expect(logs[1]).toEqual('0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a');
    expect(logs[2]).toEqual('Fuel');
    expect([logs[3], logs[4], logs[5]]).toEqual([1, 2, 3]);
    // #endregion
  });
});
