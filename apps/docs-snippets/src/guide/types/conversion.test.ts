import type { WalletLocked, AssetId } from 'fuels';
import {
  Wallet,
  FUEL_NETWORK_URL,
  Provider,
  Contract,
  Address,
  isBech32,
  toBech32,
  toB256,
  isB256,
} from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';

describe(__filename, () => {
  const { abiContents: abi } = getDocsSnippetsForcProject(DocSnippetProjectsEnum.ECHO_VALUES);
  let provider: Provider;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
  });

  it('converts between bech32 and b256 using address', () => {
    // #region conversion-5
    // #context import { Address } from 'fuels';

    const bech32 = 'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';
    const addressInstance = Address.fromDynamicInput(bech32);
    const b256 = addressInstance.toB256();
    // 0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
    // #endregion conversion-5

    expect(b256).toBe('0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f');
  });

  it('converts between bech32 and b256 using utilities', () => {
    let b256;

    // #region conversion-6
    // #context import { toB256, isBech32 } from 'fuels';

    const bech32 = 'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';

    if (isBech32(bech32)) {
      b256 = toB256(bech32);
      // 0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
    }
    // #endregion conversion-6

    expect(b256).toBe('0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f');
  });

  it('converts between b256 and bech32 using address', () => {
    // #region conversion-7
    // #context import { Address } from 'fuels';

    const b256 = '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
    const addressInstance = Address.fromDynamicInput(b256);
    const bech32 = addressInstance.toBech32();
    // fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs

    // #endregion conversion-7

    expect(bech32).toBe('fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs');
  });

  it('converts between b256 and bech32 using utilities', () => {
    let bech32;

    // #region conversion-8
    // #context import { toB256, isBech32 } from 'fuels';

    const b256 = '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';

    if (isB256(b256)) {
      bech32 = toBech32(b256);
      // fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
    }
    // #endregion conversion-8

    expect(bech32).toBe('fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs');
  });

  it('should successfully validate contract id equality', () => {
    // #region conversion-2
    // #context import { Address, Contract} from 'fuels';

    const address = Address.fromB256(
      '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
    );

    const contract = new Contract(address, abi, provider);

    const bech32 = contract.id.toAddress();
    // fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs

    // #endregion conversion-2
    expect(bech32).toBe('fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs');
  });

  it('should successfully validate a wallet address equality', () => {
    // #region conversion-3
    // #context import { Wallet, Address } from 'fuels';

    const address = Address.fromB256(
      '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
    );
    const wallet: WalletLocked = Wallet.fromAddress(address, provider);
    const walletAddress = wallet.address.toAddress();
    // #endregion conversion-3

    expect(walletAddress).toBe('fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs');
  });

  it('should successfully create new address from asset id', () => {
    // #region conversion-4
    // #context import { Address, AssetId } from 'fuels';

    const b256 = '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
    const address = Address.fromB256(b256);
    const assetId: AssetId = address.toAssetId();
    // #endregion conversion-4

    expect(assetId.value);
  });
});
