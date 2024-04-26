import type { Contract, EvmAddress, B256AddressEvm } from 'fuels';
import { Address } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe('EvMAddress', () => {
  let contract: Contract;
  const Bits256: B256AddressEvm =
    '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6';

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_EVM_ADDRESS);
  });

  it('should demonstrate typed evm address example', () => {
    // #region evm-address-1
    // #import { EvmAddress };

    const evmAddress: EvmAddress = {
      bits: Bits256,
    };
    // #endregion evm-address-1

    // #region addresses-3
    // #import { EvmAddress };

    const address: EvmAddress = {
      bits: '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6',
    };
    // #endregion addresses-3

    expect(evmAddress.bits).toBe(Bits256);
    expect(address.bits).toBe('0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6');
  });

  it('should create an Evm Address from a B256Address', async () => {
    // #region evm-address-2
    // #import { EvmAddress, Address };

    const b256Address = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

    const address = Address.fromB256(b256Address);

    const evmAddress: EvmAddress = address.toEvmAddress();
    // #endregion evm-address-2

    const { value } = await contract.functions.echo_address_comparison(evmAddress).simulate();

    expect(value).toBeTruthy();
  });

  it('should pass an evm address to a contract', async () => {
    // #region evm-address-3
    // #import { EvmAddress };

    const evmAddress: EvmAddress = {
      bits: Bits256,
    };

    const { value } = await contract.functions.echo_address_comparison(evmAddress).simulate();

    expect(value).toBeTruthy();
    // #endregion evm-address-3
  });

  it('should retrieve an evm address from a contract', async () => {
    // #region evm-address-4
    // #import { EvmAddress };

    const evmAddress: EvmAddress = {
      bits: Bits256,
    };

    const { value } = await contract.functions.echo_address().simulate();

    expect(value).toEqual(evmAddress);
    // #endregion evm-address-4

    expect(value.bits).toEqual(Bits256);
  });
});
