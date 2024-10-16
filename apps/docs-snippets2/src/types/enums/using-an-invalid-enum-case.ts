// #region snippet-1
// Valid case keys: 'StateError', 'UserError'
const enumParam6 = { UnknownKey: 'Completed' };

try {
  // @ts-expect-error UnknownKey is not a valid key
  await contract.functions.echo_error_enum(enumParam6).get();
} catch (error) {
  console.log('error', error);
}
// #endregion snippet-1
