import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { WalletUnlocked } from 'fuels';
import { BaseAssetId, ContractFactory, toNumber, Contract, Provider, Predicate } from 'fuels';
import { join } from 'path';

import contractAbi from '../../fixtures/forc-projects/call-test-contract/out/debug/call-test-abi.json';
import liquidityPoolAbi from '../../fixtures/forc-projects/liquidity-pool/out/debug/liquidity-pool-abi.json';
import predicateAbiMainArgsStruct from '../../fixtures/forc-projects/predicate-main-args-struct/out/debug/predicate-main-args-struct-abi.json';
import predicateBytesStruct from '../../fixtures/forc-projects/predicate-struct';
import predicateBytesTrue from '../../fixtures/forc-projects/predicate-true';
import type { Validation } from '../types/predicate';

import { fundPredicate, setupContractWithConfig } from './utils/predicate';

const contractBytes = readFileSync(
  join(__dirname, '../../fixtures/forc-projects/call-test-contract/out/debug/call-test.bin')
);

const liquidityPoolBytes = readFileSync(
  join(__dirname, '../../fixtures/forc-projects/liquidity-pool/out/debug/liquidity-pool.bin')
);

describe('Predicate', () => {
  describe('With Contract', () => {
    let wallet: WalletUnlocked;
    let receiver: WalletUnlocked;
    let provider: Provider;

    beforeEach(async () => {
      provider = await Provider.connect('http://127.0.0.1:4000/graphql');
      wallet = await generateTestWallet(provider, [[1_000_000, BaseAssetId]]);
      receiver = await generateTestWallet(provider);
    });

    it('calls a predicate from a contract function', async () => {
      const setupContract = setupContractWithConfig({
        contractBytecode: contractBytes,
        abi: contractAbi,
        cache: true,
      });
      const contract = await setupContract();
      const amountToPredicate = 100_000;
      const chainId = await wallet.provider.getChainId();
      const predicate = new Predicate<[Validation]>(
        predicateBytesTrue,
        chainId,
        provider,
        predicateAbiMainArgsStruct
      );
      // Create a instance of the contract with the predicate as the caller Account
      const contractPredicate = new Contract(contract.id, contract.interface, predicate);
      const predicateBalance = await fundPredicate(wallet, predicate, amountToPredicate);

      const { value } = await contractPredicate.functions
        .return_context_amount()
        .callParams({
          forward: [500, BaseAssetId],
        })
        .call();

      expect(value.toString()).toEqual('500');

      const finalPredicateBalance = await predicate.getBalance();
      expect(finalPredicateBalance.lt(predicateBalance)).toBeTruthy();
    });

    it('calls a predicate and uses proceeds for a contract call', async () => {
      const initialReceiverBalance = toNumber(await receiver.getBalance());

      const contract = await new ContractFactory(
        liquidityPoolBytes,
        liquidityPoolAbi,
        wallet
      ).deployContract();

      // calling the contract with the receiver account (no resources)
      contract.account = receiver;
      await expect(
        contract.functions
          .deposit({
            value: receiver.address.toB256(),
          })
          .callParams({
            forward: [100, BaseAssetId],
          })
          .txParams({
            gasPrice: 1,
          })
          .call()
      ).rejects.toThrow(/not enough coins to fit the target/);

      // setup predicate
      const amountToPredicate = 100;
      const amountToReceiver = 50;
      const chainId = await wallet.provider.getChainId();
      const predicate = new Predicate<[Validation]>(
        predicateBytesStruct,
        chainId,
        provider,
        predicateAbiMainArgsStruct
      );
      const initialPredicateBalance = toNumber(await predicate.getBalance());

      await fundPredicate(wallet, predicate, amountToPredicate);

      expect(toNumber(await predicate.getBalance())).toEqual(
        initialPredicateBalance + amountToPredicate
      );

      // executing predicate to transfer resources to receiver
      const tx = await predicate
        .setData({
          has_account: true,
          total_complete: 100,
        })
        .transfer(receiver.address, amountToReceiver);

      await tx.waitForResult();

      // calling the contract with the receiver account (with resources)
      const gasPrice = 1;
      const contractAmount = 10;

      await contract.functions.set_base_token(BaseAssetId).call();
      await expect(
        contract.functions
          .deposit({
            value: receiver.address.toB256(),
          })
          .callParams({
            forward: [contractAmount, BaseAssetId],
          })
          .txParams({
            gasPrice,
          })
          .call()
      ).resolves.toBeTruthy();

      const finalReceiverBalance = toNumber(await receiver.getBalance());
      const remainingPredicateBalance = toNumber(await predicate.getBalance());

      expect(initialReceiverBalance).toBe(0);

      expect(initialReceiverBalance + amountToReceiver).toEqual(
        finalReceiverBalance + contractAmount + gasPrice
      );

      expect(remainingPredicateBalance).toEqual(
        amountToPredicate + initialPredicateBalance - amountToReceiver
      );
    });
  });
});
