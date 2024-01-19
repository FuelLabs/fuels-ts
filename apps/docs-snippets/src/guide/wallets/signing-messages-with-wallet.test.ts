import { Provider, FUEL_NETWORK_URL, WalletUnlocked, hashMessage, Signer } from 'fuels';

describe(__filename, () => {
  it('it can work sign messages with wallets', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    // #region wallet-message-signing
    // #context import { WalletUnlocked, hashMessage, Signer} from 'fuels';
    const wallet = WalletUnlocked.generate({
      provider,
    });
    const message = 'doc-test-message';
    const signedMessage = await wallet.signMessage(message);
    const hashedMessage = hashMessage(message);
    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.address).toEqual(recoveredAddress);
    // #endregion wallet-message-signing
  });
});
