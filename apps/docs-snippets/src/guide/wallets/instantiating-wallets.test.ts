import { FUEL_NETWORK_URL, HDWallet, Provider, Wallet } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  it('should generate a new wallet just fine', () => {
    // #region instantiating-wallets-1
    const unlockedWallet = Wallet.generate();
    // #endregion instantiating-wallets-1

    expect(unlockedWallet).toBeDefined();
  });

  it('should instantiate an unlocked wallet from private key', () => {
    // #region instantiating-wallets-2
    const privateKey = '0x36ca81ba70f3e04b7cc8780bff42d907ebca508097d4ae3df5147c93fd217f7c';

    const myWallet = Wallet.fromPrivateKey(privateKey);
    // #endregion instantiating-wallets-2

    expect(myWallet).toBeDefined();
  });

  it('should instantiate an unlocked wallet from mnemonic phrase', () => {
    // #region instantiating-wallets-3
    const mnemonic = 'section gospel lady april mouse huge prosper boy urge fox tackle orient';

    const myWallet = Wallet.fromMnemonic(mnemonic);
    // #endregion instantiating-wallets-3

    expect(myWallet).toBeDefined();
  });

  it('should instantiate an unlocked wallet from seed', () => {
    // #region instantiating-wallets-4
    const mySeed = '0xa5d42fd0cf8825fc846b2f257887a515573ee5b779e99f060dc945b3d5504bca';

    const myWallet = Wallet.fromSeed(mySeed);
    // #endregion instantiating-wallets-4

    expect(myWallet).toBeDefined();
  });

  it('should instantiate an unlocked wallet from derived key', () => {
    // #region instantiating-wallets-5
    const mySeed = '0xa5d42fd0cf8825fc846b2f257887a515573ee5b779e99f060dc945b3d5504bca';

    const extendedKey = HDWallet.fromSeed(mySeed).toExtendedKey();

    const myWallet = Wallet.fromExtendedKey(extendedKey);
    // #endregion instantiating-wallets-5

    expect(myWallet).toBeDefined();
  });

  it('should instantiate an unlocked wallet from JSON wallet', async () => {
    // #region instantiating-wallets-6
    const jsonWallet = `{"id":"83d1792f-3230-496a-92af-3b44a1524fd6","version":3,"address":"ada436e1b80f855f94d678771c384504e46335f571aa244f11b5a70fe3e61644","crypto":{"cipher":"aes-128-ctr","mac":"6911499ec31a6a6d240220971730374396efd666bd34123d4e3ce85e4cf248c6","cipherparams":{"iv":"40576cbd4f7c84e88b0532320e23b425"},"ciphertext":"3e5e77f23444aa86b397dbc62e14d8b7d3fd7c7fe209e066bb7df17eca398129","kdf":"scrypt","kdfparams":{"dklen":32,"n":8192,"p":1,"r":8,"salt":"b046520d85090ee2abd6285174f37bc01e28846b6bb5edc03ae5f7c13aec03d2"}}}`;

    const password = 'password';

    const myWallet = await Wallet.fromEncryptedJson(jsonWallet, password);
    // #endregion instantiating-wallets-6

    expect(myWallet).toBeDefined();
  });

  it('should connect a wallet to a provider', async () => {
    const address = `0xada436e1b80f855f94d678771c384504e46335f571aa244f11b5a70fe3e61644`;
    const myWallet = Wallet.fromAddress(address);

    // #region instantiating-wallets-7
    const provider = await Provider.create('https://beta-5.fuel.network/graphql');

    myWallet.connect(provider);
    // #endregion instantiating-wallets-7

    expect(myWallet).toBeDefined();
  });

  it('should instantiate wallet alreay connected to a provider', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const address = `0xada436e1b80f855f94d678771c384504e46335f571aa244f11b5a70fe3e61644`;

    // #region instantiating-wallets-8
    const myWallet = Wallet.fromAddress(address, provider);
    // #endregion instantiating-wallets-8

    myWallet.connect(provider);

    expect(myWallet).toBeDefined();
  });
});
