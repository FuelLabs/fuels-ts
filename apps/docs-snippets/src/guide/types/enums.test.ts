import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { FuelError, type Contract } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_ENUM);
  });

  it('should successfully echo a simple enum in a contract call', async () => {
    // #region simple-enum-3
    const enumVariant = 'Completed';

    const { value } = await contract.functions.echo_state_error_enum(enumVariant).simulate();

    expect(value).toEqual(enumVariant);
    // #endregion simple-enum-3
  });

  it('should successfully echo a enum in a contract call (UserError Enum)', async () => {
    // #region enum-of-enums-3
    const enumParam = { UserError: 'InsufficientPermissions' };

    const { value } = await contract.functions.echo_error_enum(enumParam).simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-of-enums-3
  });

  it('should successfully echo a enum in a contract call (StateError Enum)', async () => {
    // #region enum-of-enums-4
    const enumParam = { StateError: 'Completed' };

    const { value } = await contract.functions.echo_error_enum(enumParam).simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-of-enums-4
  });

  it('should throw when enum value is not present in Sway enum values', async () => {
    const unknownEnumVariant = 'NotSwayEnumValue';

    await expectToThrowFuelError(
      () => contract.functions.echo_state_error_enum(unknownEnumVariant).simulate(),
      new FuelError(FuelError.CODES.INVALID_DECODE_VALUE, 'Only one field must be provided.')
    );
  });

  it('should throw when the enum param is not present in Sway enum values', async () => {
    const unknownEnumParam = { StateError: 'NotSwayEnumValue' };

    await expectToThrowFuelError(
      () => contract.functions.echo_state_error_enum(unknownEnumParam).simulate(),
      new FuelError(FuelError.CODES.INVALID_DECODE_VALUE, 'Only one field must be provided.')
    );
  });
});
