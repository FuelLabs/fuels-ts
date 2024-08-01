import type {
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
  ContractTransactionRequestInput,
  BN,
} from 'fuels';
import {
  Predicate,
  bn,
  ScriptTransactionRequest,
  InputType,
  getRandomB256,
  WalletUnlocked,
  isRequestInputResource,
} from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  PredicateMainArgsStruct,
  PredicateValidateTransfer,
  PredicateTrue,
} from '../../test/typegen';
import type { Validation } from '../types/predicate';

import { fundPredicate } from './utils/predicate';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  describe('Estimate predicate gas', () => {
    const fundingAmount = 10_000;

    it('estimatePredicates should assign gas to the correct input', async () => {
      using launched = await launchTestNode();

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const predicateTrue = new PredicateTrue({ provider });

      const predicateStruct = new Predicate<[Validation]>({
        bytecode: PredicateMainArgsStruct.bytecode,
        abi: PredicateMainArgsStruct.abi,
        provider,
      });

      await fundPredicate(wallet, predicateStruct, fundingAmount);

      const tx = new ScriptTransactionRequest();

      // Get resources from the predicate struct
      const ressources = await predicateStruct.getResourcesToSpend([
        {
          assetId: provider.getBaseAssetId(),
          amount: bn(10_000),
        },
      ]);
      tx.addResource(ressources[0]);
      // Add predicate bytecode to the input predicate
      (<CoinTransactionRequestInput>tx.inputs[0]).predicate = predicateStruct.bytes;

      // Create a message input with a predicate that returns true
      const predicateMessage: MessageTransactionRequestInput = {
        type: InputType.Message,
        amount: bn(0),
        sender: '0x00000000000000000000000059f2f1fcfe2474fd5f0b9ba1e73ca90b143eb8d0',
        recipient: predicateTrue.address.toB256(),
        witnessIndex: 0,
        data: '0x',
        nonce: '0x0000000000000000000000000000000000000000000000000000000000000002',
        // Predicate that returns true
        predicate: predicateTrue.bytes,
        // Assign zero to gas to ensure that the gas is calculated
        predicateGasUsed: bn(0),
        predicateData: '0x',
      };

      const nonPredicateMessage: MessageTransactionRequestInput = {
        type: InputType.Message,
        amount: bn(100),
        sender: getRandomB256(),
        recipient: getRandomB256(),
        witnessIndex: 0,
        data: '0x',
        nonce: getRandomB256(),
      };

      const contract: ContractTransactionRequestInput = {
        type: 1,
        contractId: '0xb64fa600c9a940529020fd47a18f9c1395946fbf636aad13fe029db4820ed354',
        txPointer: '0x00000000000000000000000000000000',
      };

      const nonPredicateUtxo: CoinTransactionRequestInput = {
        id: '0x5b2f4599a29aea28e325c89249c9e397f8b86bbd2405cf3b0face56c8e0e4dbe01',
        amount: bn(100),
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        owner: '0xd8813d1f9ca165ce2e8710382c3d65d64e7bd43c0f7a3d51689bcdf9513411cd',
        type: 0,
        txPointer: '0x00000000000000000000000000000000',
        witnessIndex: 0,
      };

      tx.inputs.push(predicateMessage, nonPredicateMessage, contract, nonPredicateUtxo);

      const txEstimated = await provider.estimatePredicates(tx);

      const predicateCoinInput = <MessageTransactionRequestInput>txEstimated.inputs[0];
      expect(Number(predicateCoinInput.predicateGasUsed)).toBeGreaterThan(1);
      const predicateMessageInput = <MessageTransactionRequestInput>txEstimated.inputs[1];
      expect(Number(predicateMessageInput.predicateGasUsed)).toBeGreaterThan(1);
      const nonPredicateMessageInput = <MessageTransactionRequestInput>txEstimated.inputs[2];
      expect(nonPredicateMessageInput.predicateGasUsed).toBeUndefined();
      const contractInput = <ContractTransactionRequestInput>txEstimated.inputs[3];
      expect(contractInput.contractId).toBe(contract.contractId);
      const nonPredicateInput = <CoinTransactionRequestInput>txEstimated.inputs[4];
      expect(nonPredicateInput.predicateGasUsed).toBeUndefined();
      // Because the predicate that owns the coin is more complex
      // it should have a bigger gas cost
      expect(Number(predicateCoinInput.predicateGasUsed)).toBeGreaterThan(
        Number(predicateMessageInput.predicateGasUsed)
      );
    });

    test('predicate does not get estimated again if it has already been estimated', async () => {
      using launched = await launchTestNode();

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const tx = new ScriptTransactionRequest();

      const predicateTrue = new PredicateTrue({ provider });

      await fundPredicate(wallet, predicateTrue, fundingAmount);

      const resources = await predicateTrue.getResourcesToSpend([[1, provider.getBaseAssetId()]]);
      tx.addResources(resources);

      const spy = vi.spyOn(provider.operations, 'estimatePredicates');

      await provider.estimatePredicates(tx);
      await provider.estimatePredicates(tx);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('Predicates get estimated if one of them is not estimated', async () => {
      using launched = await launchTestNode();

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const predicateTrue = new PredicateTrue({ provider });

      const predicateStruct = new Predicate<[Validation]>({
        abi: PredicateMainArgsStruct.abi,
        bytecode: PredicateMainArgsStruct.bytecode,
        provider,
      });

      await fundPredicate(wallet, predicateTrue, fundingAmount);
      await fundPredicate(wallet, predicateStruct, fundingAmount);

      const tx = new ScriptTransactionRequest();
      const trueResources = await predicateTrue.getResourcesToSpend([
        [1, provider.getBaseAssetId()],
      ]);

      tx.addResources(trueResources);

      const spy = vi.spyOn(provider.operations, 'estimatePredicates');
      await provider.estimatePredicates(tx);

      const structResources = await predicateStruct.getResourcesToSpend([
        [1, provider.getBaseAssetId()],
      ]);
      tx.addResources(structResources);

      await provider.estimatePredicates(tx);

      // this call shouldn't call provider.operations.estimatePredicates because all predicates have been estimated
      await provider.estimatePredicates(tx);

      expect(spy).toHaveBeenCalledTimes(2);
    });

    test('transferring funds from a predicate estimates the predicate and does only one dry run', async () => {
      using launched = await launchTestNode();

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const amountToPredicate = 200_000;

      const predicateValidateTransfer = new Predicate<[BN]>({
        abi: PredicateValidateTransfer.abi,
        bytecode: PredicateValidateTransfer.bytecode,
        provider,
        data: [bn(amountToPredicate)],
      });

      await fundPredicate(wallet, predicateValidateTransfer, amountToPredicate);

      const receiverWallet = WalletUnlocked.generate({
        provider,
      });

      const initialReceiverBalance = await receiverWallet.getBalance();

      const dryRunSpy = vi.spyOn(provider.operations, 'dryRun');
      const estimatePredicatesSpy = vi.spyOn(provider.operations, 'estimatePredicates');

      const response = await predicateValidateTransfer.transfer(
        receiverWallet.address.toB256(),
        1,
        provider.getBaseAssetId()
      );

      const { isStatusSuccess } = await response.waitForResult();
      expect(isStatusSuccess).toBeTruthy();

      const finalReceiverBalance = await receiverWallet.getBalance();

      expect(finalReceiverBalance.gt(initialReceiverBalance)).toBeTruthy();
      expect(estimatePredicatesSpy).toHaveBeenCalledTimes(1);
      expect(dryRunSpy).toHaveBeenCalledOnce();
    });

    describe('predicate resource fetching and predicateData population', () => {
      test('getting predicate resources via the predicate automatically populates predicateData', async () => {
        using launched = await launchTestNode();

        const {
          wallets: [wallet],
          provider,
        } = launched;

        const predicateStruct = new Predicate<[Validation]>({
          abi: PredicateMainArgsStruct.abi,
          bytecode: PredicateMainArgsStruct.bytecode,
          provider,
        });

        await fundPredicate(wallet, predicateStruct, fundingAmount);

        const transactionRequest = new ScriptTransactionRequest();

        const resources = await predicateStruct.getResourcesToSpend([
          [fundingAmount, provider.getBaseAssetId()],
        ]);
        resources.forEach((resource) => {
          expect(resource.predicateData).toBeDefined();
        });

        transactionRequest.addResources(resources);
        const inputs = transactionRequest.inputs.filter(isRequestInputResource);

        expect(inputs.length).toBeGreaterThan(0);
        inputs.forEach((resource) => {
          expect(resource.predicateData).toBeDefined();
        });
      });

      test('getting predicate resources via the provider requires manual predicateData population', async () => {
        using launched = await launchTestNode();

        const {
          wallets: [wallet],
          provider,
        } = launched;

        const predicateStruct = new Predicate<[Validation]>({
          abi: PredicateMainArgsStruct.abi,
          bytecode: PredicateMainArgsStruct.bytecode,
          provider,
        });

        await fundPredicate(wallet, predicateStruct, fundingAmount);

        const transactionRequest = new ScriptTransactionRequest();

        const resources = await provider.getResourcesToSpend(predicateStruct.address, [
          [fundingAmount, provider.getBaseAssetId()],
        ]);

        resources.forEach((resource) => {
          expect(resource.predicateData).toBeUndefined();
        });

        transactionRequest.addResources(resources);
        const inputs = transactionRequest.inputs.filter(isRequestInputResource);

        expect(inputs.length).toBeGreaterThan(0);
        inputs.forEach((resource) => {
          expect(resource.predicateData).toBeUndefined();
        });

        predicateStruct.populateTransactionPredicateData(transactionRequest);

        inputs.forEach((resource) => {
          expect(resource.predicateData).toBeDefined();
        });
      });
    });
  });
});
