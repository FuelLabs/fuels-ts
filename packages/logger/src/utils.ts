import type { Address } from '@fuel-ts/address';

import type { AddressLoggerOptions } from './index';

export function truncateWalletAddress(
  walletAddress: Address,
  options: Partial<AddressLoggerOptions> = {}
): string {
  const prefixLength = options.prefixLength ?? 2;
  const suffixLength = options.suffixLength ?? 4;

  const walletAddressString = walletAddress.toString();
  return `${walletAddressString.substring(0, prefixLength)}…${walletAddressString.substring(
    walletAddressString.length,
    walletAddressString.length - suffixLength
  )}`;
}
