import type { WalletLocked, WalletUnlocked, JsonAbi, BigNumberish, Provider } from 'fuels';
import { toHex, toNumber, Predicate } from 'fuels';

import predicateBytesAddress from '../../fixtures/forc-projects/predicate-address';
import predicateBytesMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct';
import predicateAbiMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import predicateBytesMainArgsVector from '../../fixtures/forc-projects/predicate-main-args-vector';
import predicateAbiMainArgsVector from '../../fixtures/forc-projects/predicate-main-args-vector/out/debug/predicate-main-args-vector-abi.json';
import predicateBytesMulti from '../../fixtures/forc-projects/predicate-multi-args';
import predicateAbiMulti from '../../fixtures/forc-projects/predicate-multi-args/out/debug/predicate-multi-args-abi.json';
import predicateBytesStruct from '../../fixtures/forc-projects/predicate-struct';
import predicateBytesU32 from '../../fixtures/forc-projects/predicate-u32';
import type { Validation } from '../types/predicate';

import { setupWallets, assertBalances, fundPredicate } from './utils/predicate';

describe('Predicate', () => {
  describe('Arguments', () => {
    let wallet: WalletUnlocked;
    let receiver: WalletLocked;
    let chainId: number;
    let provider: Provider;

    const AddressAbiInputs: JsonAbi = {
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
          components: null,
          typeParameters: null,
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
          attributes: null,
        },
      ],
      loggedTypes: [],
      configurables: [],
    };

    const U32AbiInputs: JsonAbi = {
      types: [
        {
          typeId: 0,
          type: 'bool',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 1,
          type: 'u32',
          components: null,
          typeParameters: null,
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
          attributes: null,
        },
      ],
      loggedTypes: [],
      configurables: [],
    };

    const StructAbiInputs: JsonAbi = {
      types: [
        {
          typeId: 0,
          type: 'bool',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 1,
          type: 'struct Validation',
          components: [
            {
              name: 'has_account',
              type: 0,
              typeArguments: null,
            },
            {
              name: 'total_complete',
              type: 2,
              typeArguments: null,
            },
          ],
          typeParameters: null,
        },
        {
          typeId: 2,
          type: 'u64',
          components: null,
          typeParameters: null,
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
          attributes: null,
        },
      ],
      loggedTypes: [],
      configurables: [],
    };

    beforeEach(async () => {
      [wallet, receiver] = await setupWallets();
      chainId = await wallet.provider.getChainId();
      provider = wallet.provider;
    });

    it('calls a predicate with valid address data and returns true', async () => {
      const amountToPredicate = 100;
      const amountToReceiver = 50;
      const predicate = new Predicate<[string]>(
        predicateBytesAddress,
        chainId,
        provider,
        AddressAbiInputs
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate
        .setData('0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a')
        .transfer(receiver.address, amountToReceiver);
      await tx.waitForResult();

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with invalid address data and returns false', async () => {
      const amountToPredicate = 10;
      const predicate = new Predicate<[string]>(
        predicateBytesAddress,
        chainId,
        provider,
        AddressAbiInputs
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // Check there are UTXO locked with the predicate hash
      expect(initialPredicateBalance.gte(amountToPredicate));
      expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

      predicate.setData('0xbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbada');

      await expect(predicate.transfer(receiver.address, 50)).rejects.toThrow('Invalid transaction');
    });

    it('calls a predicate with valid u32 data and returns true', async () => {
      const amountToPredicate = 100;
      const amountToReceiver = 50;
      const predicate = new Predicate<[number]>(predicateBytesU32, chainId, provider, U32AbiInputs);

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate.setData(1078).transfer(receiver.address, amountToReceiver);
      await tx.waitForResult();

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with invalid u32 data and returns false', async () => {
      const amountToPredicate = 10;
      const predicate = new Predicate<[number]>(predicateBytesU32, chainId, provider, U32AbiInputs);

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // Check there are UTXO locked with the predicate hash
      expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);
      expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

      await expect(
        predicate.setData(100).transfer(receiver.address, amountToPredicate)
      ).rejects.toThrow('Invalid transaction');
    });

    it('calls a predicate with valid struct data and returns true', async () => {
      const amountToPredicate = 100;
      const amountToReceiver = 50;
      const predicate = new Predicate<[Validation]>(
        predicateBytesStruct,
        chainId,
        provider,
        StructAbiInputs
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate
        .setData({
          has_account: true,
          total_complete: 100,
        })
        .transfer(receiver.address, amountToReceiver);
      await tx.waitForResult();

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with invalid struct data and returns false', async () => {
      const amountToPredicate = 10;
      const predicate = new Predicate<[Validation]>(
        predicateBytesStruct,
        chainId,
        provider,
        StructAbiInputs
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // Check there are UTXO locked with the predicate hash
      expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);
      expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

      await expect(
        predicate
          .setData({
            has_account: false,
            total_complete: 0,
          })
          .transfer(receiver.address, amountToPredicate)
      ).rejects.toThrow('Invalid transaction');
    });

    it('calls a predicate with a valid struct argument and returns true', async () => {
      const amountToPredicate = 100;
      const amountToReceiver = 50;
      const predicate = new Predicate<[Validation]>(
        predicateBytesMainArgsStruct,
        chainId,
        provider,
        predicateAbiMainArgsStruct
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // #region predicate-struct-arg
      // #context const predicate = new Predicate(bytecode, chainId, abi);
      const tx = await predicate
        .setData({
          has_account: true,
          total_complete: 100,
        })
        .transfer(receiver.address, amountToReceiver);
      await tx.waitForResult();
      // #endregion predicate-struct-arg

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with an invalid main struct argument and returns false', async () => {
      const amountToPredicate = 100;
      const predicate = new Predicate<[Validation]>(
        predicateBytesMainArgsStruct,
        chainId,
        provider,
        predicateAbiMainArgsStruct
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      // Check there are UTXO locked with the predicate hash
      expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);

      await expect(
        predicate
          .setData({
            has_account: false,
            total_complete: 0,
          })
          .transfer(receiver.address, 50)
      ).rejects.toThrow('Invalid transaction');
    });

    it('can call a Coin predicate which returns true with valid predicate data [main args vector]', async () => {
      const amountToPredicate = 100;
      const amountToReceiver = 50;
      const predicate = new Predicate<[BigNumberish[]]>(
        predicateBytesMainArgsVector,
        chainId,
        provider,
        predicateAbiMainArgsVector
      );

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      const tx = await predicate.setData([42]).transfer(receiver.address, amountToReceiver);
      await tx.waitForResult();

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with valid multiple arguments and returns true', async () => {
      const amountToPredicate = 100;
      const amountToReceiver = 50;
      const predicate = new Predicate(predicateBytesMulti, chainId, provider, predicateAbiMulti);

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);
      const initialReceiverBalance = await receiver.getBalance();

      // #region predicate-multi-args
      // #context const predicate = new Predicate(bytecode, chainId, abi);
      predicate.setData(20, 30);
      const tx = await predicate.transfer(receiver.address, amountToReceiver);
      await tx.waitForResult();
      // #endregion predicate-multi-args

      await assertBalances(
        predicate,
        receiver,
        initialPredicateBalance,
        initialReceiverBalance,
        amountToPredicate,
        amountToReceiver
      );
    });

    it('calls a predicate with invalid multiple arguments and returns false', async () => {
      const amountToPredicate = 100;
      const predicate = new Predicate(predicateBytesMulti, chainId, provider, predicateAbiMulti);

      const initialPredicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      // Check the UTXOs locked with the predicate hash
      expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(amountToPredicate);

      await expect(predicate.setData(20, 20).transfer(receiver.address, 50)).rejects.toThrow(
        'Invalid transaction'
      );
    });
  });
});
