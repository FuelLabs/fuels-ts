import type { Bytes, WalletLocked } from 'fuels';
import {
  Wallet,
  FUEL_NETWORK_URL,
  Provider,
  Contract,
  Address,
  ZeroBytes32,
  arrayify,
  hexlify,
  randomBytes,
} from 'fuels';

import { getSnippetProjectArtifacts, SnippetProjectEnum } from '../../../projects';

describe(__filename, () => {
  const { abiContents: abi } = getSnippetProjectArtifacts(SnippetProjectEnum.ECHO_VALUES);
  let provider: Provider;

  beforeAll(async () => {
    provider = await Provider.connect(FUEL_NETWORK_URL);
  });

  it('should successfully convert between b256 and bytes32', () => {
    // #region conversion-1
    const random256BitsArr: Bytes = randomBytes(32);

    const hexed256BitsStr: string = hexlify(random256BitsArr);

    const address = Address.fromB256(hexed256BitsStr);

    const arrayB256: Uint8Array = arrayify(random256BitsArr);

    expect(address.toBytes()).toEqual(arrayB256);
    expect(address.toB256()).toEqual(hexed256BitsStr);
    expect(arrayify(address.toB256())).toEqual(arrayB256);
    // #endregion conversion-1
  });

  it('should successfully validate contract id equality', () => {
    // #region conversion-2
    // #context import { FUEL_NETWORK_URL } from 'fuels';

    const address = Address.fromRandom();

    const contractLike = new Contract(address, abi, provider);

    expect(address.equals(<Address>contractLike.id)).toBeTruthy();
    // #endregion conversion-2
  });

  it('should successfully validate a wallet address equality', () => {
    // #region conversion-3
    const address = Address.fromRandom();

    const wallet: WalletLocked = Wallet.fromAddress(address, provider);

    // we use the cast here to cast from `AbstractAddress` to `Address`
    expect(address.equals(<Address>wallet.address)).toBeTruthy();

    expect(wallet.address.toBytes()).toEqual(arrayify(wallet.address.toB256()));
    // #endregion conversion-3
  });

  it('should successfully create new address from asset id', () => {
    // #region conversion-4
    // #context import { ZeroBytes32 } from 'fuels';

    const assetId: string = ZeroBytes32;

    const address1 = Address.fromString(assetId);
    const address2 = Address.fromB256(assetId);
    const address3 = Address.fromDynamicInput(assetId);

    expect(address1.toB256()).toEqual(assetId);
    expect(address2.toB256()).toEqual(assetId);
    expect(address3.toB256()).toEqual(assetId);

    // consistent bytes conversion
    expect(arrayify(assetId)).toEqual(arrayify(address1));
    // #endregion conversion-4
  });
});
