import type { AbstractAddress, WalletUnlocked } from 'fuels';
import { FUEL_NETWORK_URL, Address, ContractFactory, Provider, Contract } from 'fuels';

import { SnippetContractEnum, getSnippetContractArtifacts } from '../../../contracts';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;
  let contractId: AbstractAddress;
  let wallet: WalletUnlocked;
  const { abi, bin } = getSnippetContractArtifacts(SnippetContractEnum.ECHO_VALUES);

  beforeAll(async () => {
    wallet = await getTestWallet();

    const factory = new ContractFactory(bin, abi, wallet);
    contract = await factory.deployContract();

    contractId = contract.id;
  });

  it('can interact with a deployed contract just fine', async () => {
    // #region contract-with-id
    const provider = new Provider(FUEL_NETWORK_URL);

    const deployedContract = new Contract(contractId, abi, provider);

    const { value } = await deployedContract.functions.echo_u8(10).get();

    expect(value).toEqual(10);
    // #endregion contract-with-id
  });

  it('can interact with a deployed contract just fine [hexed contract id]', async () => {
    const provider = new Provider(FUEL_NETWORK_URL);

    const b256Address = Address.fromB256(contract.id.toB256());

    // #region contract-with-id-hex-encoded
    const deployedContract = new Contract(b256Address, abi, provider);

    const { value } = await deployedContract.functions.echo_u8(50).get();

    expect(value).toEqual(50);
    // #endregion contract-with-id-hex-encoded
  });
});
