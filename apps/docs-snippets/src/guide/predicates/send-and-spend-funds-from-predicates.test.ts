import { safeExec } from '@fuel-ts/errors/test-utils';
import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { WalletUnlocked, Predicate, BN, getRandomB256, BaseAssetId } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';

/**
 * @group node
 */
describe(__filename, () => {
  const { abiContents: abi, binHexlified: bin } = getSnippetProjectArtifacts(
    SnippetProjectEnum.SIMPLE_PREDICATE
  );

  beforeAll(async (ctx) => {});

  it('should successfully use predicate to spend assets', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [walletWithFunds],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    // #region send-and-spend-funds-from-predicates-2
    // #context const provider = await Provider.create(...)
    const predicate = new Predicate(bin, provider, abi);
    // #endregion send-and-spend-funds-from-predicates-2

    // #region send-and-spend-funds-from-predicates-3
    const amountToPredicate = 300_000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
    });

    await tx.waitForResult();
    // #endregion send-and-spend-funds-from-predicates-3

    const initialPredicateBalance = new BN(await predicate.getBalance()).toNumber();

    expect(initialPredicateBalance).toBeGreaterThanOrEqual(amountToPredicate);

    // #region send-and-spend-funds-from-predicates-4
    const inputAddress = '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';

    predicate.setData(inputAddress);
    // #endregion send-and-spend-funds-from-predicates-4

    // #region send-and-spend-funds-from-predicates-5
    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    const tx2 = await predicate.transfer(
      receiverWallet.address,
      amountToPredicate - 150_000,
      BaseAssetId,
      {
        gasPrice,
      }
    );

    await tx2.waitForResult();
    // #endregion send-and-spend-funds-from-predicates-5
  });

  it('should fail when trying to spend predicates entire amount', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [walletWithFunds],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const predicate = new Predicate(bin, provider, abi);

    const amountToPredicate = 100;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
    });

    await tx.waitForResult();

    const predicateBalance = new BN(await predicate.getBalance()).toNumber();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    predicate.setData('0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4');

    const { error } = await safeExec(() =>
      predicate.transfer(receiverWallet.address, predicateBalance, BaseAssetId, { gasPrice })
    );

    // #region send-and-spend-funds-from-predicates-6
    const errorMsg = 'not enough coins to fit the target';
    // #endregion send-and-spend-funds-from-predicates-6

    expect((<Error>error).message).toMatch(errorMsg);
  });

  it('should fail when set wrong input data for predicate', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [walletWithFunds],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const predicateOwner = WalletUnlocked.generate({
      provider,
    });
    const predicate = new Predicate(bin, predicateOwner.provider, abi);

    const amountToPredicate = 200_000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
    });

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    predicate.setData(getRandomB256());

    const { error } = await safeExec(() =>
      predicate.transfer(receiverWallet.address, 1, BaseAssetId, {
        gasPrice,
      })
    );

    // #region send-and-spend-funds-from-predicates-7
    const errorMsg =
      'Invalid transaction: The transaction contains a predicate which failed to validate';
    // #endregion send-and-spend-funds-from-predicates-7

    expect((<Error>error).message).toMatch(errorMsg);
  });
});
