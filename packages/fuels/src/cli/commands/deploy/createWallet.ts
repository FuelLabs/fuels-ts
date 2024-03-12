import { Wallet, Provider } from '@fuel-ts/account';

export async function createWallet(providerUrl: string, privateKey?: string) {
  let pvtKey: string;

  if (privateKey) {
    pvtKey = privateKey;
  } else if (process.env.PRIVATE_KEY) {
    pvtKey = process.env.PRIVATE_KEY;
  } else {
    throw new Error('You must provide a privateKey via config.privateKey or env PRIVATE_KEY');
  }

  try {
    const provider = await Provider.create(providerUrl);

    return Wallet.fromPrivateKey(pvtKey, provider);
  } catch (e) {
    const error = e as Error & { cause?: { code: string } };

    if (error.cause?.code === 'ECONNREFUSED') {
      throw new Error(
        `Couldn't connect to the node at "${providerUrl}". Check that you've got a node running at the config's providerUrl or set autoStartFuelCore to true.`
      );
    } else {
      throw error;
    }
  }
}
