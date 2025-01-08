import { Wallet, Provider } from '@fuel-ts/account';
import { FuelError } from '@fuel-ts/errors';

export async function createWallet(providerUrl: string, privateKey?: string) {
  let pvtKey: string;

  if (privateKey) {
    pvtKey = privateKey;
  } else if (process.env.PRIVATE_KEY) {
    pvtKey = process.env.PRIVATE_KEY;
  } else {
    throw new FuelError(
      FuelError.CODES.MISSING_REQUIRED_PARAMETER,
      'You must provide a privateKey via config.privateKey or env PRIVATE_KEY'
    );
  }

  try {
    const provider = new Provider(providerUrl);
    await provider.init(); // can probably be removed

    return Wallet.fromPrivateKey(pvtKey, provider);
  } catch (e) {
    const error = e as Error & { cause?: { code: string } };
    if (/EADDRNOTAVAIL|ECONNREFUSED/.test(error.cause?.code ?? '')) {
      throw new FuelError(
        FuelError.CODES.CONNECTION_REFUSED,
        `Couldn't connect to the node at "${providerUrl}". Check that you've got a node running at the config's providerUrl or set autoStartFuelCore to true.`
      );
    } else {
      throw error;
    }
  }
}
