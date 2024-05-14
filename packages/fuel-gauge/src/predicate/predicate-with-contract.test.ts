import { generateTestWallet, seedTestWallet } from '@fuel-ts/account/test-utils';
import type { Account, BN, CoinQuantity, InputCoin, WalletUnlocked } from 'fuels';
import {
  ContractFactory,
  toNumber,
  Contract,
  Provider,
  Predicate,
  FUEL_NETWORK_URL,
  bn,
  InputType,
  Wallet,
} from 'fuels';

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

  const { binHexlified: predicateSum, abiContents: predicateAbiSum } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_SUM
  );

  const { binHexlified: predicateBytesTrue, abiContents: predicateAbiTrue } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_TRUE);

  const { binHexlified: complexPredicateBytes, abiContents: complexPredicateAbi } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.COMPLEX_PREDICATE);

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
      const testWallet = Wallet.generate({ provider });

      await seedTestWallet(testWallet, [[1_000_000, baseAssetId]]);

      const factory = new ContractFactory(contractBytes, contractAbi, testWallet);
      const contract = await factory.deployContract();

      const amountToPredicate = 500_000;
      const predicate = new Predicate<[BN, BN]>({
        bytecode: predicateSum,
        abi: predicateAbiSum,
        provider,
        inputData: [bn(1337), bn(0)],
      });
      // Create a instance of the contract with the predicate as the caller Account
      const contractPredicate = new Contract(contract.id, contract.interface, predicate);
      await fundPredicate(testWallet, predicate, amountToPredicate);

      const {
        value,
        transactionResult: {
          transaction: { witnesses },
          isStatusSuccess,
        },
      } = await contractPredicate.functions
        .return_context_amount()
        .callParams({
          forward: [500, baseAssetId],
        })
        .call();

      // not witnesses entry were added to Transaction witnesses
      expect(witnesses?.length).toBe(0);
      expect(value.toString()).toEqual('500');
      expect(isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate and uses proceeds for a contract call', async () => {
      const contract = await new ContractFactory(
        tokenPoolBytes,
        tokenPoolAbi,
        wallet
      ).deployContract();

      // calling the contract with the receiver account (no resources)
      contract.account = receiver;
      await expect(contract.functions.mint_coins(200).call()).rejects.toThrow(
        /not enough coins to fit the target/
      );

      // setup predicate
      const amountToPredicate = 700_000;
      const amountToReceiver = 200_000;
      const predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesTrue,
        provider,
        abi: predicateAbiTrue,
      });
      const initialPredicateBalance = toNumber(await predicate.getBalance());

      await fundPredicate(wallet, predicate, amountToPredicate);

      expect(toNumber(await predicate.getBalance())).toEqual(
        initialPredicateBalance + amountToPredicate
      );

      // executing predicate to transfer resources to receiver
      const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId);
      const { isStatusSuccess } = await tx.waitForResult();
      expect(isStatusSuccess).toBeTruthy();

      // calling the contract with the receiver account (with resources)
      const { transactionResult: contractCallResult } = await contract.functions
        .mint_coins(200)
        .call();

      expect(contractCallResult.isStatusSuccess).toBeTruthy();
    });

    it('executes a contract call with a predicate to ensure not extra witnesses are added', async () => {
      const setupContract = setupContractWithConfig({
        contractBytecode: contractBytes,
        abi: contractAbi,
        cache: true,
      });

      const predicate = new Predicate<[BN]>({
        bytecode: complexPredicateBytes,
        abi: complexPredicateAbi,
        provider,
        inputData: [bn(10)],
      });

      await fundPredicate(wallet, predicate, 5000);

      const contract = await setupContract();
      const forward: CoinQuantity = { amount: bn(500), assetId: baseAssetId };

      const request = await contract.functions
        .return_context_amount()
        .callParams({
          forward,
        })
        .getTransactionRequest();

      const sender = contract.account as Account;

      // Adding any amount of resources from the sender to ensure its witness index will be 0
      const senderResources = await sender.getResourcesToSpend([[1, baseAssetId]]);
      request.addResources(senderResources);

      // Any amount of the predicate will do as it is not going to pay for the fee
      const predicateResources = await predicate.getResourcesToSpend([[1, baseAssetId]]);
      request.addResources(predicateResources);

      const txCost = await provider.getTransactionCost(request, {
        quantitiesToContract: [forward],
      });

      request.gasLimit = txCost.gasUsed;
      request.maxFee = txCost.maxFee;

      // Properly funding the TX to ensure the fee was covered
      await sender?.fund(request, txCost);

      const tx = await sender?.sendTransaction(request);

      const {
        transaction: { witnesses, inputs },
      } = await tx.waitForResult();

      const predicateAddress = predicate.address.toB256();
      const predicateInputs = inputs?.filter(
        (input) => input.type === InputType.Coin && input.owner === predicateAddress
      );

      // It ensures a predicate witness index is set to 0
      expect(predicateInputs?.length).toBe(1);
      expect((<InputCoin>predicateInputs?.[0]).witnessIndex).toBe(0);

      /**
       * TX should have only one witness entry which is from the sender as a predicate should
       * not add witnesses entries
       */
      expect(witnesses?.length).toBe(1);
    });
  });
});
