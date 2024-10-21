// #region snippet-1
import type { B256AddressEvm, EvmAddress } from 'fuels';

const bits256: B256AddressEvm =
  '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6';

const evmAddress: EvmAddress = {
  bits: bits256,
};
// #endregion snippet-1

console.log('evmAddress', evmAddress);
