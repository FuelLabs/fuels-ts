import { getRandomB256, Address } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';
import { InputType, OutputType } from '@fuel-ts/transactions';

import { generateFakeCoin, generateFakeMessageCoin } from '../../test-utils/resources';
import {
  generateFakeRequestInputCoin,
  generateFakeRequestInputMessage,
  generateFakeRequestInputContract,
} from '../../test-utils/transactionRequest';

import { CreateTransactionRequest } from './create-transaction-request';
import {
  isRequestInputCoin,
  isRequestInputMessage,
  isRequestInputResource,
  getRequestInputResourceOwner,
  isRequestInputResourceFromOwner,
  getAssetAmountInRequestInputs,
  cacheRequestInputsResources,
  cacheRequestInputsResourcesFromOwner,
  getBurnableAssetCount,
  validateTransactionForAssetBurn,
} from './helpers';
import type { TransactionRequestInput } from './input';
import type { TransactionRequestOutput } from './output';
import { ScriptTransactionRequest } from './script-transaction-request';

/**
 * @group node
 * @group browser
 */
describe('helpers', () => {
  const ASSET_A: string = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const ASSET_B: string = '0x0202020202020202020202020202020202020202020202020202020202020202';
  const baseAssetId = ZeroBytes32;
  const coinInput = generateFakeRequestInputCoin();
  const messageInput = generateFakeRequestInputMessage();
  const contractInput = generateFakeRequestInputContract();

  it('should ensure isRequestInputCoin works just fine', () => {
    expect(coinInput.type).toBe(InputType.Coin);
    expect(isRequestInputCoin(coinInput)).toBeTruthy();

    expect(isRequestInputCoin(messageInput)).toBeFalsy();
    expect(isRequestInputCoin(contractInput)).toBeFalsy();
  });

  it('should ensure isRequestInputMessage works just fine', () => {
    expect(messageInput.type).toBe(InputType.Message);
    expect(isRequestInputMessage(messageInput)).toBeTruthy();

    expect(isRequestInputMessage(coinInput)).toBeFalsy();
    expect(isRequestInputMessage(contractInput)).toBeFalsy();
  });

  it('should ensure isRequestInputResource works just fine', () => {
    expect(isRequestInputResource(coinInput)).toBeTruthy();
    expect(isRequestInputResource(messageInput)).toBeTruthy();

    expect(isRequestInputResource(contractInput)).toBeFalsy();
  });

  it('should ensure getRequestInputResourceOwner works just fine', () => {
    // Coin
    expect(getRequestInputResourceOwner(coinInput)).toBe(coinInput.owner);

    // MessageCoin
    expect(getRequestInputResourceOwner(messageInput)).toBe(messageInput.recipient);
  });

  it('should ensure isRequestInputResourceFromOwner works just fine', () => {
    const address1 = getRandomB256();
    const address2 = getRandomB256();

    // Coin
    const resourceInput1 = generateFakeRequestInputCoin({ owner: address1 });

    expect(
      isRequestInputResourceFromOwner(resourceInput1, Address.fromString(address1))
    ).toBeTruthy();
    expect(
      isRequestInputResourceFromOwner(resourceInput1, Address.fromString(address2))
    ).toBeFalsy();

    // Message
    const resourceInput2 = generateFakeRequestInputCoin({ owner: address2 });

    expect(
      isRequestInputResourceFromOwner(resourceInput2, Address.fromString(address1))
    ).toBeFalsy();
    expect(
      isRequestInputResourceFromOwner(resourceInput2, Address.fromString(address2))
    ).toBeTruthy();
  });

  describe('should ensure cacheRequestInputsResourcesFromOwner works just fine', () => {
    const owner = Address.fromRandom();
    const coinInput1 = generateFakeRequestInputCoin({ owner: owner.toB256() });
    const coinInput2 = generateFakeRequestInputCoin();
    const messageInput1 = generateFakeRequestInputMessage({ recipient: owner.toB256() });
    const messageInput2 = generateFakeRequestInputMessage();

    it('should handle an empty array', () => {
      const result = cacheRequestInputsResourcesFromOwner([], owner);
      expect(result.utxos).toEqual([]);
      expect(result.messages).toEqual([]);
    });

    it('should cache Coins just fine', () => {
      const inputs = [coinInput1, coinInput2];

      const result = cacheRequestInputsResourcesFromOwner(inputs, owner);

      expect(result.utxos).toContain(coinInput1.id);
      expect(result.utxos).not.toContain(coinInput2.id);
      expect(result.messages).toEqual([]);
    });

    it('should cache MessageCoins just fine', () => {
      const inputs = [messageInput1, messageInput2];

      const result = cacheRequestInputsResourcesFromOwner(inputs, owner);

      expect(result.messages).toContain(messageInput1.nonce);
      expect(result.messages).not.toContain(messageInput2.nonce);
      expect(result.utxos).toEqual([]);
    });

    it('should cache both resources just fine', () => {
      const resources = [coinInput1, coinInput2, messageInput1, messageInput2];

      const result = cacheRequestInputsResourcesFromOwner(resources, owner);
      expect(result.utxos).toContain(coinInput1.id);
      expect(result.utxos).not.toContain(coinInput2.id);
      expect(result.messages).toContain(messageInput1.nonce);
      expect(result.messages).not.toContain(messageInput2.nonce);
    });

    describe('getAssetAmountInRequestInputs', () => {
      it('should handle empty inputs array', () => {
        const tx = new ScriptTransactionRequest();
        const total = getAssetAmountInRequestInputs(tx.inputs, ASSET_A, baseAssetId);
        expect(total.eq(0)).toBeTruthy();
      });

      it('should sum assets on TransactionRequestsInputs just fine', () => {
        const amount = bn(100);
        const tx = new ScriptTransactionRequest();
        tx.addResources([
          generateFakeCoin({ assetId: ASSET_A, amount }),
          generateFakeCoin({ assetId: ASSET_A, amount }),
          generateFakeCoin({ assetId: ASSET_B, amount }),
        ]);

        const assetATotal = getAssetAmountInRequestInputs(tx.inputs, ASSET_A, baseAssetId);
        expect(assetATotal.eq(amount.mul(2))).toBeTruthy();

        const assetBTotal = getAssetAmountInRequestInputs(tx.inputs, ASSET_B, baseAssetId);
        expect(assetBTotal.eq(amount)).toBeTruthy();
      });

      it('should properly sum base asset considering MessageTransactionRequestInput', () => {
        const amount = bn(100);
        const tx = new ScriptTransactionRequest();
        tx.addResources([
          generateFakeCoin({ assetId: baseAssetId, amount }),
          generateFakeCoin({ assetId: ASSET_A, amount }),
          generateFakeCoin({ assetId: ASSET_B, amount }),
          generateFakeMessageCoin({ assetId: baseAssetId, amount }),
        ]);

        const expectedTotal = amount.mul(2);

        const assetATotal = getAssetAmountInRequestInputs(tx.inputs, baseAssetId, baseAssetId);
        expect(assetATotal.eq(expectedTotal)).toBeTruthy();
      });
    });

    describe('cacheRequestInputsResources', () => {
      it('should handle empty inputs array', () => {
        const tx = new ScriptTransactionRequest();
        const cached = cacheRequestInputsResources(tx.inputs);
        expect(cached.messages).toHaveLength(0);
        expect(cached.utxos).toHaveLength(0);
      });

      it('should sum assets on TransactionRequestsInputs just fine', () => {
        const amount = bn(100);
        const input1 = generateFakeRequestInputCoin({ assetId: ASSET_A, amount });
        const input2 = generateFakeRequestInputCoin({ assetId: ASSET_B, amount });
        const input3 = generateFakeRequestInputMessage({ amount });
        const tx = new CreateTransactionRequest({
          inputs: [input2, input1, input3],
        });

        const cached = cacheRequestInputsResources(tx.inputs);
        expect(cached.utxos).toStrictEqual([input2.id, input1.id]);
        expect(cached.messages).toStrictEqual([input3.nonce]);
      });
    });

    describe('getBurnableAssetCount', () => {
      it('should get the number of burnable assets [0]', () => {
        const inputs: TransactionRequestInput[] = [
          generateFakeRequestInputCoin({ assetId: ASSET_A, owner: owner.toB256() }),
          generateFakeRequestInputCoin({ assetId: ASSET_B, owner: owner.toB256() }),
        ];
        const outputs: TransactionRequestOutput[] = [
          { type: OutputType.Change, assetId: ASSET_A, to: owner.toB256() },
          { type: OutputType.Change, assetId: ASSET_B, to: owner.toB256() },
        ];
        const expectedBurnableAssets = 0;

        const burnableAssets = getBurnableAssetCount({ inputs, outputs });

        expect(burnableAssets).toBe(expectedBurnableAssets);
      });

      it('should get the number of burnable assets [1]', () => {
        const inputs: TransactionRequestInput[] = [
          generateFakeRequestInputCoin({ assetId: ASSET_A, owner: owner.toB256() }),
          generateFakeRequestInputCoin({ assetId: ASSET_B, owner: owner.toB256() }),
        ];
        const outputs: TransactionRequestOutput[] = [
          { type: OutputType.Change, assetId: ASSET_A, to: owner.toB256() },
        ];
        const expectedBurnableAssets = 1;

        const burnableAssets = getBurnableAssetCount({ inputs, outputs });

        expect(burnableAssets).toBe(expectedBurnableAssets);
      });

      it('should get the number of burnable assets [2]', () => {
        const inputs: TransactionRequestInput[] = [
          generateFakeRequestInputCoin({ assetId: ASSET_A, owner: owner.toB256() }),
          generateFakeRequestInputCoin({ assetId: ASSET_B, owner: owner.toB256() }),
        ];
        const outputs: TransactionRequestOutput[] = [];
        const expectedBurnableAssets = 2;

        const burnableAssets = getBurnableAssetCount({ inputs, outputs });

        expect(burnableAssets).toBe(expectedBurnableAssets);
      });
    });

    describe('validateTransactionForAssetBurn', () => {
      it('should successfully validate transactions without burnable assets [enableAssetBurn=false]', () => {
        const inputs: TransactionRequestInput[] = [
          generateFakeRequestInputCoin({ assetId: ASSET_A, owner: owner.toB256() }),
          generateFakeRequestInputCoin({ assetId: ASSET_B, owner: owner.toB256() }),
        ];
        const outputs: TransactionRequestOutput[] = [
          { type: OutputType.Change, assetId: ASSET_A, to: owner.toB256() },
          { type: OutputType.Change, assetId: ASSET_B, to: owner.toB256() },
        ];
        const enableAssetBurn = false;

        const burnableAssets = validateTransactionForAssetBurn(
          { inputs, outputs },
          enableAssetBurn
        );

        expect(burnableAssets).toBeUndefined();
      });

      it('should throw an error if transaction has burnable assets [enableAssetBurn=false]', async () => {
        const inputs: TransactionRequestInput[] = [
          generateFakeRequestInputCoin({ assetId: ASSET_A, owner: owner.toB256() }),
          generateFakeRequestInputCoin({ assetId: ASSET_B, owner: owner.toB256() }),
        ];
        const outputs: TransactionRequestOutput[] = [
          { type: OutputType.Change, assetId: ASSET_A, to: owner.toB256() },
        ];
        const enableAssetBurn = false;

        await expectToThrowFuelError(
          () => validateTransactionForAssetBurn({ inputs, outputs }, enableAssetBurn),
          new FuelError(
            ErrorCode.ASSET_BURN_DETECTED,
            [
              `Asset burn detected.`,
              `Add the relevant change outputs to the transaction to avoid burning assets.`,
              `Or enable asset burn, upon sending the transaction.`,
            ].join('\n')
          )
        );
      });

      it('should successfully validate transactions with burnable assets [enableAssetBurn=true]', () => {
        const inputs: TransactionRequestInput[] = [
          generateFakeRequestInputCoin({ assetId: ASSET_A, owner: owner.toB256() }),
          generateFakeRequestInputCoin({ assetId: ASSET_B, owner: owner.toB256() }),
        ];
        const outputs: TransactionRequestOutput[] = [];
        const enableAssetBurn = true;

        const burnableAssets = validateTransactionForAssetBurn(
          { inputs, outputs },
          enableAssetBurn
        );

        expect(burnableAssets).toBeUndefined();
      });

      it('should validate asset burn by default [enableAssetBurn=undefined]', async () => {
        const inputs: TransactionRequestInput[] = [
          generateFakeRequestInputCoin({ assetId: ASSET_A, owner: owner.toB256() }),
          generateFakeRequestInputCoin({ assetId: ASSET_B, owner: owner.toB256() }),
        ];
        const outputs: TransactionRequestOutput[] = [];

        await expectToThrowFuelError(
          () => validateTransactionForAssetBurn({ inputs, outputs }),
          new FuelError(
            ErrorCode.ASSET_BURN_DETECTED,
            [
              `Asset burn detected.`,
              `Add the relevant change outputs to the transaction to avoid burning assets.`,
              `Or enable asset burn, upon sending the transaction.`,
            ].join('\n')
          )
        );
      });
    });
  });
});
