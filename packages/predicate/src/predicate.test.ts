import { arrayify, hexlify } from '@ethersproject/bytes';
import type { JsonFlatAbi } from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { bn } from '@fuel-ts/math';
import { Provider, ScriptTransactionRequest } from '@fuel-ts/providers';
import type { InputCoin } from '@fuel-ts/transactions';
import { Account } from '@fuel-ts/wallet';

import { Predicate } from './predicate';
import { getContractRoot } from './utils';

// This data is arbitrary, make to unit test the Predicate class
const PREDICATE_BYTECODE =
  '0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8';
const PREDICATE_ADDRESS = getContractRoot(arrayify(PREDICATE_BYTECODE), 0);
const PREDICATE_ABI: JsonFlatAbi = {
  types: [
    {
      typeId: 0,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'b256',
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'data',
          type: 1,
          typeArguments: null,
        },
      ],
      name: 'main',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
    },
  ],
  loggedTypes: [],
  configurables: [],
};

describe('Predicate', () => {
  it('Should create the correct address for a given bytecode', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const chainId = await provider.getChainId();
    const predicate = new Predicate(PREDICATE_BYTECODE, chainId);
    expect(predicate.address.toB256()).toEqual(PREDICATE_ADDRESS);
  });

  it('Should assign only correct data to predicate', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const chainId = await provider.getChainId();
    const predicate = new Predicate(PREDICATE_BYTECODE, chainId, PREDICATE_ABI);
    const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';

    predicate.setData<[string]>(b256);

    // Assign correct data to predicate
    expect(hexlify(predicate.predicateData)).toEqual(b256);

    let error;
    try {
      // Try to assign incorrect data should fail predicate
      predicate.setData<[string]>('0x01');
    } catch (e) {
      error = e;
    }

    expect((<Error>error).message).toMatch(/Invalid b256/i);
  });

  it('Should include predicate on input when sendTransaction', async () => {
    const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const sendTransactionMock = jest
      .spyOn(Account.prototype, 'sendTransaction')
      .mockImplementation();
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const chainId = await provider.getChainId();
    const predicate = new Predicate(PREDICATE_BYTECODE, chainId, PREDICATE_ABI);

    predicate.setData<[string]>(b256);

    const request = new ScriptTransactionRequest();

    request.addResourceInputAndOutput({
      id: '0x01',
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      amount: bn(1),
      owner: Address.fromB256(PREDICATE_ADDRESS),
      maturity: 0,
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    });

    predicate.sendTransaction(request);

    const inputCoinMock = sendTransactionMock.mock.calls[0][0].inputs?.[0] as unknown as InputCoin;
    expect(hexlify(inputCoinMock.predicate)).toBe(PREDICATE_BYTECODE);
    expect(hexlify(inputCoinMock.predicateData)).toBe(b256);
  });

  it('Should include predicate on input when simulateTransaction', async () => {
    const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const simulateTransactionMock = jest
      .spyOn(Account.prototype, 'simulateTransaction')
      .mockImplementation();
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const chainId = await provider.getChainId();
    const predicate = new Predicate(PREDICATE_BYTECODE, chainId, PREDICATE_ABI);

    predicate.setData<[string]>(b256);

    const request = new ScriptTransactionRequest().addResourceInputAndOutput({
      id: '0x01',
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      amount: bn(1),
      owner: Address.fromB256(PREDICATE_ADDRESS),
      maturity: 0,
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    });

    predicate.simulateTransaction(request);

    const inputCoinMock = simulateTransactionMock.mock.calls[0][0]
      .inputs?.[0] as unknown as InputCoin;
    expect(hexlify(inputCoinMock.predicate)).toBe(PREDICATE_BYTECODE);
    expect(hexlify(inputCoinMock.predicateData)).toBe(b256);
  });

  it('should throw when setting configurable with wrong name', async () => {
    let error;
    let predicate;

    const abiWithConfigurable = {
      ...PREDICATE_ABI,
      configurables: [
        {
          name: 'BOOL',
          configurableType: {
            name: '',
            type: 1,
            typeArguments: null,
          },
          offset: 120,
        },
      ],
    };

    try {
      const provider = new Provider('http://127.0.0.1:4000/graphql');
      const chainId = await provider.getChainId();
      predicate = new Predicate(PREDICATE_BYTECODE, chainId, abiWithConfigurable, undefined, {
        NOT_BOOL: 1,
      });
    } catch (e: unknown) {
      error = e;
    }

    expect((<Error>error).message).toMatch('Predicate has no configurable constant named:');
    expect(predicate).toBeUndefined();
  });

  it('should throw when setting configurable but JSON abi was not given', async () => {
    let error;
    let predicate;

    try {
      const provider = new Provider('http://127.0.0.1:4000/graphql');
      const chainId = await provider.getChainId();
      predicate = new Predicate(PREDICATE_BYTECODE, chainId, undefined, undefined, { value: 1 });
    } catch (e) {
      error = e;
    }

    expect((<Error>error).message).toMatch('Unable to validate configurable constants');
    expect(predicate).toBeUndefined();
  });

  it('should throw when setting configurable but Predicate has none', async () => {
    let error;
    let predicate;

    try {
      const provider = new Provider('http://127.0.0.1:4000/graphql');
      const chainId = await provider.getChainId();
      predicate = new Predicate(PREDICATE_BYTECODE, chainId, PREDICATE_ABI, undefined, {
        value: 1,
      });
    } catch (e) {
      error = e;
    }

    expect((<Error>error).message).toMatch('Predicate has no configurable constants to be set');
    expect(predicate).toBeUndefined();
  });

  it('should throw when Predicate abi has no main function', async () => {
    let error;
    let predicate;

    const abiWithNoMain = {
      ...PREDICATE_ABI,
      functions: [
        {
          ...PREDICATE_ABI.functions[0],
          name: 'notMain',
        },
      ],
    };

    try {
      const provider = new Provider('http://127.0.0.1:4000/graphql');
      const chainId = await provider.getChainId();
      predicate = new Predicate(PREDICATE_BYTECODE, chainId, abiWithNoMain, undefined, {
        value: 1,
      });
    } catch (e) {
      error = e;
    }

    expect((<Error>error).message).toMatch('Cannot use ABI without "main" function');
    expect(predicate).toBeUndefined();
  });
});
