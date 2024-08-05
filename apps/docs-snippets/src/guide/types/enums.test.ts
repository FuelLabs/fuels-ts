import { FuelError, type Contract } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

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

  it('should throw when enum value is not the correct type', async () => {
    // #region enum-error-mismatch-type
    // Valid types: string
    const emumValue: number = 1;

    await expectToThrowFuelError(
      () => contract.functions.echo_state_error_enum(emumValue).simulate(),
      new FuelError(FuelError.CODES.INVALID_DECODE_VALUE, 'A field for the case must be provided.')
    );
    // #endregion enum-error-mismatch-type
  });

  it('should throw when enum value is not present in Sway enum values', async () => {
    // #region enum-error-value-mismatch
    // Valid values: 'Void', 'Pending', 'Completed'
    const emumValue = 'NotStateEnumValue';

    await expectToThrowFuelError(
      () => contract.functions.echo_state_error_enum(emumValue).simulate(),
      new FuelError(FuelError.CODES.INVALID_DECODE_VALUE, 'Only one field must be provided.')
    );
    // #endregion enum-error-value-mismatch
  });

  it('should throw when using incorrect key for enum of enums', async () => {
    // #region enum-error-case-key-mismatch
    // Valid case keys: 'StateError', 'UserError'
    const enumParam = { UnknownKey: 'Completed' };

    await expectToThrowFuelError(
      () => contract.functions.echo_error_enum(enumParam).simulate(),
      new FuelError(
        FuelError.CODES.INVALID_DECODE_VALUE,
        `Invalid case 'UnknownKey'. Valid cases: 'StateError', 'UserError'.`
      )
    );
    // #endregion enum-error-case-key-mismatch
  });
});
