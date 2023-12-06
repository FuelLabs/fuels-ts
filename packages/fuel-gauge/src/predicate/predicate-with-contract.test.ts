import { expectToBeInRange } from '@fuel-ts/utils/test-utils';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BN, WalletUnlocked } from 'fuels';
import {
  BaseAssetId,
  ContractFactory,
  toNumber,
  Contract,
  Provider,
  Predicate,
  FUEL_NETWORK_URL,
} from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';
import type { Validation } from '../types/predicate';

import { fundPredicate, setupContractWithConfig } from './utils/predicate';

describe('Predicate', () => {
  const { binHexlified: contractBytes, abiContents: contractAbi } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.CALL_TEST_CONTRACT
  );
  const { binHexlified: liquidityPoolBytes, abiContents: liquidityPoolAbi } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.LIQUIDITY_POOL);

  const { abiContents: predicateAbiMainArgsStruct } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_MAIN_ARGS_STRUCT
  );

  const { binHexlified: predicateBytesStruct } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_MAIN_ARGS_STRUCT
  );

  const { binHexlified: predicateBytesTrue } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_TRUE
  );

  describe('With Contract', () => {
    let wallet: WalletUnlocked;
    let receiver: WalletUnlocked;
    let provider: Provider;
    let gasPrice: BN;
    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
      gasPrice = provider.getGasConfig().minGasPrice;
    });

    beforeEach(async () => {
      wallet = await generateTestWallet(provider, [[2_000_000, BaseAssetId]]);
      receiver = await generateTestWallet(provider);
    });

    it('calls a predicate from a contract function', async () => {
      const setupContract = setupContractWithConfig({
        contractBytecode: contractBytes,
        abi: contractAbi,
        cache: true,
      });
      const contract = await setupContract();
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
        .txParams({ gasPrice, gasLimit: 10_000 })
        .call();

      expect(value.toString()).toEqual('500');

      const finalPredicateBalance = await predicate.getBalance();
      expect(finalPredicateBalance.lt(predicateBalance)).toBeTruthy();
    });

    it('calls a predicate and uses proceeds for a contract call', async () => {
      const contract = await new ContractFactory(
        liquidityPoolBytes,
        liquidityPoolAbi,
        wallet
      ).deployContract({ gasPrice });

      const initialReceiverBalance = toNumber(await receiver.getBalance());

      // calling the contract with the receiver account (no resources)
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
            gasLimit: 10_000,
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
        .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice, gasLimit: 10_000 });

      const { fee: predicateTxFee } = await tx.waitForResult();

      // calling the contract with the receiver account (with resources)
      const contractAmount = 10;
      const {
        transactionResult: { fee: receiverTxFee1 },
      } = await contract.functions
        .set_base_token(BaseAssetId)
        .txParams({ gasPrice, gasLimit: 10_000 })
        .call();
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
          gasLimit: 10_000,
        })
        .call();

      const finalReceiverBalance = toNumber(await receiver.getBalance());
      const remainingPredicateBalance = toNumber(await predicate.getBalance());

      const expectedFinalReceiverBalance =
        initialReceiverBalance +
        amountToReceiver -
        contractAmount -
        receiverTxFee1.toNumber() -
        receiverTxFee2.toNumber();

      expectToBeInRange({
        value: finalReceiverBalance,
        min: expectedFinalReceiverBalance - 20,
        max: expectedFinalReceiverBalance + 20,
      });

      const expectedFinalPredicateBalance =
        initialPredicateBalance + amountToPredicate - amountToReceiver - predicateTxFee.toNumber();

      expectToBeInRange({
        value: expectedFinalPredicateBalance,
        min: remainingPredicateBalance - 20,
        max: remainingPredicateBalance + 20,
      });
    });
  });
});
