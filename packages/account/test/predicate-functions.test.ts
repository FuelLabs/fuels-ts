import { Predicate } from '../src/predicate';
import { setupTestProviderAndWallets } from '../src/test-utils';

import { predicateAbi } from './fixtures/predicate-abi';
import { predicateBytecode } from './fixtures/predicate-bytecode';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  describe('Functions', () => {
    const predicateAddress = '0x6b6ef590390f0a7de75f8275ab5d7877c17236caba2514039c6565ec15f79111';

    it('sets predicate address for given byte code', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const predicate = new Predicate({
        bytecode: predicateBytecode,
        abi: predicateAbi,
        provider,
      });
      expect(predicate.address.toB256()).toEqual(predicateAddress);
    });

    it('sets predicate data for given ABI', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const b256 = '0x0101010101010101010101010101010101010101010101010101010101010101';
      const predicate = new Predicate({
        bytecode: predicateBytecode,
        abi: predicateAbi,
        provider,
        data: [b256],
      });

      expect(predicate.predicateData).not.toBeUndefined();
    });

    it('throws when predicate ABI has no main function', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const abiWithNoMain = {
        ...predicateAbi,
        functions: [
          {
            ...predicateAbi.functions[0],
            name: 'notMain',
          },
        ],
      };

      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const predicate = new Predicate({
          bytecode: predicateBytecode,
          abi: abiWithNoMain,
          provider,
          data: ['NADA'],
          configurableConstants: { value: 1 },
        });
      }).toThrow('Cannot use ABI without "main" function');
    });

    it('creates a new instance with updated parameters', async () => {
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;

      const predicate = new Predicate({
        bytecode: predicateBytecode,
        abi: predicateAbi,
        provider,
        configurableConstants: { value: false },
      });

      const newPredicate = predicate.toNewInstance({
        configurableConstants: { value: true },
        data: ['NADA'],
      });

      expect(newPredicate.predicateData).toEqual(['NADA']);
      expect(newPredicate.bytes.slice(1)).toEqual(predicate.bytes.slice(1));
      expect(newPredicate.bytes[0]).not.toEqual(predicate.bytes[0]);
      expect(newPredicate.interface?.jsonAbi).toEqual(predicate.interface?.jsonAbi);
      expect(newPredicate.provider).toEqual(predicate.provider);
    });
  });
});
