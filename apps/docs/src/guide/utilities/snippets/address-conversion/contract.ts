// #region conversion-2
import type { Bech32Address } from 'fuels';
import { Address, Provider, Contract } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { Counter } from '../../../../typegend/contracts';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const contractAbi = Counter.abi;
const contractAddress = Address.fromB256(
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
);

const contract = new Contract(contractAddress, contractAbi, provider);

const bech32: Bech32Address = contract.id.toAddress();
// fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
// #endregion conversion-2

const expectedBech32 =
  'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';
console.log('Bech32 address should equal expected', bech32 === expectedBech32);
