import { Wallet } from 'fuels';

// #region snippet-full
const mnemonic =
  'oblige salon price punch saddle immune slogan rare snap desert retire surprise';

const wallet = Wallet.fromMnemonic(mnemonic);
// #endregion snippet-full

console.log('wallet', wallet);

/**
 * @group node
 */
