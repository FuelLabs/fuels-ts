import type { B256AddressEvm, Contract, EvmAddress } from 'fuels';
import { Address } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe('EvMAddress', () => {
  let contract: Contract;
  const Bits256: B256AddressEvm =
    '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6';

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_EVM_ADDRESS);
  });

  it('should demonstrate typed evm address example', () => {
    // #region evm-address-1
    const evmAddress: EvmAddress = {
      value: Bits256,
    };
    // #endregion evm-address-1

    expect(evmAddress.value).toBe(Bits256);
  });

  it('should pass an evm address to a contract', async () => {
    // #region evm-address-2
    const evmAddress: EvmAddress = {
      value: Bits256,
    };

    const { value } = await contract.functions.echo_address_comparison(evmAddress).get();

    expect(value).toEqual(true);
    // #endregion evm-address-2
  });

  it('should retrieve an evm address from a contract', async () => {
    // #region evm-address-3
    const evmAddress: EvmAddress = {
      value: Bits256,
    };

    const { value } = await contract.functions.echo_address().get();

    expect(value).toEqual(evmAddress);
    expect(value.value).toEqual(Bits256);
    // #endregion evm-address-3
  });

  it('should create an Evm Address from a B256Address', async () => {
    // #region evm-address-4
    // #context import { Address } from 'fuels';

    const address = Address.fromB256(
      '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6'
    );

    const evmAddress: EvmAddress = address.toEvmAddress();

    const { value } = await contract.functions.echo_address_comparison(evmAddress).get();

    expect(value).toEqual(true);
    // #endregion evm-address-4
  });
});
