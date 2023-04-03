import type { BytesLike } from '@ethersproject/bytes';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';
import http from "http";

import { FUEL_NETWORK_URL , FUEL_NETWORK_BACKUP_URL} from './configs';
import { WalletLocked, WalletUnlocked } from './wallets';

async function getFuelNetworkUrl(): Promise<string> {
  return new Promise<string>((resolve) => {
    const request = http.request(FUEL_NETWORK_URL, { method: "HEAD" }, (response) => {
      if (response.statusCode === 200) {
        resolve(FUEL_NETWORK_URL);
      } else {
        console.error("Fuel Network URL is not available, switching to backup URL");
        resolve(FUEL_NETWORK_BACKUP_URL);
      }
    });

    request.on("error", () => {
      console.error("Error checking Fuel Network URL, switching to backup URL");
      resolve(FUEL_NETWORK_BACKUP_URL);
    });

    request.end();
  });
}

const promiseString: Promise<string> = getFuelNetworkUrl();
  let resultString: string;
  promiseString.then(value => {
    resultString = value;
  });
export class Wallet {
  static fromAddress(
    address: string | AbstractAddress,
    provider: string | Provider = resultString
  ): WalletLocked {
    return new WalletLocked(address, provider);
  }

  static fromPrivateKey(privateKey: BytesLike, provider: string | Provider = FUEL_NETWORK_URL) {
    return new WalletUnlocked(privateKey, provider);
  }

  static generate = WalletUnlocked.generate;
  static fromSeed = WalletUnlocked.fromSeed;
  static fromMnemonic = WalletUnlocked.fromMnemonic;
  static fromExtendedKey = WalletUnlocked.fromExtendedKey;
}
