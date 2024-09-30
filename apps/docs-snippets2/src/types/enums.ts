// #region full
import { FuelError, Provider, Wallet } from 'fuels';
import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoEnumFactory } from '../typegend';
import { StateErrorInput, UserErrorInput } from '../typegend/contracts/EchoEnum';
import { expectToThrowFuelError } from 'fuels/test-utils';

const provider = await Provider.create(LOCAL_NETWORK_URL);

let wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await EchoEnumFactory.deploy(wallet);

const { contract } = await deploy.waitForResult();

// #region enums-3
const enumParam1 = StateErrorInput.Completed;

const { value: value1 } = await contract.functions.echo_state_error_enum(enumParam1).simulate();

expect(value1).toEqual(enumParam1);
// #endregion enums-3

// #region enums-6
const enumParam2 = { UserError: UserErrorInput.InsufficientPermissions };

const { value: value2 } = await contract.functions.echo_error_enum(enumParam2).simulate();

expect(value2).toEqual(enumParam2);
// #endregion enums-6

// #region enums-7
const enumParam3 = { StateError: StateErrorInput.Completed };

const { value: value3 } = await contract.functions.echo_error_enum(enumParam3).simulate();

expect(value3).toEqual(enumParam3);
// #endregion enums-7

// #region enums-8
// Valid types: string
const emumParam4 = 1;

await expectToThrowFuelError(
  // @ts-expect-error number is not a valid type
  () => contract.functions.echo_state_error_enum(emumParam4).simulate(),
  new FuelError(FuelError.CODES.INVALID_DECODE_VALUE, 'A field for the case must be provided.')
);
// #endregion enums-8

// #region enums-9
// Valid values: 'Void', 'Pending', 'Completed'
const emumParam5 = 'NotStateEnumValue';

await expectToThrowFuelError(
  // @ts-expect-error NotStateEnumValue is not a valid value
  () => contract.functions.echo_state_error_enum(emumParam5).simulate(),
  new FuelError(FuelError.CODES.INVALID_DECODE_VALUE, 'Only one field must be provided.')
);
// #endregion enums-9

// #region enums-10
// Valid case keys: 'StateError', 'UserError'
const enumParam6 = { UnknownKey: 'Completed' };

await expectToThrowFuelError(
  // @ts-expect-error UnknownKey is not a valid key
  () => contract.functions.echo_error_enum(enumParam6).simulate(),
  new FuelError(
    FuelError.CODES.INVALID_DECODE_VALUE,
    `Invalid case 'UnknownKey'. Valid cases: 'StateError', 'UserError'.`
  )
);
// #endregion enums-10
// #endregion full
