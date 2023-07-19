import { arrayify, hexlify } from '@ethersproject/bytes';
import type { InputCoin } from 'fuels';
import { bn, Provider, ScriptTransactionRequest, Account, Address, Predicate } from 'fuels';

import { defaultPredicateAbi } from '../../fixtures/abi/predicate';
import { defaultPredicateBytecode } from '../../fixtures/bytecode/predicate';

import { getContractRoot } from './utils/predicate';

describe('Predicate', () => {
  describe('Transactions', () => {
    it('includes predicate as input when sending a transaction', async () => {
      const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';
      const sendTransactionMock = jest
        .spyOn(Account.prototype, 'sendTransaction')
        .mockImplementation();
      const provider = new Provider('http://127.0.0.1:4000/graphql');
      const chainId = await provider.getChainId();
      const predicate = new Predicate(defaultPredicateBytecode, chainId, defaultPredicateAbi);
      const predicateAddress = getContractRoot(arrayify(defaultPredicateBytecode), 0);

      predicate.setData<[string]>(b256);

      const request = new ScriptTransactionRequest();

      request.addResourceInputAndOutput({
        id: '0x01',
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        amount: bn(1),
        owner: Address.fromB256(predicateAddress),
        maturity: 0,
        blockCreated: bn(0),
        txCreatedIdx: bn(0),
      });

      predicate.sendTransaction(request);

      const inputCoinMock = sendTransactionMock.mock.calls[0][0]
        .inputs?.[0] as unknown as InputCoin;
      expect(hexlify(inputCoinMock.predicate)).toBe(defaultPredicateBytecode);
      expect(hexlify(inputCoinMock.predicateData)).toBe(b256);
    });

    it('includes predicate as input when simulating a transaction', async () => {
      const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';
      const sendTransactionMock = jest
        .spyOn(Account.prototype, 'simulateTransaction')
        .mockImplementation();
      const provider = new Provider('http://127.0.0.1:4000/graphql');
      const chainId = await provider.getChainId();
      const predicate = new Predicate(defaultPredicateBytecode, chainId, defaultPredicateAbi);
      const predicateAddress = getContractRoot(arrayify(defaultPredicateBytecode), 0);

      predicate.setData<[string]>(b256);

      const request = new ScriptTransactionRequest();

      request.addResourceInputAndOutput({
        id: '0x01',
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        amount: bn(1),
        owner: Address.fromB256(predicateAddress),
        maturity: 0,
        blockCreated: bn(0),
        txCreatedIdx: bn(0),
      });

      predicate.simulateTransaction(request);

      const inputCoinMock = sendTransactionMock.mock.calls[0][0]
        .inputs?.[0] as unknown as InputCoin;
      expect(hexlify(inputCoinMock.predicate)).toBe(defaultPredicateBytecode);
      expect(hexlify(inputCoinMock.predicateData)).toBe(b256);
    });
  });
});
