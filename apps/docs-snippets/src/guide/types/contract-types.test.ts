import { Address } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
import type {
  IdentityOutput,
  AddressOutput,
  ContractIdOutput,
} from 'test/typegen/contracts/InputOutputTypes';

import { InputOutputTypesFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */

describe('Contract Types', () => {
  it('should successfully call a function with an Address type input and output parameters', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: InputOutputTypesFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region address-input
    // #import { Address };
    const address = Address.fromRandom();
    const addressInput = { bits: address.toB256() };
    // #endregion address-input
    const callResponse = await contract.functions.address(addressInput).simulate();

    // #region address-output
    // #import { Address };
    const addressOutput = callResponse.value;
    const addressFromOutput: Address = Address.fromB256(addressOutput.bits);
    // #endregion address-output
    expect(addressFromOutput).toEqual(address);
  });

  it('should successfully call a function with a ContractId type input and output parameters', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: InputOutputTypesFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region contract-id-input
    const contractId = '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
    const contractIdInput = { bits: contractId.toString() };
    // #endregion contract-id-input
    const callResponse = await contract.functions.contract_id(contractIdInput).simulate();

    // #region contract-id-output
    const contractIdOutput = callResponse.value;
    const contractIdFromOutput: string = contractIdOutput.bits;
    // #endregion contract-id-output

    expect(contractIdFromOutput).toEqual(contractId);
  });

  it('should successfully call a function with a Identity type input and output parameters', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: InputOutputTypesFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region identity-address-input
    // #import { Address };
    const address = Address.fromRandom();
    const addressInput = { bits: address.toB256() };
    const addressIdentityInput = { Address: addressInput };
    // #endregion identity-address-input
    const callResponse1 = await contract.functions.identity(addressIdentityInput).simulate();

    // #region identity-address-output
    // #import { Address };
    const identityFromOutput1: IdentityOutput = callResponse1.value;
    const addressStringFromOutput: AddressOutput = identityFromOutput1.Address as AddressOutput;
    const addressFromOutput: Address = Address.fromB256(addressStringFromOutput.bits);
    // #endregion identity-address-output

    // #region identity-contract-input
    const contractId = '0x7296ff960b5eb86b5f79aa587d7ebe1bae147c7cac046a16d062fbd7f3a753ec';
    const contractIdInput = { bits: contractId.toString() };
    const contractIdentityInput = { ContractId: contractIdInput };
    // #endregion identity-contract-input
    const callResponse2 = await contract.functions.identity(contractIdentityInput).simulate();

    // #region identity-contract-output
    const identityFromOutput2: IdentityOutput = callResponse2.value;
    const contractIdOutput: ContractIdOutput = identityFromOutput2.ContractId as ContractIdOutput;
    const contractIdFromOutput: string = contractIdOutput.bits;
    // #endregion identity-contract-output

    expect(addressFromOutput).toEqual(address);
    expect(contractIdFromOutput).toEqual(contractId);
  });

  it('should successfully call a function with an AssetId type input and output parameters', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: InputOutputTypesFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region asset-id-input
    const assetId = '0x0cfabde7bbe58d253cf3103d8f55d26987b3dc4691205b9299ac6826c613a2e2';
    const assetIdInput = { bits: assetId };
    // #endregion asset-id-input
    const callResponse = await contract.functions.asset_id(assetIdInput).simulate();

    // #region asset-id-output
    const assetIdOutput = callResponse.value;
    const assetIdFromOutput: string = assetIdOutput.bits;
    // #endregion asset-id-output

    expect(assetIdFromOutput).toEqual(assetId);
  });
});
