import { setupTestProvider , seedTestWallet } from '@fuel-ts/wallet/test-utils';
import type { CoinTransactionRequestInput, MessageTransactionRequestInput, Provider } from 'fuels';
import { BaseAssetId, Predicate, bn, ScriptTransactionRequest, InputType } from 'fuels';

import predicateBytesMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct';
import predicateAbiMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import predicateTrueBytecode from '../../fixtures/forc-projects/predicate-true';
import type { Validation } from '../types/predicate';

describe('Predicate', () => {
  describe('Estimate predicate gas', () => {
    const setup = async (provider: Provider) => {
      const predicateTrue = new Predicate(predicateTrueBytecode, provider);
      const predicateStruct = new Predicate<[Validation]>(
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
      return { predicateTrue, predicateStruct };
    };

    it('estimatePredicates should assign gas to the correct input', async () => {
      using provider = await setupTestProvider();
      const { predicateTrue, predicateStruct } = await setup(provider);

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
      const inputMessage: MessageTransactionRequestInput = {
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
      tx.inputs.push(inputMessage);

      const txEstimated = await provider.estimatePredicates(tx);

      const predicateCoinInput = <MessageTransactionRequestInput>txEstimated.inputs[0];
      expect(Number(predicateCoinInput.predicateGasUsed)).toBeGreaterThan(1);
      const predicateMessageInput = <MessageTransactionRequestInput>txEstimated.inputs[1];
      expect(Number(predicateMessageInput.predicateGasUsed)).toBeGreaterThan(1);
      // Because the predicate that owns the coin is more complex
      // it should have a bigger gas cost
      expect(Number(predicateCoinInput.predicateGasUsed)).toBeGreaterThan(
        Number(predicateMessageInput.predicateGasUsed)
      );
    });
  });
});
