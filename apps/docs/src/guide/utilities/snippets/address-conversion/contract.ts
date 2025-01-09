// #region conversion-2
import type { B256Address } from 'fuels';
import { Address, Provider, Contract } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { Counter } from '../../../../typegend/contracts';

const provider = new Provider(LOCAL_NETWORK_URL);

const contractAbi = Counter.abi;
const contractAddress = Address.fromB256(
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
);

const contract = new Contract(contractAddress, contractAbi, provider);

const b256: B256Address = contract.id.toAddress();
// 0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
// #endregion conversion-2

const expectedB256 =
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
console.log('B256 address should equal expected', b256 === expectedB256);
