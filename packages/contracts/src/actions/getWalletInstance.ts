import { WalletUnlocked } from 'fuels';

export async function getWalletInstance() {
  // Avoid early load of process env
  const { WALLET_SECRET, PROVIDER_URL } = process.env;

  if (WALLET_SECRET) {
    return new WalletUnlocked(WALLET_SECRET, PROVIDER_URL);
  }
  throw new Error('You must provide a WALLET_SECRET');
}
