import { randomInt } from 'crypto';
import {
  bn,
  ErrorCode,
  ScriptTransactionRequest,
  Wallet,
  getAllCoins,
  consolidateCoins,
} from 'fuels';
import type { Account, CoinQuantity, Provider, WalletUnlocked } from 'fuels';
import { expectToThrowFuelError, launchTestNode, TestAssetId } from 'fuels/test-utils';

import {
  CallTestContractFactory,
  PredicateMultiArgs,
  ScriptMainArgBool,
  TokenContractFactory,
  TransferContractFactory,
} from '../test/typegen';

const seedWallet = async (opts: {
  adminWallet: WalletUnlocked;
  wallet: Account;
  coins: CoinQuantity[];
}) => {
  const { adminWallet, wallet, coins } = opts;
  const maxOutputs = 253;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const request = new ScriptTransactionRequest({
      scriptData: '0x',
    });

    while (request.outputs.length < maxOutputs) {
      const coin = coins.shift();
      if (!coin) {
        break;
      }
      request.addCoinOutput(wallet.address, coin.amount, coin.assetId);
    }

    await request.estimateAndFund(adminWallet);
    const transfer = await adminWallet.sendTransaction(request);
    await transfer.waitForResult();

    if (coins.length === 0) {
      break;
    }
  }
};

