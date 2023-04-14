import type { AbstractAddress, WalletUnlocked } from 'fuels';
import { Address, ContractFactory, Contract } from 'fuels';

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

  it('should successfully interact with a deployed contract', async () => {
    // #region contract-with-id
    const deployedContract = new Contract(contractId, abi, wallet);

    const { value } = await deployedContract.functions.echo_u8(10).get();

    expect(value).toEqual(10);
    // #endregion contract-with-id
  });

  it('should successfully interact with a deployed contract [hexed contract id]', async () => {
    const b256Address = Address.fromB256(contract.id.toB256());

    // #region contract-with-id-hex-encoded
    const deployedContract = new Contract(b256Address, abi, wallet);

    const { value } = await deployedContract.functions.echo_u8(50).get();

    expect(value).toEqual(50);
    // #endregion contract-with-id-hex-encoded
  });
});
