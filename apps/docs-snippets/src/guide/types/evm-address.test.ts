import type { Contract, EvmAddress, B256AddressEvm } from 'fuels';
import { Address } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

describe('EvMAddress', () => {
  let contract: Contract;
  const Bits256: B256AddressEvm =
    '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6';

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_EVM_ADDRESS);
  });

  it('should demonstrate typed evm address example', () => {
    // #region evm-address-1
    // #import { EvmAddress }

    const evmAddress: EvmAddress = {
      value: Bits256,
    };
    // #endregion evm-address-1

    // #region addresses-3
    // #import { EvmAddress }

    const address: EvmAddress = {
      value: '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6',
    };
    // #endregion addresses-3

    expect(evmAddress.value).toBe(Bits256);
    expect(address.value).toBe(
      '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6'
    );
  });

  it('should create an Evm Address from a B256Address', async () => {
    // #region evm-address-2
    // #import { EvmAddress, Address }

    const b256Address = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

    const address = Address.fromB256(b256Address);

    const evmAddress: EvmAddress = address.toEvmAddress();
    // #endregion evm-address-2

    const { value } = await contract.functions
      .echo_address_comparison(evmAddress)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toBeTruthy();
  });

  it('should pass an evm address to a contract', async () => {
    // #region evm-address-3
    // #import { EvmAddress }

    const evmAddress: EvmAddress = {
      value: Bits256,
    };

    const { value } = await contract.functions
      .echo_address_comparison(evmAddress)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toBeTruthy();
    // #endregion evm-address-3
  });

  it('should retrieve an evm address from a contract', async () => {
    // #region evm-address-4
    // #import { EvmAddress }

    const evmAddress: EvmAddress = {
      value: Bits256,
    };

    const { value } = await contract.functions
      .echo_address()
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toEqual(evmAddress);
    // #endregion evm-address-4

    expect(value.value).toEqual(Bits256);
  });
});
