import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { expectToBeInRange } from '@fuel-ts/utils/test-utils';
import { BaseAssetId, toNumber, Contract, Predicate, WalletUnlocked } from 'fuels';

import predicateAbiMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import predicateBytesStruct from '../../fixtures/forc-projects/predicate-struct';
import predicateBytesTrue from '../../fixtures/forc-projects/predicate-true';
import type { Validation } from '../types/predicate';
import { getProgramDir } from '../utils';

import { fundPredicate } from './utils/predicate';

const callTestContractDir = getProgramDir('call-test-contract');
const liquidityPoolDir = getProgramDir('liquidity-pool');

/**
 * @group node
 */
describe('Predicate', () => {
  describe('With Contract', () => {
    beforeAll(async (ctx) => {});

    it('calls a predicate from a contract function', async () => {
      await using launched = await TestNodeLauncher.launch({
        deployContracts: [callTestContractDir],
      });
      const {
        wallets: [wallet],
        provider,
        contracts: [contract],
      } = launched;
      const { minGasPrice: gasPrice } = provider.getGasConfig();

      const amountToPredicate = 500_000;
      const predicate = new Predicate<[Validation]>(
        predicateBytesTrue,
        provider,
        predicateAbiMainArgsStruct
      );
      // Create a instance of the contract with the predicate as the caller Account
      const contractPredicate = new Contract(contract.id, contract.interface, predicate);
      const predicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      const { value } = await contractPredicate.functions
        .return_context_amount()
        .callParams({
          forward: [500, BaseAssetId],
        })
        .txParams({ gasPrice })
        .call();

      expect(value.toString()).toEqual('500');

      const finalPredicateBalance = await predicate.getBalance();
      expect(finalPredicateBalance.lt(predicateBalance)).toBeTruthy();
    });

    it('calls a predicate and uses proceeds for a contract call', async () => {
      await using launched = await TestNodeLauncher.launch({
        deployContracts: [liquidityPoolDir],
      });
      const {
        wallets: [wallet],
        provider,
        contracts: [contract],
      } = launched;
      const { minGasPrice: gasPrice } = provider.getGasConfig();

      const receiver = WalletUnlocked.generate({ provider });

      const initialReceiverBalance = toNumber(await receiver.getBalance());

      contract.account = receiver;
      await expect(
        contract.functions
          .deposit({
            value: receiver.address.toB256(),
          })
          .callParams({
            forward: [100, BaseAssetId],
          })
          .txParams({
            gasPrice,
          })
          .call()
      ).rejects.toThrow(/not enough coins to fit the target/);

      // setup predicate
      const amountToPredicate = 700_000;
      const amountToReceiver = 200_000;
      const predicate = new Predicate<[Validation]>(
        predicateBytesStruct,
        provider,
        predicateAbiMainArgsStruct
      );
      const initialPredicateBalance = toNumber(await predicate.getBalance());

      await fundPredicate(wallet, predicate, amountToPredicate);

      expect(toNumber(await predicate.getBalance())).toEqual(
        initialPredicateBalance + amountToPredicate
      );

      // executing predicate to transfer resources to receiver
      const tx = await predicate
        .setData({
          has_account: true,
          total_complete: 100,
        })
        .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice });

      const { fee: predicateTxFee } = await tx.waitForResult();

      // calling the contract with the receiver account (with resources)
      const contractAmount = 10;
      const {
        transactionResult: { fee: receiverTxFee1 },
      } = await contract.functions.set_base_token(BaseAssetId).txParams({ gasPrice }).call();
      const {
        transactionResult: { fee: receiverTxFee2 },
      } = await contract.functions
        .deposit({
          value: receiver.address.toB256(),
        })
        .callParams({
          forward: [contractAmount, BaseAssetId],
        })
        .txParams({
          gasPrice,
        })
        .call();

      const finalReceiverBalance = toNumber(await receiver.getBalance());
      const remainingPredicateBalance = toNumber(await predicate.getBalance());

      const expectedFinalReceiverBalance =
        initialReceiverBalance +
        amountToReceiver -
        contractAmount -
        // ajusting margin of error in transaction fee calculation
        (receiverTxFee1.toNumber() - 1) -
        (receiverTxFee2.toNumber() - 1);

      expect(expectedFinalReceiverBalance).toEqual(finalReceiverBalance);

      const expectedFinalPredicateBalance =
        initialPredicateBalance + amountToPredicate - amountToReceiver - predicateTxFee.toNumber();

      expectToBeInRange({
        value: expectedFinalPredicateBalance,
        min: remainingPredicateBalance - 1,
        max: remainingPredicateBalance + 1,
      });
    });
  });
});
