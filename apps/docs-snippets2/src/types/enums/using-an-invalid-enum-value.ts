// #region snippet-1
// Valid values: 'Void', 'Pending', 'Completed'
const emumParam = 'NotStateEnumValue';

try {
  // @ts-expect-error NotStateEnumValue is not a valid value
  await contract.functions.echo_state_error_enum(emumParam).get();
} catch (error) {
  console.log('error', error);
}
// #endregion snippet-1
