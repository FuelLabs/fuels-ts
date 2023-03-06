/* eslint-disable @typescript-eslint/no-explicit-any */
import { hexlify } from '@ethersproject/bytes';
import { Address } from '@fuel-ts/address';
import { bn } from '@fuel-ts/math';
import { ScriptTransactionRequest, CoinStatus } from '@fuel-ts/providers';
import type { InputCoin } from '@fuel-ts/transactions';
import { Account } from '@fuel-ts/wallet';

import { Predicate } from './predicate';

// This data is arbitrary, make to unit test the Predicate class
const PREDICATE_BYTECODE =
  '0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8';
const PREDICATE_ADDRESS = '0x27c54187841c60ac0ebafcf1f2778d30f9973865f9a4bcd959e137aa852c4375';
const PREDICATE_ABI = {
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
};

describe('Predicate', () => {
  it('Should create the correct address for a given bytecode', () => {
    const predicate = new Predicate(PREDICATE_BYTECODE);
    expect(predicate.address.toB256()).toEqual(PREDICATE_ADDRESS);
  });

  it('Should assign only correct data to predicate', () => {
    const predicate = new Predicate(PREDICATE_BYTECODE, PREDICATE_ABI);
    const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';

    predicate.setData<[string]>(b256);

    // Assign correct data to predicate
    expect(hexlify(predicate.predicateData)).toEqual(b256);
    // Try to assign incorrect data should fail predicate
    expect(async () => {
      predicate.setData<[string]>('0x01');
    }).rejects.toThrow(/Invalid b256/i);
  });

  it('Should include predicate on input when sendTransaction', () => {
    const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const sendTransactionMock = jest
      .spyOn(Account.prototype, 'sendTransaction')
      .mockImplementation();
    const predicate = new Predicate(PREDICATE_BYTECODE, PREDICATE_ABI);

    predicate.setData<[string]>(b256);

    const request = new ScriptTransactionRequest();

    request.addResource({
      id: '0x01',
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      amount: bn(1),
      owner: Address.fromB256(PREDICATE_ADDRESS),
      status: CoinStatus.Unspent,
      maturity: 0,
      blockCreated: bn(0),
    });

    predicate.sendTransaction(request);

    const inputCoinMock = sendTransactionMock.mock.calls[0][0].inputs?.[0] as any as InputCoin;
    expect(hexlify(inputCoinMock.predicate)).toBe(PREDICATE_BYTECODE);
    expect(hexlify(inputCoinMock.predicateData)).toBe(b256);
  });

  it('Should include predicate on input when simulateTransaction', () => {
    const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';
    const simulateTransactionMock = jest
      .spyOn(Account.prototype, 'simulateTransaction')
      .mockImplementation();
    const predicate = new Predicate(PREDICATE_BYTECODE, PREDICATE_ABI);

    predicate.setData<[string]>(b256);

    const request = new ScriptTransactionRequest();

    request.addResource({
      id: '0x01',
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      amount: bn(1),
      owner: Address.fromB256(PREDICATE_ADDRESS),
      status: CoinStatus.Unspent,
      maturity: 0,
      blockCreated: bn(0),
    });

    predicate.simulateTransaction(request);

    const inputCoinMock = simulateTransactionMock.mock.calls[0][0].inputs?.[0] as any as InputCoin;
    expect(hexlify(inputCoinMock.predicate)).toBe(PREDICATE_BYTECODE);
    expect(hexlify(inputCoinMock.predicateData)).toBe(b256);
  });
});
