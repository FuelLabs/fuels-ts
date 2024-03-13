import { Address, type Contract } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.INPUT_OUTPUT_TYPES);
  });

  it('should successfully call a function with an Address type input and output parameters', async () => {
    // #region address-input
    const address = Address.fromRandom();
    const addressInput = { value: address.toB256() };
    // #endregion address-input
    const callResponse = await contract.functions.address(addressInput).simulate();

    // #region address-output
    const addressOutput = callResponse.value;
    const addressFromOutput: Address = Address.fromB256(addressOutput.value);
    // #endregion address-output
    expect(addressFromOutput).toEqual(address);
  });

  it('should successfully call a function with a ContractId type input and output parameters', async () => {
    // #region contract-id-input
    const contractId = '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
    const contractIdInput = { value: contractId.toString() };
    // #endregion contract-id-input
    const callResponse = await contract.functions.contract_id(contractIdInput).simulate();

    // #region contract-id-output
    const contractIdOutput = callResponse.value;
    const contractIdFromOutput: string = contractIdOutput.value;
    // #endregion contract-id-output

    expect(contractIdFromOutput).toEqual(contractId);
  });

  it('should successfully call a function with a Identity type input and output parameters', async () => {
    // #region identity-address-input
    const address = Address.fromRandom();
    const addressInput = { value: address.toB256() };
    const addressIdentityInput = { Address: addressInput };
    // #endregion identity-address-input
    const callResponse1 = await contract.functions.identity(addressIdentityInput).simulate();

    // #region identity-address-output
    const identityFromOutput1 = callResponse1.value;
    const addressStringFromOutput = identityFromOutput1.Address.value;
    const addressFromOutput: Address = Address.fromB256(addressStringFromOutput);
    // #endregion identity-address-output

    // #region identity-contract-input
    const contractId = '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
    const contractIdInput = { value: contractId.toString() };
    const contractIdentityInput = { ContractId: contractIdInput };
    // #endregion identity-contract-input
    const callResponse2 = await contract.functions.identity(contractIdentityInput).simulate();

    // #region identity-contract-output
    const identityFromOutput2 = callResponse2.value;
    const contractIdFromOutput: string = identityFromOutput2.ContractId.value;
    // #endregion identity-contract-output

    expect(addressFromOutput).toEqual(address);
    expect(contractIdFromOutput).toEqual(contractId);
  });

  it('should successfully call a function with an AssetId type input and output parameters', async () => {
    // #region asset-id-input
    const assetId = '0x0cfabde7bbe58d253cf3103d8f55d26987b3dc4691205b9299ac6826c613a2e2';
    const assetIdInput = { value: assetId };
    // #endregion asset-id-input
    const callResponse = await contract.functions.asset_id(assetIdInput).simulate();

    // #region asset-id-output
    const assetIdOutput = callResponse.value;
    const assetIdFromOutput: string = assetIdOutput.value;
    // #endregion asset-id-output

    expect(assetIdFromOutput).toEqual(assetId);
  });
});
