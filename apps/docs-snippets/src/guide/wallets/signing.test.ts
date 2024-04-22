import { FUEL_NETWORK_URL, Provider, Signer, WalletUnlocked, hashMessage } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  it('should sign a message using wallet instance', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    // #region wallet-message-signing
    // #import { WalletUnlocked, hashMessage, Signer };

    const wallet = WalletUnlocked.generate({ provider });

    // Signing a message
    const message = 'doc-test-message';
    const signedMessage = await wallet.signMessage(message);

    // Recovering the address from the signed message
    const hashedMessage = hashMessage(message);
    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);
    // #endregion wallet-message-signing

    expect(wallet.privateKey).toBeTruthy();
    expect(wallet.publicKey).toBeTruthy();
    expect(wallet.address).toEqual(recoveredAddress);
  });
});
