import { Wallet } from 'fuels';

// #region snippet-full
const mnemonic =
  'oblige salon price punch saddle immune slogan rare snap desert retire surprise';

const path = "m/44'/60'/1'/0/0";

const wallet = Wallet.fromMnemonic(mnemonic, path);
// #endregion snippet-full

console.log('wallet', wallet);

/**
 * @group node
 */
