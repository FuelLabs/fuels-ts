import { seedTestWallet } from '@fuel-ts/account/test-utils';
import type {
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
  ContractTransactionRequestInput,
} from 'fuels';
import {
  BaseAssetId,
  Provider,
  Predicate,
  bn,
  ScriptTransactionRequest,
  InputType,
  FUEL_NETWORK_URL,
  getRandomB256,
} from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../../test/fixtures';
import type { Validation } from '../types/predicate';

/**
 * @group node
 */
describe('Predicate', () => {
  const { binHexlified: predicateTrueBytecode } = getFuelGaugeForcProject(
    FuelGaugeProjectsEnum.PREDICATE_TRUE
  );

  const { binHexlified: predicateBytesMainArgsStruct, abiContents: predicateAbiMainArgsStruct } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_MAIN_ARGS_STRUCT);

  describe('Estimate predicate gas', () => {
    let provider: Provider;
    let predicateTrue: Predicate<[]>;
    let predicateStruct: Predicate<[Validation]>;

    beforeEach(async () => {
      provider = await Provider.create(FUEL_NETWORK_URL);
      predicateTrue = new Predicate(predicateTrueBytecode, provider);
      predicateStruct = new Predicate<[Validation]>(
        predicateBytesMainArgsStruct,
        provider,
        predicateAbiMainArgsStruct
      );
      await seedTestWallet(predicateStruct, [
        {
          assetId: BaseAssetId,
          amount: bn(1000),
        },
      ]);
    });

    it('estimatePredicates should assign gas to the correct input', async () => {
      const tx = new ScriptTransactionRequest();

      // Get resources from the predicate struct
      const ressources = await predicateStruct.getResourcesToSpend([
        {
          assetId: BaseAssetId,
          amount: bn(1000),
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
        maturity: 0,
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
  });
});
