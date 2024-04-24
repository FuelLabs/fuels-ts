import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { expectToBeInRange } from '@fuel-ts/utils/test-utils';
import type { WalletUnlocked } from 'fuels';
import { ContractFactory, toNumber, Contract, Provider, Predicate, FUEL_NETWORK_URL } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';
import type { Validation } from '../types/predicate';

import { fundPredicate, setupContractWithConfig } from './utils/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  const { binHexlified: contractBytes, abiContents: contractAbi } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.CALL_TEST_CONTRACT
  );
  const { binHexlified: tokenPoolBytes, abiContents: tokenPoolAbi } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.TOKEN_CONTRACT
  );

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
    let baseAssetId: string;
    beforeAll(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
      baseAssetId = provider.getBaseAssetId();
    });

    beforeEach(async () => {
      wallet = await generateTestWallet(provider, [[2_000_000, baseAssetId]]);
      receiver = await generateTestWallet(provider);
    });

    it('calls a predicate from a contract function', async () => {
      const setupContract = setupContractWithConfig({
        contractBytecode: contractBytes,
        abi: contractAbi,
        cache: true,
      });
      const contract = await setupContract();
      const amountToPredicate = 3000;
      const predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesTrue,
        abi: predicateAbiMainArgsStruct,
        provider,
      });
      // Create a instance of the contract with the predicate as the caller Account
      const contractPredicate = new Contract(contract.id, contract.interface, predicate);
      const predicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      const { value } = await contractPredicate.functions
        .return_context_amount()
        .callParams({
          forward: [500, baseAssetId],
        })
        .call();

      expect(value.toString()).toEqual('500');

      const finalPredicateBalance = await predicate.getBalance();
      expect(finalPredicateBalance.lt(predicateBalance)).toBeTruthy();
    });

    it('calls a predicate and uses proceeds for a contract call', async () => {
      const contract = await new ContractFactory(
        tokenPoolBytes,
        tokenPoolAbi,
        wallet
      ).deployContract();

      const initialReceiverBalance = toNumber(await receiver.getBalance());

      // calling the contract with the receiver account (no resources)
      contract.account = receiver;
      await expect(contract.functions.mint_coins(200).call()).rejects.toThrow(
        /not enough coins to fit the target/
      );

      // setup predicate
      const amountToPredicate = 20_000;
      const amountToReceiver = 2_000;
      const predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesStruct,
        provider,
        abi: predicateAbiMainArgsStruct,
        inputData: [
          {
            has_account: true,
            total_complete: 100,
          },
        ],
      });
      const initialPredicateBalance = toNumber(await predicate.getBalance());

      await fundPredicate(wallet, predicate, amountToPredicate);

      expect(toNumber(await predicate.getBalance())).toBeGreaterThan(initialPredicateBalance);

      // executing predicate to transfer resources to receiver
      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId);

      const { fee: predicateTxFee } = await tx.waitForResult();

      // calling the contract with the receiver account (with resources)
      const contractAmount = 10;
      const {
        transactionResult: { fee: receiverTxFee },
      } = await contract.functions.mint_coins(200).call();

      const finalReceiverBalance = toNumber(await receiver.getBalance());
      const remainingPredicateBalance = toNumber(await predicate.getBalance());

      const expectedFinalReceiverBalance =
        initialReceiverBalance + amountToReceiver - contractAmount - receiverTxFee.toNumber();

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
