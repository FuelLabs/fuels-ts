import { hexlify } from '@ethersproject/bytes';
import { Address } from '@fuel-ts/address';
import { bn } from '@fuel-ts/math';
import type { Provider } from '@fuel-ts/providers';
import { ScriptTransactionRequest } from '@fuel-ts/providers';
import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import type { InputCoin } from '@fuel-ts/transactions';
import { Account } from '@fuel-ts/wallet';

import { Predicate } from '../../src/predicate';
import { defaultPredicateAbi } from '../fixtures/abi/default';
import { defaultPredicateBytecode } from '../fixtures/bytecode/default';

describe('Predicate', () => {
  describe('Transactions', () => {
    const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';

    const setup = (provider: Provider) => {
      const predicate = new Predicate(defaultPredicateBytecode, provider, defaultPredicateAbi);
      const predicateAddress = '0x4f780df441f7a02b5c1e718fcd779776499a0d1069697db33f755c82d7bae02b';

      predicate.setData<[string]>(b256);

      const request = new ScriptTransactionRequest();
      request.addResource({
        id: '0x01',
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        amount: bn(1),
        owner: Address.fromB256(predicateAddress),
        maturity: 0,
        blockCreated: bn(0),
        txCreatedIdx: bn(0),
      });

      return { predicate, request };
    };

    it('includes predicate as input when sending a transaction', async () => {
      const sendTransactionMock = jest
        .spyOn(Account.prototype, 'sendTransaction')
        .mockImplementation();

      using provider = await setupTestProvider();
      const { predicate, request } = setup(provider);

      await predicate.sendTransaction(request);

      const inputCoinMock = sendTransactionMock.mock.calls[0][0]
        .inputs?.[0] as unknown as InputCoin;
      expect(hexlify(inputCoinMock.predicate)).toBe(defaultPredicateBytecode);
      expect(hexlify(inputCoinMock.predicateData)).toBe(b256);
    });

    it('includes predicate as input when simulating a transaction', async () => {
      const sendTransactionMock = jest
        .spyOn(Account.prototype, 'simulateTransaction')
        .mockImplementation();
      using provider = await setupTestProvider();
      const { predicate, request } = setup(provider);

      await predicate.simulateTransaction(request);

      const inputCoinMock = sendTransactionMock.mock.calls[0][0]
        .inputs?.[0] as unknown as InputCoin;
      expect(hexlify(inputCoinMock.predicate)).toBe(defaultPredicateBytecode);
      expect(hexlify(inputCoinMock.predicateData)).toBe(b256);
    });
  });
});
