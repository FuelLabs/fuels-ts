import { Address } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { bn, toNumber } from '@fuel-ts/math';
import { PolicyType, TransactionType, UpgradePurposeTypeEnum } from '@fuel-ts/transactions';
import { concat, hexlify } from '@fuel-ts/utils';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';

import { WalletUnlocked } from '../../wallet';
import type { Coin } from '../coin';
import type { CoinQuantity } from '../coin-quantity';
import Provider from '../provider';

import type { CoinTransactionRequestInput } from './input';
import { ScriptTransactionRequest } from './script-transaction-request';
import { BaseTransactionRequest } from './transaction-request';
import type { TransactionRequestLike } from './types';
import type { UpgradeTransactionRequest } from './upgrade-transaction-request';
import type { UploadTransactionRequest } from './upload-transaction-request';
import { transactionRequestify } from './utils';

/**
 * @group node
 */
describe('TransactionRequest', () => {
  it('should correctly map all the coin outputs to CoinQuantity', () => {
    const transactionRequest = new ScriptTransactionRequest();

    const address1 = Address.fromRandom();
    const address2 = Address.fromRandom();

    const amount1 = 100;
    const amount2 = 300;

    transactionRequest.addCoinOutput(address1, amount1, ASSET_B);
    transactionRequest.addCoinOutput(address2, amount2, ASSET_A);

    const result = transactionRequest.getCoinOutputsQuantities();

    expect(result).toEqual([
      {
        amount: bn(amount1),
        assetId: ASSET_B,
      },
      {
        amount: bn(amount2),
        assetId: ASSET_A,
      },
    ]);
  });

  it('should return an empty array if there are no coin outputs', () => {
    const transactionRequest = new ScriptTransactionRequest();

    const result = transactionRequest.getCoinOutputsQuantities();

    expect(result).toEqual([]);
  });

  it('should fund with the expected quantities', () => {
    const transactionRequest = new ScriptTransactionRequest();

    const baseAssetId = ZeroBytes32;

    const amountBase = bn(500);
    const amountA = bn(700);
    const amountB = bn(300);

    const quantities: CoinQuantity[] = [
      { assetId: baseAssetId, amount: amountBase },
      { assetId: ASSET_A, amount: amountA },
      { assetId: ASSET_B, amount: amountB },
    ];

    transactionRequest.fundWithFakeUtxos(quantities, baseAssetId);

    const inputs = transactionRequest.inputs as CoinTransactionRequestInput[];

    const inputA = inputs.find((i) => i.assetId === ASSET_A);
    const inputB = inputs.find((i) => i.assetId === ASSET_B);
    const inputBase = inputs.find((i) => i.assetId === baseAssetId);

    expect(inputA?.amount).toEqual(bn(700));
    expect(inputB?.amount).toEqual(bn(300));
    expect(inputBase?.amount).toEqual(bn('1000000000000000000'));
  });

  it('updates witnesses', () => {
    const transactionRequest = new ScriptTransactionRequest();
    const coinOwner = Address.fromRandom();
    const coin: Coin = {
      id: hexlify(randomBytes(32)),
      owner: coinOwner,
      amount: bn(100),
      assetId: ASSET_A,
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    };
    const mockSignedTx = hexlify(randomBytes(32));

    expect(transactionRequest.witnesses.length).toEqual(0);
    expect(transactionRequest.witnesses).toStrictEqual([]);

    transactionRequest.addCoinInput(coin);

    expect(transactionRequest.witnesses.length).toEqual(1);
    expect(transactionRequest.witnesses).toStrictEqual([concat([ZeroBytes32, ZeroBytes32])]);

    transactionRequest.addWitness(mockSignedTx);

    expect(transactionRequest.witnesses.length).toEqual(2);
    expect(transactionRequest.witnesses).toStrictEqual([
      concat([ZeroBytes32, ZeroBytes32]),
      mockSignedTx,
    ]);

    transactionRequest.updateWitness(0, mockSignedTx);

    expect(transactionRequest.witnesses.length).toEqual(2);
    expect(transactionRequest.witnesses).toStrictEqual([mockSignedTx, mockSignedTx]);
  });

  it('adds account based witnesses', async () => {
    class ProviderCustom extends Provider {
      override async getChainId(): Promise<number> {
        return Promise.resolve(1);
      }
    }

    const provider = new ProviderCustom('http://example.com');
    const signer = WalletUnlocked.generate({ provider });
    const txRequest = new ScriptTransactionRequest();

    const createWitnessSpy = vi.spyOn(txRequest, 'addWitness');
    const signTxSpy = vi.spyOn(signer, 'signTransaction');

    expect(txRequest.witnesses.length).toEqual(0);

    await txRequest.addAccountWitnesses(signer);

    expect(txRequest.witnesses.length).toEqual(1);
    expect(signTxSpy).toHaveBeenCalledTimes(1);
    expect(createWitnessSpy).toHaveBeenCalledTimes(1);

    await txRequest.addAccountWitnesses([signer, signer, signer, signer, signer, signer]);

    expect(txRequest.witnesses.length).toEqual(7);
    expect(signTxSpy).toHaveBeenCalledTimes(7);
    expect(createWitnessSpy).toHaveBeenCalledTimes(7);
  });

  describe('getPolicyMeta', () => {
    it('should return MaxFee policy by default', () => {
      const txRequest = new ScriptTransactionRequest({
        maxFee: 1000,
      });

      const result = BaseTransactionRequest.getPolicyMeta(txRequest);

      expect(result.policyTypes).toBe(PolicyType.MaxFee);
      expect(result.policies).toHaveLength(1);
      expect(result.policies[0]).toEqual({
        type: PolicyType.MaxFee,
        data: bn(1000),
      });
    });

    it('should include Owner policy when ownerInputIndex is provided', () => {
      const txRequest = new ScriptTransactionRequest({
        maxFee: 1000,
        ownerInputIndex: 5,
      });

      const result = BaseTransactionRequest.getPolicyMeta(txRequest);

      expect(result.policyTypes).toBe(PolicyType.MaxFee + PolicyType.Owner);
      expect(result.policies).toHaveLength(2);

      const maxFeePolicy = result.policies.find((p) => p.type === PolicyType.MaxFee);
      expect(maxFeePolicy?.data.toNumber()).toBe(1000);

      const ownerPolicy = result.policies.find((p) => p.type === PolicyType.Owner);
      expect(ownerPolicy?.data.toNumber()).toBe(5);
    });

    it('should not include Owner policy when ownerInputIndex is undefined', () => {
      const txRequest = new ScriptTransactionRequest({
        maxFee: 1000,
        ownerInputIndex: undefined,
      });

      const result = BaseTransactionRequest.getPolicyMeta(txRequest);

      expect(result.policyTypes).toBe(PolicyType.MaxFee);
      expect(result.policies).toHaveLength(1);
      expect(result.policies[0].type).not.toBe(PolicyType.Owner);
    });

    it('should include Owner policy with tip and other policies', () => {
      const txRequest = new ScriptTransactionRequest({
        maxFee: 2000,
        tip: 100,
        ownerInputIndex: 3,
        maturity: 10,
      });

      const result = BaseTransactionRequest.getPolicyMeta(txRequest);

      expect(result.policyTypes).toBe(
        PolicyType.MaxFee + PolicyType.Tip + PolicyType.Maturity + PolicyType.Owner
      );
      expect(result.policies).toHaveLength(4);

      const maxFeePolicy = result.policies.find((p) => p.type === PolicyType.MaxFee);
      expect(maxFeePolicy?.data.toNumber()).toBe(2000);

      const tipPolicy = result.policies.find((p) => p.type === PolicyType.Tip);
      expect(tipPolicy?.data.toNumber()).toBe(100);

      const maturityPolicy = result.policies.find((p) => p.type === PolicyType.Maturity);
      expect(maturityPolicy?.data).toBe(10);

      const ownerPolicy = result.policies.find((p) => p.type === PolicyType.Owner);
      expect(ownerPolicy?.data.toNumber()).toBe(3);
    });

    it('should include Owner policy with all possible policies', () => {
      const txRequest = new ScriptTransactionRequest({
        maxFee: 2000,
        tip: 100,
        ownerInputIndex: 2,
        maturity: 10,
        expiration: 100,
        witnessLimit: 500,
      });

      const result = BaseTransactionRequest.getPolicyMeta(txRequest);

      expect(result.policyTypes).toBe(
        PolicyType.MaxFee +
          PolicyType.Tip +
          PolicyType.Maturity +
          PolicyType.Expiration +
          PolicyType.WitnessLimit +
          PolicyType.Owner
      );
      expect(result.policies).toHaveLength(6);

      // Check that all policy types are present
      const policyTypes = result.policies.map((p) => p.type);
      expect(policyTypes).toContain(PolicyType.MaxFee);
      expect(policyTypes).toContain(PolicyType.Tip);
      expect(policyTypes).toContain(PolicyType.Maturity);
      expect(policyTypes).toContain(PolicyType.Expiration);
      expect(policyTypes).toContain(PolicyType.WitnessLimit);
      expect(policyTypes).toContain(PolicyType.Owner);

      // Check the values
      const maxFeePolicy = result.policies.find((p) => p.type === PolicyType.MaxFee);
      expect(maxFeePolicy?.data.toNumber()).toBe(2000);

      const tipPolicy = result.policies.find((p) => p.type === PolicyType.Tip);
      expect(tipPolicy?.data.toNumber()).toBe(100);

      const maturityPolicy = result.policies.find((p) => p.type === PolicyType.Maturity);
      expect(maturityPolicy?.data).toBe(10);

      const expirationPolicy = result.policies.find((p) => p.type === PolicyType.Expiration);
      expect(expirationPolicy?.data).toBe(100);

      const witnessLimitPolicy = result.policies.find((p) => p.type === PolicyType.WitnessLimit);
      expect(witnessLimitPolicy?.data.toNumber()).toBe(500);

      const ownerPolicy = result.policies.find((p) => p.type === PolicyType.Owner);
      expect(ownerPolicy?.data.toNumber()).toBe(2);
    });

    it('should handle ownerInputIndex with different numeric values', () => {
      const testCases = [1, 10, 100, 255, 1000, 65535];

      testCases.forEach((ownerInputIndex) => {
        const txRequest = new ScriptTransactionRequest({
          maxFee: 1000,
          ownerInputIndex,
        });

        const result = BaseTransactionRequest.getPolicyMeta(txRequest);

        const ownerPolicy = result.policies.find((p) => p.type === PolicyType.Owner);
        expect(ownerPolicy).toBeDefined();
        expect(ownerPolicy?.data.toNumber()).toBe(ownerInputIndex);
      });
    });

    it('should serialize ownerInputIndex as BN in owner policy', () => {
      const txRequest = new ScriptTransactionRequest({
        maxFee: 1000,
        ownerInputIndex: 999,
      });

      const result = BaseTransactionRequest.getPolicyMeta(txRequest);

      const ownerPolicy = result.policies.find((p) => p.type === PolicyType.Owner);
      expect(ownerPolicy).toBeDefined();
      expect(ownerPolicy?.type).toBe(PolicyType.Owner);
      expect(ownerPolicy?.data.toNumber()).toBe(999);
      expect(ownerPolicy?.data.constructor.name).toBe('BN');
    });
  });
});

