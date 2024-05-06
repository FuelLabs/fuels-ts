import { expectToBeInRange } from '@fuel-ts/utils/test-utils';
import { WalletUnlocked, toNumber, Contract, Predicate } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';
import type { Validation } from '../types/predicate';
import { getProgramDir } from '../utils';

import { fundPredicate } from './utils/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  const callTestContractDir = getProgramDir(FuelGaugeProjectsEnum.CALL_TEST_CONTRACT);

  const tokenPoolContractDir = getProgramDir(FuelGaugeProjectsEnum.TOKEN_CONTRACT);

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
    it('calls a predicate from a contract function', async () => {
      using launcher = await launchTestNode({
        deployContracts: [callTestContractDir],
      });
      const {
        wallets: [wallet],
        contracts: [contract],
        provider,
      } = launcher;

      const amountToPredicate = 3000;
      const predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesTrue,
        abi: predicateAbiMainArgsStruct,
        provider,
      });
      // Create a instance of the contract with the predicate as the caller Account
      const contractPredicate = new Contract(contract.id, contract.interface, predicate);
      await fundPredicate(wallet, predicate, amountToPredicate);

      const { value, transactionResult } = await contractPredicate.functions
        .return_context_amount()
        .callParams({
          forward: [500, provider.getBaseAssetId()],
        })
        .call();

      expect(value.toString()).toEqual('500');
      expect(transactionResult.isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate and uses proceeds for a contract call', async () => {
      using launcher = await launchTestNode({
        deployContracts: [tokenPoolContractDir],
      });
      const {
        wallets: [wallet],
        contracts: [contract],
        provider,
      } = launcher;
      const receiver = WalletUnlocked.generate({ provider });

      const receiver = Wallet.generate({ provider });
      const receiverInitialBalance = await receiver.getBalance();

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

      await fundPredicate(wallet, predicate, amountToPredicate);

      // executing predicate to transfer resources to receiver
      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        provider.getBaseAssetId()
      );
      let { isStatusSuccess } = await tx.waitForResult();
      expect(isStatusSuccess).toBeTruthy();

      const receiverFinalBalance = await receiver.getBalance();
      expect(receiverFinalBalance.gt(receiverInitialBalance)).toBeTruthy();

      ({
        transactionResult: { isStatusSuccess },
      } = await contract.functions.mint_coins(200).call());

      expect(isStatusSuccess).toBeTruthy();
    });
  });
});