describe('Consolidate coins', { timeout: 1000000 }, () => {
  const MIN_COINS = 500;
  const MAX_COINS = 1000;

  const setupTest = async (opts: {
    account: ({ provider }: { provider: Provider }) => Account;
    coins: (opts: { baseAssetId: string; nonBaseAssetId: string }) => CoinQuantity[];
  }) => {
    const { account, coins } = opts;
    const launched = await launchTestNode({
      nodeOptions: { args: ['--starting-gas-price', '2500'] },
    });
    const {
      provider,
      wallets: [adminWallet],
    } = launched;

    const chain = await provider.getChain();
    const maxInputs = chain.consensusParameters.txParameters.maxInputs;
    const baseAssetId = await provider.getBaseAssetId();
    const nonBaseAssetId = TestAssetId.A.value;

    const accountToSeed = account({ provider });

    await seedWallet({
      adminWallet,
      wallet: accountToSeed,
      coins: coins({ baseAssetId, nonBaseAssetId }),
    });

    return {
      provider,
      account: accountToSeed,
      baseAssetId,
      nonBaseAssetId,
      maxInputs: maxInputs.toNumber(),
      [Symbol.dispose]: () => launched.cleanup(),
    };
  };

  const happyAccounts: Record<string, (opts: { provider: Provider }) => Account> = {
    // Simple Wallet
    'wallet-unlocked': Wallet.generate,
    // Valid predicate with multi args
    'predicate-multi-args': (opts) =>
      new PredicateMultiArgs({ provider: opts.provider, data: [12, 31] }),
    // Simple Fuel Connector
    // TODO: Reimplement MockConnector
    // 'fuel-connector': (opts) => {
    //   const wallet = Wallet.generate({ provider: opts.provider });
    //   const mockConnector = new MockConnector({ wallets: [wallet] });
    //   const fuel = new Fuel({
    //     connectors: [mockConnector],
    //   });
    //   return new Account(wallet.address, opts.provider, fuel);
    // },
    // Predicate Fuel Connector
  };

  const unhappyAccounts: Record<string, (opts: { provider: Provider }) => Account> = {
    // Locked wallet
    'wallet-locked': (opts) => Wallet.generate({ provider: opts.provider }).lock(),
    // Invalid predicate with multi args
    'predicate-multi-args-invalid': (opts) =>
      new PredicateMultiArgs({ provider: opts.provider, data: [12, 12] }),
  };

  // Simple manual consolidations
  describe.each(Object.entries(happyAccounts))(
    '[Simple manual consolidations: %s]',
    (_, account) => {
      it('Should consolidate base assets', async () => {
        using launched = await setupTest({
          account,
          coins: ({ baseAssetId }) => [
            ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
              assetId: baseAssetId,
              amount: bn(1),
            })),
            ...Array.from({ length: 1 }, () => ({ assetId: baseAssetId, amount: bn(1_000_000) })),
          ],
        });

        const { account: accountToConsolidate, baseAssetId, maxInputs } = launched;

        // Given we have more than the max inputs, we should consolidate
        const { coins: beforeConsolidation } = await getAllCoins(accountToConsolidate, baseAssetId);
        expect(beforeConsolidation.length).toBeGreaterThan(maxInputs);

        // When we consolidate
        const steps = await consolidateCoins({
          account: accountToConsolidate,
          assetId: baseAssetId,
        });
        await steps.submitAll();

        // Then we should have less than the max inputs
        const { coins: afterConsolidation } = await getAllCoins(accountToConsolidate, baseAssetId);
        expect(afterConsolidation.length).toBeLessThan(maxInputs);
      });

      it('Should consolidate non-base assets', async () => {
        using launched = await setupTest({
          account,
          coins: ({ nonBaseAssetId, baseAssetId }) => [
            ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
              assetId: nonBaseAssetId,
              amount: bn(1),
            })),
            ...Array.from({ length: 1 }, () => ({ assetId: baseAssetId, amount: bn(1_000_000) })),
          ],
        });
        const { account: accountToConsolidate, nonBaseAssetId, maxInputs } = launched;

        // Given we have more than the max inputs, we should consolidate
        const { coins: beforeConsolidation } = await getAllCoins(
          accountToConsolidate,
          nonBaseAssetId
        );
        expect(beforeConsolidation.length).toBeGreaterThan(maxInputs);

        // When we consolidate
        const collection = await consolidateCoins({
          account: accountToConsolidate,
          assetId: nonBaseAssetId,
        });
        await collection.submitAll();

        // Then we should have less than the max inputs
        const { coins: afterConsolidation } = await getAllCoins(
          accountToConsolidate,
          nonBaseAssetId
        );
        expect(afterConsolidation.length).toBeLessThan(maxInputs);
      });

      it('Should throw if the account has insufficient funds', async () => {
        using launched = await setupTest({
          account,
          coins: ({ baseAssetId }) => [
            // Only dust coins
            ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
              assetId: baseAssetId,
              amount: bn(1),
            })),
          ],
        });
        const { account: accountToConsolidate, baseAssetId } = launched;

        const collection = await consolidateCoins({
          account: accountToConsolidate,
          assetId: baseAssetId,
        });
        const call = () => collection.submitAll();

        await expectToThrowFuelError(call, {
          code: ErrorCode.FUNDS_TOO_LOW,
        });
      });
    }
  );

  // Failure cases
  describe.each(Object.entries(unhappyAccounts))('[Failure cases: %s]', (_, account) => {
    it('Should throw if unable to consolidate base assets', async () => {
      using launched = await setupTest({
        account,
        coins: ({ baseAssetId }) => [
          ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
            assetId: baseAssetId,
            amount: bn(100),
          })),
          ...Array.from({ length: 1 }, () => ({
            assetId: baseAssetId,
            amount: bn(1_000_000),
          })),
        ],
      });
      const { account: accountToConsolidate, baseAssetId } = launched;

      const collection = await consolidateCoins({
        account: accountToConsolidate,
        assetId: baseAssetId,
      });
      const call = () => collection.submitAll();

      await expect(call).rejects.toThrowError(/PredicateVerificationFailed|InputInvalidSignature/);
    });

    it('Should throw if unable to consolidate non-base assets', async () => {
      using launched = await setupTest({
        account,
        coins: ({ nonBaseAssetId, baseAssetId }) => [
          ...Array.from({ length: randomInt(MIN_COINS, MAX_COINS) }, () => ({
            assetId: nonBaseAssetId,
            amount: bn(100),
          })),
          ...Array.from({ length: 1 }, () => ({
            assetId: baseAssetId,
            amount: bn(1_000_000),
          })),
        ],
      });
      const { account: accountToConsolidate, nonBaseAssetId } = launched;

      const collection = await consolidateCoins({
        account: accountToConsolidate,
        assetId: nonBaseAssetId,
      });
      const call = () => collection.submitAll();

      await expect(call).rejects.toThrowError(/PredicateVerificationFailed|InputInvalidSignature/);
    });
  });

  // Automatic consolidations for base assets
  describe.each(Object.entries(happyAccounts))(
    '[Automatic consolidations for base assets: %s]',
    (_, account) => {
      const setupBaseAssetTest = (opts: {
        funding?: Partial<{ amount: number; count: number }>;
        dust?: Partial<{ amount: number; count: number }>;
      }) =>
        setupTest({
          account,
          coins: ({ baseAssetId }) => [
            ...Array.from({ length: opts.dust?.count ?? randomInt(MIN_COINS, MAX_COINS) }, () => ({
              assetId: baseAssetId,
              amount: bn(opts.dust?.amount ?? 1),
            })),
            ...Array.from({ length: opts.funding?.count ?? 1 }, () => ({
              assetId: baseAssetId,
              amount: bn(opts.funding?.amount ?? 1_000),
            })),
          ],
        });

      it('Should automatically consolidate [transfer-funds]', async () => {
        using launched = await setupBaseAssetTest({
          funding: { count: 0 },
          dust: { count: 1200, amount: 1_000 },
        });
        const { provider, account: accountToConsolidate, baseAssetId } = launched;
        const recipient = Wallet.generate({ provider });
        const startConsolidationSpy = vi.spyOn(accountToConsolidate, 'startConsolidation');

        const { waitForResult } = await accountToConsolidate.transfer(
          recipient.address,
          1_000_000,
          baseAssetId
        );

        const { isStatusSuccess } = await waitForResult();
        expect(isStatusSuccess).toBe(true);
        expect(startConsolidationSpy).toHaveBeenCalled();
      });

      it('Should automatically consolidate [transfer-to-contract]', async () => {
        using launched = await setupBaseAssetTest({
          funding: { count: 200, amount: 1000 },
          dust: { count: 2000, amount: 100 },
        });
        const { account: accountToConsolidate, baseAssetId } = launched;
        const deploy = await CallTestContractFactory.deploy(accountToConsolidate);
        const { contract } = await deploy.waitForResult();
        const startConsolidationSpy = vi.spyOn(accountToConsolidate, 'startConsolidation');

        const tx = await accountToConsolidate.transferToContract(contract.id, 200_000, baseAssetId);
        const { isStatusSuccess } = await tx.waitForResult();

        expect(isStatusSuccess).toBe(true);
        expect(startConsolidationSpy).toHaveBeenCalled();
      });

      it('Should automatically consolidate [script-call]', async () => {
        using launched = await setupBaseAssetTest({
          funding: { count: 0 },
          dust: { count: 1200, amount: 1_000 },
        });
        const { account: accountToConsolidate } = launched;
        const startConsolidationSpy = vi.spyOn(accountToConsolidate, 'startConsolidation');

        const script = new ScriptMainArgBool(accountToConsolidate);
        const { waitForResult } = await script.functions
          .main(true)
          .txParams({ tip: bn(500_000) })
          .call();
        const { value } = await waitForResult();

        expect(value).toBe(true);
        expect(startConsolidationSpy).toHaveBeenCalled();
      });

      it('Should automatically consolidate [contract-call]', async () => {
        using launched = await setupBaseAssetTest({
          funding: { count: 100, amount: 10000 },
          dust: { count: 1200, amount: 100 },
        });
        const { account: accountToConsolidate } = launched;

        const deploy = await TokenContractFactory.deploy(accountToConsolidate);
        const { contract } = await deploy.waitForResult();

        const startConsolidationSpy = vi.spyOn(accountToConsolidate, 'startConsolidation');

        const { waitForResult } = await contract.functions
          .mint_coins(1000)
          .txParams({ tip: bn(1_000_000) })
          .call();
        const {
          transactionResult: { isStatusSuccess },
        } = await waitForResult();

        expect(isStatusSuccess).toBe(true);
        expect(startConsolidationSpy).toHaveBeenCalled();
      });

      it('Should automatically consolidate [contract-call-with-forwarded-assets]', async () => {
        using launched = await setupBaseAssetTest({
          funding: { count: 200, amount: 1000 },
          dust: { count: 1200, amount: 100 },
        });
        const { account: accountToConsolidate, baseAssetId } = launched;
        const recipient = Wallet.generate({ provider: accountToConsolidate.provider });
        const deploy = await TransferContractFactory.deploy(accountToConsolidate);
        const { contract } = await deploy.waitForResult();
        const startConsolidationSpy = vi.spyOn(accountToConsolidate, 'startConsolidation');

        const { waitForResult } = await contract.functions
          .execute_transfer([
            {
              recipient: { Address: { bits: recipient.address.toB256() } },
              asset_id: { bits: baseAssetId },
              amount: 200_000,
            },
          ])
          .callParams({ forward: { amount: 200_000, assetId: baseAssetId } })
          .call();
        const {
          transactionResult: { isStatusSuccess },
        } = await waitForResult();

        expect(isStatusSuccess).toBe(true);
        expect(startConsolidationSpy).toHaveBeenCalled();
      });
    }
  );

  // Automatic consolidations for non-base assets
  describe.each(Object.entries(happyAccounts))(
    '[Automatic consolidations for non-base assets: %s]',
    (_, account) => {
      const setupNonBaseAssetTest = (opts: {
        funding?: Partial<{ amount: number; count: number }>;
        dust?: Partial<{ amount: number; count: number }>;
      }) =>
        setupTest({
          account,
          coins: ({ baseAssetId, nonBaseAssetId }) => [
            ...Array.from({ length: opts.dust?.count ?? randomInt(MIN_COINS, MAX_COINS) }, () => ({
              assetId: nonBaseAssetId,
              amount: bn(opts.dust?.amount ?? 1),
            })),
            ...Array.from({ length: opts.funding?.count ?? 1 }, () => ({
              assetId: baseAssetId,
              amount: bn(opts.funding?.amount ?? 1_000),
            })),
          ],
        });

      it('Should automatically consolidate [transfer-funds]', async () => {
        using launched = await setupNonBaseAssetTest({
          funding: { count: 30, amount: 10_000 },
          dust: { count: 1200, amount: 1_000 },
        });
        const { provider, account: accountToConsolidate, nonBaseAssetId } = launched;
        const recipient = Wallet.generate({ provider });
        const startConsolidationSpy = vi.spyOn(accountToConsolidate, 'startConsolidation');

        const { waitForResult } = await accountToConsolidate.transfer(
          recipient.address,
          1_000_000,
          nonBaseAssetId
        );

        const { isStatusSuccess } = await waitForResult();
        expect(isStatusSuccess).toBe(true);
        expect(startConsolidationSpy).toHaveBeenCalled();
      });

      it('Should automatically consolidate [transfer-to-contract]', async () => {
        using launched = await setupNonBaseAssetTest({
          funding: { count: 200, amount: 10000 },
          dust: { count: 2000, amount: 100 },
        });
        const { account: accountToConsolidate, nonBaseAssetId } = launched;
        const deploy = await CallTestContractFactory.deploy(accountToConsolidate);
        const { contract } = await deploy.waitForResult();
        const startConsolidationSpy = vi.spyOn(accountToConsolidate, 'startConsolidation');

        const tx = await accountToConsolidate.transferToContract(
          contract.id,
          200_000,
          nonBaseAssetId
        );
        const { isStatusSuccess } = await tx.waitForResult();

        expect(isStatusSuccess).toBe(true);
        expect(startConsolidationSpy).toHaveBeenCalled();
      });

      it('Should automatically consolidate [contract-call-with-forwarded-assets]', async () => {
        using launched = await setupNonBaseAssetTest({
          funding: { count: 200, amount: 10000 },
          dust: { count: 2000, amount: 100 },
        });
        const { account: accountToConsolidate, nonBaseAssetId } = launched;
        const recipient = Wallet.generate({ provider: accountToConsolidate.provider });
        const deploy = await TransferContractFactory.deploy(accountToConsolidate);
        const { contract } = await deploy.waitForResult();
        const startConsolidationSpy = vi.spyOn(accountToConsolidate, 'startConsolidation');

        const { waitForResult } = await contract.functions
          .execute_transfer([
            {
              recipient: { Address: { bits: recipient.address.toB256() } },
              asset_id: { bits: nonBaseAssetId },
              amount: 200_000,
            },
          ])
          .callParams({ forward: { amount: 200_000, assetId: nonBaseAssetId } })
          .call();
        const {
          transactionResult: { isStatusSuccess },
        } = await waitForResult();

        expect(isStatusSuccess).toBe(true);
        expect(startConsolidationSpy).toHaveBeenCalled();
      });
    }
  );
});