describe('transactionRequestify', () => {
  it('should keep data from input in transaction request created [script]', () => {
    const script = Uint8Array.from([1, 2, 3, 4]);
    const scriptData = Uint8Array.from([5, 6]);
    const txRequestLike: TransactionRequestLike = {
      type: TransactionType.Script,
      script,
      scriptData,
      tip: 1,
      gasLimit: 10000,
      maturity: 1,
      inputs: [],
      outputs: [],
      witnesses: [],
    };
    const txRequest = transactionRequestify(txRequestLike);

    if (txRequest.type === TransactionType.Script) {
      expect(txRequest.script).toEqual(txRequestLike.script);
      expect(txRequest.scriptData).toEqual(txRequestLike.scriptData);
    }

    expect(txRequest.type).toEqual(txRequestLike.type);
    expect(txRequest.tip?.toNumber()).toEqual(txRequestLike.tip);
    expect(toNumber((<ScriptTransactionRequest>txRequest).gasLimit)).toEqual(
      txRequestLike.gasLimit
    );
    expect(txRequest.maturity).toEqual(txRequestLike.maturity);
    expect(txRequest.inputs).toEqual(txRequestLike.inputs);
    expect(txRequest.outputs).toEqual(txRequestLike.outputs);
    expect(txRequest.witnesses).toEqual(txRequestLike.witnesses);
  });

  it('should throw error if unsupported transaction type', () => {
    const txRequestLike = {
      type: 1234,
    };

    expect(() => transactionRequestify(txRequestLike)).toThrow(
      'Unsupported transaction type: 1234'
    );
  });

  it('should keep data from input in transaction request created [create]', () => {
    const txRequestLike: TransactionRequestLike = {
      type: TransactionType.Create,
      bytecodeWitnessIndex: 1,
      storageSlots: [],
      salt: '0x1234',
      tip: 1,
      maturity: 1,
      inputs: [],
      outputs: [],
      witnesses: [],
    };
    const txRequest = transactionRequestify(txRequestLike);

    if (txRequest.type === TransactionType.Create) {
      expect(txRequest.bytecodeWitnessIndex).toEqual(txRequestLike.bytecodeWitnessIndex);
      expect(txRequest.salt).toEqual(txRequestLike.salt);
      expect(txRequest.storageSlots).toEqual(txRequestLike.storageSlots);
    }

    expect(txRequest.type).toEqual(txRequestLike.type);
    expect(txRequest.tip?.toNumber()).toEqual(txRequestLike.tip);
    expect(txRequest.maturity).toEqual(txRequestLike.maturity);
    expect(txRequest.inputs).toEqual(txRequestLike.inputs);
    expect(txRequest.outputs).toEqual(txRequestLike.outputs);
    expect(txRequest.witnesses).toEqual(txRequestLike.witnesses);
  });

  it('should keep data from input in transaction request created [blob]', () => {
    const txRequestLike: TransactionRequestLike = {
      type: TransactionType.Blob,
      blobId: '0x1234',
      witnessIndex: 1,
      tip: 1,
      maturity: 1,
      inputs: [],
      outputs: [],
      witnesses: [],
    };
    const txRequest = transactionRequestify(txRequestLike);

    if (txRequest.type === TransactionType.Blob) {
      expect(txRequest.blobId).toEqual(txRequestLike.blobId);
      expect(txRequest.witnessIndex).toEqual(txRequestLike.witnessIndex);
    }

    expect(txRequest.type).toEqual(txRequestLike.type);
    expect(txRequest.tip?.toNumber()).toEqual(txRequestLike.tip);
    expect(txRequest.maturity).toEqual(txRequestLike.maturity);
    expect(txRequest.inputs).toEqual(txRequestLike.inputs);
    expect(txRequest.outputs).toEqual(txRequestLike.outputs);
    expect(txRequest.witnesses).toEqual(txRequestLike.witnesses);
  });

  it('should keep data from input in transaction request created [upgrade]', () => {
    const txRequestLike: TransactionRequestLike = {
      type: TransactionType.Upgrade,
      inputs: [],
      outputs: [],
      bytecodeWitnessIndex: 0,
      upgradePurpose: {
        type: UpgradePurposeTypeEnum.ConsensusParameters,
        checksum: ZeroBytes32,
      },
    };

    const txRequest = transactionRequestify(txRequestLike) as UpgradeTransactionRequest;

    expect(txRequest.upgradePurpose).toEqual(txRequestLike.upgradePurpose);
    expect(txRequest.bytecodeWitnessIndex).toEqual(txRequestLike.bytecodeWitnessIndex);
    expect(txRequest.upgradePurpose.type).toEqual(txRequestLike.upgradePurpose?.type);
    expect(txRequest.type).toEqual(txRequestLike.type);
  });

  it('should keep data from input in transaction request created [upload]', () => {
    const txRequestLike: TransactionRequestLike = {
      type: TransactionType.Upload,
      inputs: [],
      outputs: [],
      witnessIndex: 0,
      subsection: {
        root: ZeroBytes32,
        subsectionIndex: 0,
        subsectionsNumber: 1,
        proofSet: [],
      },
    };

    const txRequest = transactionRequestify(txRequestLike) as UploadTransactionRequest;

    expect(txRequest.subsection).toEqual(txRequestLike.subsection);
    expect(txRequest.witnessIndex).toEqual(txRequestLike.witnessIndex);
    expect(txRequest.type).toEqual(txRequestLike.type);
  });
});
