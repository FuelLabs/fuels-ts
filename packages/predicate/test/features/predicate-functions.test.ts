import { Provider } from '@fuel-ts/providers';
import { FUEL_NETWORK_URL } from '@fuel-ts/wallet/configs';

import { Predicate } from '../../src/predicate';
import { defaultPredicateAbi } from '../fixtures/abi/default';
import { defaultPredicateBytecode } from '../fixtures/bytecode/default';

describe('Predicate', () => {
  describe('Functions', () => {
    const predicateAddress = '0x6b6ef590390f0a7de75f8275ab5d7877c17236caba2514039c6565ec15f79111';
    let provider: Provider;

    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
    });

    it('sets predicate address for given byte code', () => {
      const predicate = new Predicate(defaultPredicateBytecode, provider);
      expect(predicate.address.toB256()).toEqual(predicateAddress);
    });

    it('sets predicate data for given ABI', () => {
      const predicate = new Predicate(defaultPredicateBytecode, provider, defaultPredicateAbi);
      const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';

      expect(predicate.predicateArgs).toEqual([]);

      predicate.setData<[string]>(b256);

      expect(predicate.predicateArgs).not.toBeUndefined();
    });

    it('throws when predicate ABI has no main function', () => {
      const abiWithNoMain = {
        ...defaultPredicateAbi,
        functions: [
          {
            ...defaultPredicateAbi.functions[0],
            name: 'notMain',
          },
        ],
      };

      expect(() => {
        const predicate = new Predicate(defaultPredicateBytecode, provider, abiWithNoMain, {
          value: 1,
        });

        predicate.setData('NADA');
      }).toThrow('Cannot use ABI without "main" function');
    });
  });
});
