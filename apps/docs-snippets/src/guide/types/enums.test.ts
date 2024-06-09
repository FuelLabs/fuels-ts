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
    // #region enum-3
    const enumVariant = 'Completed';

    const { value } = await contract.functions.echo_state_error_enum(enumVariant).simulate();

    expect(value).toEqual(enumVariant);
    // #endregion enum-3
  });

  it('should successfully echo a enum in a contract call (UserError Enum)', async () => {
    // #region enum-6
    const userErroVar = 'InsufficientPermissions';

    const enumParam = { UserError: userErroVar };

    const { value } = await contract.functions.echo_error_enum(enumParam).simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-6
  });

  it('should successfully echo a enum in a contract call (StateError Enum)', async () => {
    // #region enum-7
    const stateErrorVar = 'Completed';

    const enumParam = { StateError: stateErrorVar };

    const { value } = await contract.functions.echo_error_enum(enumParam).simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-7
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
