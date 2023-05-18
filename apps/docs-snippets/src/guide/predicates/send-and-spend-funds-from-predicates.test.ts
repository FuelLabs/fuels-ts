import type { WalletUnlocked } from 'fuels';
import { FUEL_NETWORK_URL, BN, Provider, Wallet, Predicate } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let walletWithFunds: WalletUnlocked;

  const { abiContents, binHelixfied } = getSnippetProjectArtifacts(
    SnippetProjectEnum.VALIDATE_SIGNATURE_PREDICATE
  );

  beforeAll(async () => {
    walletWithFunds = await getTestWallet();
  });

  it('should successfully tranfer from predicate with 3 signatures', async () => {
    // #region send-and-spend-funds-from-predicates-2
    // set up private keys
    const PRIVATE_KEY_1 = '0x862512a2363db2b3a375c0d4bbbd27172180d89f23f2e259bac850ab02619301';
    const PRIVATE_KEY_2 = '0x37fa81c84ccd547c30c176b118d5cb892bdb113e8e80141f266519422ef9eefd';
    const PRIVATE_KEY_3 = '0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb';

    const provider = new Provider(FUEL_NETWORK_URL);

    // create wallets from private keys
    const wallet1: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY_1, provider);
    const wallet2: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY_2, provider);
    const wallet3: WalletUnlocked = Wallet.fromPrivateKey(PRIVATE_KEY_3, provider);
    // #endregion send-and-spend-funds-from-predicates-2

    // #region send-and-spend-funds-from-predicates-3
    // transfer funds to wallets
    const tx1 = await walletWithFunds.transfer(wallet1.address, 1_000);
    const tx2 = await walletWithFunds.transfer(wallet2.address, 1_000);
    const tx3 = await walletWithFunds.transfer(wallet3.address, 1_000);

    await tx1.waitForResult();
    await tx2.waitForResult();
    await tx3.waitForResult();
    // #endregion send-and-spend-funds-from-predicates-3

    // #region send-and-spend-funds-from-predicates-4
    const amountToPredicate = 1_000;

    const predicate = new Predicate(binHelixfied, abiContents, walletWithFunds.provider);

    const txPredicate = await walletWithFunds.transfer(predicate.address, amountToPredicate);

    await txPredicate.waitForResult();

    const initialPredicateBalance = new BN(await predicate.getBalance()).toNumber();

    expect(initialPredicateBalance).toBeGreaterThanOrEqual(amountToPredicate);
    // #endregion send-and-spend-funds-from-predicates-4

    // #region send-and-spend-funds-from-predicates-5
    // set up data to sign
    const dataToSign = '0x0000000000000000000000000000000000000000000000000000000000000000';

    // generate signatures
    const signature1 = await wallet1.signMessage(dataToSign);
    const signature2 = await wallet2.signMessage(dataToSign);
    const signature3 = await wallet3.signMessage(dataToSign);
    // #endregion send-and-spend-funds-from-predicates-5

    // #region send-and-spend-funds-from-predicates-6
    // create a receiver wallet
    const receiver = Wallet.generate({ provider });

    const amountToReceiver = 100;

    const signatures = [signature1, signature2, signature3];

    const txPredicateTransfer = await predicate
      .setData(signatures)
      .transfer(receiver.address, amountToReceiver);

    await txPredicateTransfer.waitForResult();

    const finalPredicateBalance = new BN(await predicate.getBalance()).toNumber();

    expect(finalPredicateBalance).toEqual(initialPredicateBalance - amountToReceiver);
    // #endregion send-and-spend-funds-from-predicates-6
  });
});
