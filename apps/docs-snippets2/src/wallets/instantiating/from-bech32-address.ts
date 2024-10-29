// #region instantiating-wallets-8
import type { WalletLocked } from 'fuels';
import { Wallet } from 'fuels';

const address = `fuel14kjrdcdcp7z4l9xk0pm3cwz9qnjxxd04wx4zgnc3kknslclxzezqyeux5d`;

const wallet: WalletLocked = Wallet.fromAddress(address);
// #endregion instantiating-wallets-8

console.log('Wallet should be defined', wallet);
