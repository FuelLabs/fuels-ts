import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { BN, Provider } from 'fuels';
import { Wallet, ContractFactory, bn, BaseAssetId } from 'fuels';
import { join } from 'path';

import abi from '../fixtures/forc-projects/multi-token-contract/out/debug/multi-token-contract-abi.json';

const setup = async (provider: Provider) => {
  // Create wallet
  const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

  // Deploy contract
  const bytecode = readFileSync(
    join(
      __dirname,
      '../fixtures/forc-projects/multi-token-contract/out/debug/multi-token-contract.bin'
    )
  );
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract();

  return contract;
};

// hardcoded subIds on MultiTokenContract
const subIds = [
  '0x4a778acfad1abc155a009dc976d2cf0db6197d3d360194d74b1fb92b96986b00',
  '0x0d000e76a67758bbc6861d48ca571876cd480d9df8cf4dfa635c168e1e97f324',
  '0xdf78cb1e1a1b31fff104eb0baf734a4767a1b1373687c29a26bf1a2b22d1a3c5',
];

describe('MultiTokenContract', () => {
  it('can mint and transfer coins', async () => {
    using provider = await setupTestProvider();
    // New wallet to transfer coins and check balance
    const userWallet = Wallet.generate({ provider });
    const multiTokenContract = await setup(provider);
    const contractId = { value: multiTokenContract.id.toB256() };

    const helperDict: { [key: string]: { assetId: string; amount: number } } = {
      [subIds[0]]: {
        assetId: '',
        amount: 100,
      },
      [subIds[1]]: {
        assetId: '',
        amount: 300,
      },
      [subIds[2]]: {
        assetId: '',
        amount: 400,
      },
    };

    // mint some coins of the 3 subIds on MultiTokenContract
    const { transactionResult } = await multiTokenContract
      .multiCall(
        subIds.map((subId) =>
          multiTokenContract.functions.mint_coins(subId, helperDict[subId].amount)
        )
      )
      .call();

    // update assetId on helperDict object
    (transactionResult?.mintedAssets || []).forEach(({ subId, assetId }) => {
      helperDict[subId].assetId = assetId || '';
    });

    // define helper to get contract balance
    const getBalance = async (address: { value: string }, assetId: string) => {
      const { value } = await multiTokenContract.functions
        .get_balance(address, assetId)
        .simulate<BN>();
      return value;
    };

    // validates contract has expected balance after mint
    subIds.forEach(async (subId) => {
      expect(bn(await getBalance(contractId, helperDict[subId].assetId)).toNumber()).toBe(
        helperDict[subId].amount
      );
    });

    // transfer coins to user wallet
    await multiTokenContract
      .multiCall(
        subIds.map((subId) =>
          multiTokenContract.functions.transfer_coins_to_output(
            { value: userWallet.address },
            helperDict[subId].assetId,
            helperDict[subId].amount
          )
        )
      )
      .call();

    subIds.forEach(async (subId) => {
      // validates that user wallet has expected balance after transfer
      expect(bn(await userWallet.getBalance(helperDict[subId].assetId)).toNumber()).toBe(
        helperDict[subId].amount
      );

      // validates contract has not balance after transfer
      expect(bn(await getBalance(contractId, helperDict[subId].assetId)).toNumber()).toBe(0);
    });
  });

  it('can burn coins', async () => {
    using provider = await setupTestProvider();
    const multiTokenContract = await setup(provider);
    const contractId = { value: multiTokenContract.id.toB256() };

    const helperDict: {
      [key: string]: {
        assetId: string;
        amount: number;
        amountToBurn: number;
      };
    } = {
      [subIds[0]]: {
        assetId: '',
        amount: 100,
        amountToBurn: 20,
      },
      [subIds[1]]: {
        assetId: '',
        amount: 300,
        amountToBurn: 180,
      },
      [subIds[2]]: {
        assetId: '',
        amount: 400,
        amountToBurn: 344,
      },
    };

    // mint some coins of the 3 subIds on MultiTokenContract
    const { transactionResult } = await multiTokenContract
      .multiCall(
        subIds.map((subId) =>
          multiTokenContract.functions.mint_coins(subId, helperDict[subId].amount)
        )
      )
      .call();

    // update assetId on helperDict object
    (transactionResult?.mintedAssets || []).forEach(({ subId, assetId }) => {
      helperDict[subId].assetId = assetId || '';
    });

    // define helper to get contract balance
    const getBalance = async (address: { value: string }, assetId: string) => {
      const { value } = await multiTokenContract.functions
        .get_balance(address, assetId)
        .simulate<BN>();
      return value;
    };

    // validates contract has expected balance after mint
    subIds.forEach(async (subId) => {
      expect(bn(await getBalance(contractId, helperDict[subId].assetId)).toNumber()).toBe(
        helperDict[subId].amount
      );
    });

    // burning coins
    await multiTokenContract
      .multiCall(
        subIds.map((subId) =>
          multiTokenContract.functions.burn_coins(subId, helperDict[subId].amountToBurn)
        )
      )
      .call();

    subIds.forEach(async (subId) => {
      // validates contract has expected balance for each coin after burn
      expect(bn(await getBalance(contractId, helperDict[subId].assetId)).toNumber()).toBe(
        helperDict[subId].amount - helperDict[subId].amountToBurn
      );
    });
  });
});
