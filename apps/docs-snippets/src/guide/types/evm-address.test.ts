import { TestNodeLauncher } from '@fuel-ts/test-utils';
import type { B256AddressEvm, EvmAddress } from 'fuels';
import { Address } from 'fuels';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe('EvMAddress', () => {
  const Bits256: B256AddressEvm =
    '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6';

  it('should demonstrate typed evm address example', () => {
    // #region evm-address-1
    // #context import type { EvmAddress } from 'fuels';

    const evmAddress: EvmAddress = {
      value: Bits256,
    };
    // #endregion evm-address-1

    expect(evmAddress.value).toBe(Bits256);
  });

  it('should create an Evm Address from a B256Address', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-evm-address')],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region evm-address-2
    // #context import type { EvmAddress } from 'fuels';
    // #context import { Address } from 'fuels';

    const b256Address = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

    const address = Address.fromB256(b256Address);

    const evmAddress: EvmAddress = address.toEvmAddress();
    // #endregion evm-address-2

    const { value } = await contract.functions.echo_address_comparison(evmAddress).simulate();

    expect(value).toBeTruthy();
  });

  it('should pass an evm address to a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-evm-address')],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region evm-address-3
    // #context import type { EvmAddress } from 'fuels';

    const evmAddress: EvmAddress = {
      value: Bits256,
    };

    const { value } = await contract.functions.echo_address_comparison(evmAddress).simulate();

    expect(value).toBeTruthy();
    // #endregion evm-address-3
  });

  it('should retrieve an evm address from a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-evm-address')],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region evm-address-4
    // #context import type { EvmAddress } from 'fuels';

    const evmAddress: EvmAddress = {
      value: Bits256,
    };

    const { value } = await contract.functions.echo_address().simulate();

    expect(value).toEqual(evmAddress);
    // #endregion evm-address-4

    expect(value.value).toEqual(Bits256);
  });
});
