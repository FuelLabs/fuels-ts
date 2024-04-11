import { generateTestWallet } from '@fuel-ts/account/test-utils';
import type { Account, BN, CoinQuantity, InputCoin, WalletUnlocked } from 'fuels';
import {
  BaseAssetId,
  ContractFactory,
  toNumber,
  Contract,
  Provider,
  Predicate,
  FUEL_NETWORK_URL,
  bn,
  InputType,
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

  const { binHexlified: predicateBytesStruct, abiContents: predicateAbiMainArgsStruct } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_MAIN_ARGS_STRUCT);

  const { binHexlified: predicateBytesTrue, abiContents: predicateAbiTrue } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_TRUE);

  const { binHexlified: complexPredicateBytes, abiContents: complexPredicateAbi } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.COMPLEX_PREDICATE);

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
      const predicate = new Predicate<[Validation]>({
        bytecode: predicateBytesStruct,
        abi: predicateAbiMainArgsStruct,
        provider,
        inputData: [
          {
            has_account: true,
            total_complete: bn(100),
          },
        ],
      });
      // Create a instance of the contract with the predicate as the caller Account
      const contractPredicate = new Contract(contract.id, contract.interface, predicate);
      const predicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      const {
        value,
        transactionResult: {
          transaction: { witnesses },
        },
      } = await contractPredicate.functions
        .return_context_amount()
        .callParams({
          forward: [500, BaseAssetId],
        })
        .call();

      // not witnesses entry were added to Transaction witnesses
      expect(witnesses?.length).toBe(0);
      expect(value.toString()).toEqual('500');

      const finalPredicateBalance = await predicate.getBalance();
      expect(finalPredicateBalance.lt(predicateBalance)).toBeTruthy();
    });

    it('calls a predicate and uses proceeds for a contract call', async () => {
      const contract = await new ContractFactory(
        tokenPoolBytes,
        tokenPoolAbi,
        wallet
      ).deployContract({ gasPrice });

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
      const tx = await predicate.transfer(receiver.address, amountToReceiver, BaseAssetId);
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
      const forward: CoinQuantity = { amount: bn(500), assetId: BaseAssetId };

      const request = await contract.functions
        .return_context_amount()
        .txParams({ gasPrice })
        .callParams({
          forward,
        })
        .getTransactionRequest();

      const sender = contract.account as Account;

      // adding any amount of resources from the sender to ensure it witnesse index will be 0
      const senderResources = await sender.getResourcesToSpend([[1, BaseAssetId]]);
      request.addResources(senderResources);

      // any amount of the predicate will do as it is not going to pay for the fee
      const predicateResources = await predicate.getResourcesToSpend([[1, BaseAssetId]]);
      request.addResources(predicateResources);

      const { maxFee, requiredQuantities, estimatedInputs, gasUsed } =
        await provider.getTransactionCost(request, [forward]);

      request.updatePredicateInputs(estimatedInputs);
      request.gasLimit = gasUsed;

      // properly funding the TX if needed
      await sender?.fund(request, requiredQuantities, maxFee);

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

      // TX should have only one witness entry which is from the sender as a predicate should
      // not add witnesses entries
      expect(witnesses?.length).toBe(1);
    });
  });
});
