import { safeExec } from '@fuel-ts/errors/test-utils';
import {
  WalletUnlocked,
  FUEL_NETWORK_URL,
  Provider,
  Predicate,
  BN,
  getRandomB256,
  BaseAssetId,
} from 'fuels';

import { DocSnippetProjectsEnum, getDocsSnippetsForcProject } from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let walletWithFunds: WalletUnlocked;
  let gasPrice: BN;
  const { abiContents: abi, binHexlified: bin } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SIMPLE_PREDICATE
  );

  beforeAll(async () => {
    walletWithFunds = await getTestWallet();
    ({ minGasPrice: gasPrice } = walletWithFunds.provider.getGasConfig());
  });

  it('should successfully use predicate to spend assets', async () => {
    // #region send-and-spend-funds-from-predicates-2
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const predicate = new Predicate(bin, provider, abi);
    // #endregion send-and-spend-funds-from-predicates-2

    // #region send-and-spend-funds-from-predicates-3
    const amountToPredicate = 300_000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
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
        gasLimit: 10_000,
      }
    );

    await tx2.waitForResult();
    // #endregion send-and-spend-funds-from-predicates-5
  });

  it('should fail when trying to spend predicates entire amount', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const predicate = new Predicate(bin, provider, abi);

    const amountToPredicate = 100;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });

    await tx.waitForResult();

    const predicateBalance = new BN(await predicate.getBalance()).toNumber();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    predicate.setData('0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4');

    const { error } = await safeExec(() =>
      predicate.transfer(receiverWallet.address, predicateBalance, BaseAssetId, {
        gasPrice,
        gasLimit: 10_000,
      })
    );

    // #region send-and-spend-funds-from-predicates-6
    const errorMsg = 'not enough coins to fit the target';
    // #endregion send-and-spend-funds-from-predicates-6

    expect((<Error>error).message).toMatch(errorMsg);
  });

  it('should fail when set wrong input data for predicate', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const predicateOwner = WalletUnlocked.generate({
      provider,
    });
    const predicate = new Predicate(bin, predicateOwner.provider, abi);

    const amountToPredicate = 200_000;

    const tx = await walletWithFunds.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });

    await tx.waitForResult();

    const receiverWallet = WalletUnlocked.generate({
      provider,
    });

    predicate.setData(getRandomB256());

    const { error } = await safeExec(() =>
      predicate.transfer(receiverWallet.address, amountToPredicate, BaseAssetId, {
        gasPrice,
        gasLimit: 10_000,
      })
    );

    // #region send-and-spend-funds-from-predicates-7
    const errorMsg = 'PredicateVerificationFailed';
    // #endregion send-and-spend-funds-from-predicates-7

    expect((<Error>error).message).toMatch(errorMsg);
  });
});
