import { hexlify } from '@ethersproject/bytes';
import { setupTestProvider } from '@fuel-ts/wallet/test-utils';

import { Predicate } from '../../src/predicate';
import { defaultPredicateAbi } from '../fixtures/abi/default';
import { defaultPredicateBytecode } from '../fixtures/bytecode/default';

describe('Predicate', () => {
  describe('Functions', () => {
    const predicateAddress = '0x4f780df441f7a02b5c1e718fcd779776499a0d1069697db33f755c82d7bae02b';

    it('sets predicate address for given byte code', async () => {
      using provider = await setupTestProvider();
      const predicate = new Predicate(defaultPredicateBytecode, provider);
      expect(predicate.address.toB256()).toEqual(predicateAddress);
    });

    it('sets predicate data for given ABI', async () => {
      using provider = await setupTestProvider();
      const predicate = new Predicate(defaultPredicateBytecode, provider, defaultPredicateAbi);
      const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';

      predicate.setData<[string]>(b256);

      expect(hexlify(predicate.predicateData)).toEqual(b256);
    });

    it('throws when predicate ABI has no main function', async () => {
      using provider = await setupTestProvider();
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
