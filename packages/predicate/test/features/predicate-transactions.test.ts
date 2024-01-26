import { Address } from '@fuel-ts/address';
import { bn } from '@fuel-ts/math';
import { Provider, ScriptTransactionRequest } from '@fuel-ts/providers';
import type { InputCoin } from '@fuel-ts/transactions';
import { Account } from '@fuel-ts/wallet';
import { FUEL_NETWORK_URL } from '@fuel-ts/wallet/configs';
import { hexlify } from 'ethers';

import { Predicate } from '../../src/predicate';
import { defaultPredicateAbi } from '../fixtures/abi/default';
import { defaultPredicateBytecode } from '../fixtures/bytecode/default';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  describe('Transactions', () => {
    let predicate: Predicate<[string]>;
    let provider: Provider;
    let request: ScriptTransactionRequest;
    const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';

    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
      predicate = new Predicate(defaultPredicateBytecode, provider, defaultPredicateAbi);

      predicate.setData<[string]>(b256);

      request = new ScriptTransactionRequest();
      request.addResource({
        id: '0x01',
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        amount: bn(1),
        owner: Address.fromAddressOrString(predicate.address),
        maturity: 0,
        blockCreated: bn(0),
        txCreatedIdx: bn(0),
      });
    });

    it('includes predicate as input when sending a transaction', async () => {
      const sendTransactionMock = vi
        .spyOn(Account.prototype, 'sendTransaction')
        .mockImplementation(() => []);

      await predicate.sendTransaction(request);

      const inputCoinMock = sendTransactionMock.mock.calls[0][0]
        .inputs?.[0] as unknown as InputCoin;
      expect(hexlify(inputCoinMock.predicate)).toBe(defaultPredicateBytecode);
      expect(predicate.predicateArgs).not.toBeUndefined();
    });

    it('includes predicate as input when simulating a transaction', async () => {
      const sendTransactionMock = vi
        .spyOn(Account.prototype, 'simulateTransaction')
        .mockImplementation(() => []);

      await predicate.simulateTransaction(request);

      const inputCoinMock = sendTransactionMock.mock.calls[0][0]
        .inputs?.[0] as unknown as InputCoin;
      expect(hexlify(inputCoinMock.predicate)).toBe(defaultPredicateBytecode);
      expect(predicate.predicateArgs).not.toBeUndefined();
    });
  });
});
