import { Wallet } from '@fuel-ts/account';
import { Provider } from '@fuel-ts/providers';

export async function createWallet(providerUrl: string, privateKey?: string) {
  let pvtKey: string;

  if (privateKey) {
    pvtKey = privateKey;
  } else if (process.env.PRIVATE_KEY) {
    pvtKey = process.env.PRIVATE_KEY;
  } else {
    throw new Error('You must provide a privateKey via config.privateKey or env PRIVATE_KEY');
  }

  const provider = await Provider.create(providerUrl);

  return Wallet.fromPrivateKey(pvtKey, provider);
}
