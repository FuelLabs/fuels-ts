import { FuelError } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { EchoEnumFactory } from '../../../test/typegen';
import { StateErrorInput, UserErrorInput } from '../../../test/typegen/contracts/EchoEnum';

/**
 * @group node
 * @group browser
 */
describe('Enums Types', () => {
  it('should successfully echo a simple enum in a contract call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEnumFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region simple-enum-3
    // #context import { StateErrorInput } from '../path/to/typegen/contracts/EchoEnum';

    const enumVariant = StateErrorInput.Completed;

    const { value } = await contract.functions.echo_state_error_enum(enumVariant).simulate();

    expect(value).toEqual(enumVariant);
    // #endregion simple-enum-3
  });

  it('should successfully echo a enum in a contract call (UserError Enum)', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEnumFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region enum-of-enums-3
    // #context import { UserErrorInput } from '../path/to/typegen/contracts/EchoEnum';
    const enumParam = { UserError: UserErrorInput.InsufficientPermissions };

    const { value } = await contract.functions.echo_error_enum(enumParam).simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-of-enums-3
  });

  it('should successfully echo a enum in a contract call (StateError Enum)', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEnumFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region enum-of-enums-4
    // #context import { StateErrorInput } from '../path/to/typegen/contracts/EchoEnum';

    const enumParam = { StateError: StateErrorInput.Completed };

    const { value } = await contract.functions.echo_error_enum(enumParam).simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-of-enums-4
  });

  it('should throw when enum value is not the correct type', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEnumFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEnumFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoEnumFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

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
