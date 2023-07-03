import { arrayify, hexlify } from '@ethersproject/bytes';
import { Provider } from '@fuel-ts/providers';

import { Predicate } from '../../src/predicate';
import { getContractRoot } from '../../src/utils';
import { defaultPredicateAbi } from '../fixtures/abi/default';
import { defaultPredicateBytecode } from '../fixtures/bytecode/default';

describe('Predicate', () => {
  describe('Functions', () => {
    let chainId: number;

    const predicateAddress = getContractRoot(arrayify(defaultPredicateBytecode), 0);

    beforeEach(async () => {
      const provider = new Provider('http://127.0.0.1:4000/graphql');
      chainId = await provider.getChainId();
    });

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

    it('throws when predicate data does not match type', () => {
      const predicate = new Predicate(defaultPredicateBytecode, chainId, defaultPredicateAbi);
      const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';

      predicate.setData<[string]>(b256);

      expect(() => {
        predicate.setData<[string]>('0x01');
      }).toThrow(/Invalid b256/);
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
