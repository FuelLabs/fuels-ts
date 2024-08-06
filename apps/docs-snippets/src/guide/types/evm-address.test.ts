import type { EvmAddress, B256AddressEvm } from 'fuels';
import { Address } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoEvmAddressFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('EvMAddress', () => {
  const Bits256: B256AddressEvm =
    '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6';

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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEvmAddressFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEvmAddressFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEvmAddressFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

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
