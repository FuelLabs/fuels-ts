import { hexlify } from '@ethersproject/bytes';

import { Predicate } from '../../src/predicate';
import { defaultPredicateAbi } from '../fixtures/abi/default';
import { defaultPredicateBytecode } from '../fixtures/bytecode/default';

describe('Predicate', () => {
  describe('Functions', () => {
    const chainId = 0;
    const predicateAddress = '0x4f780df441f7a02b5c1e718fcd779776499a0d1069697db33f755c82d7bae02b';

    it('sets predicate address for given byte code', () => {
      const predicate = new Predicate(defaultPredicateBytecode, chainId);
      expect(predicate.address.toB256()).toEqual(predicateAddress);
    });

    it('sets predicate data for given ABI', () => {
      const predicate = new Predicate(defaultPredicateBytecode, chainId, defaultPredicateAbi);
      const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';

      predicate.setData<[string]>(b256);

      expect(hexlify(predicate.predicateData)).toEqual(b256);
    });

    it('throws when setting predicate data without ABI', () => {
      const predicate = new Predicate(defaultPredicateBytecode, chainId);

      expect(() => {
        predicate.setData<[string]>('0x01');
      }).toThrow('Types/values length mismatch during encode');
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
        const predicate = new Predicate(
          defaultPredicateBytecode,
          chainId,
          abiWithNoMain,
          undefined,
          {
            value: 1,
          }
        );

        predicate.setData('NADA');
      }).toThrow('Cannot use ABI without "main" function');
    });
  });
});
