import { Address } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { bn, toNumber } from '@fuel-ts/math';
import { TransactionType, UpgradePurposeTypeEnum } from '@fuel-ts/transactions';
import { concat, hexlify } from '@fuel-ts/utils';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';

import { WalletUnlocked } from '../../wallet';
import type { Coin } from '../coin';
import type { CoinQuantity } from '../coin-quantity';
import Provider from '../provider';

import type { CoinTransactionRequestInput } from './input';
import { ScriptTransactionRequest } from './script-transaction-request';
import type { TransactionRequestLike } from './types';
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
      // eslint-disable-next-line @typescript-eslint/require-await
      static async create(url: string) {
        return new ProviderCustom(url, {});
      }

      getChainId(): number {
        return 1;
      }
    }

    const provider = await ProviderCustom.create('nope');
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

    const txRequest = transactionRequestify(txRequestLike);

    if (
      txRequest.type === TransactionType.Upgrade &&
      txRequest.upgradePurpose.type === UpgradePurposeTypeEnum.ConsensusParameters &&
      txRequestLike.upgradePurpose?.type === UpgradePurposeTypeEnum.ConsensusParameters
    ) {
      expect(txRequest.upgradePurpose).toEqual(txRequestLike.upgradePurpose);
      expect(txRequest.bytecodeWitnessIndex).toEqual(0);
      expect(txRequest.upgradePurpose.checksum).toEqual(txRequestLike.upgradePurpose!.checksum);
    }

    expect(txRequest.type).toEqual(txRequestLike.type);
  });
});
