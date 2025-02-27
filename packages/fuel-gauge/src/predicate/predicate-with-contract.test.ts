import { Contract, ErrorCode, FuelError, Wallet } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { CallTestContractFactory, TokenContractFactory } from '../../test/typegen/contracts';
import { PredicateMainArgsStruct, PredicateTrue } from '../../test/typegen/predicates';

import { fundAccount } from './utils/predicate';

/**
 * @group node
 * @group browser
 */
describe('Predicate', () => {
  describe('With Contract', () => {
    it('calls a predicate from a contract function', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [{ factory: CallTestContractFactory }],
      });

      const {
        contracts: [contract],
        provider,
        wallets: [wallet],
      } = launched;

      const amountToPredicate = 300_000;
      const predicate = new PredicateTrue({ provider });

      // Create a instance of the contract with the predicate as the caller Account
      const contractPredicate = new Contract(contract.id, contract.interface, predicate);
      await fundAccount(wallet, predicate, amountToPredicate);

      const { waitForResult } = await contractPredicate.functions
        .return_context_amount()
        .callParams({
          forward: [500, await provider.getBaseAssetId()],
        })
        .call();

      const { value, transactionResult } = await waitForResult();

      expect(value.toString()).toEqual('500');
      expect(transactionResult.isStatusSuccess).toBeTruthy();
    });

    it('calls a predicate and uses proceeds for a contract call', async () => {
      using launched = await launchTestNode({
        contractsConfigs: [{ factory: TokenContractFactory }],
      });

      const {
        contracts: [contract],
        provider,
        wallets: [wallet],
      } = launched;

      const receiver = Wallet.generate({ provider });
      const receiverInitialBalance = await receiver.getBalance();

      // calling the contract with the receiver account (no resources)
      contract.account = receiver;

      await expectToThrowFuelError(
        () => contract.functions.mint_coins(200).call(),
        new FuelError(
          ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
          `Insufficient funds or too many small value coins. Consider combining UTXOs.`
        )
      );

      // setup predicate
      const amountToPredicate = 1_000_000;
      const amountToReceiver = 200_000;
      const predicate = new PredicateMainArgsStruct({
        provider,
        data: [
          {
            has_account: true,
            total_complete: 100,
          },
        ],
      });

      await fundAccount(wallet, predicate, amountToPredicate);

      // executing predicate to transfer resources to receiver
      const tx = await predicate.transfer(
        receiver.address,
        amountToReceiver,
        await provider.getBaseAssetId()
      );
      const { isStatusSuccess } = await tx.waitForResult();
      expect(isStatusSuccess).toBeTruthy();

      const receiverFinalBalance = await receiver.getBalance();
      expect(receiverFinalBalance.gt(receiverInitialBalance)).toBeTruthy();

      const call = await contract.functions.mint_coins(200).call();
      const { transactionResult } = await call.waitForResult();

      expect(transactionResult.isStatusSuccess).toBeTruthy();
    });
  });
});
