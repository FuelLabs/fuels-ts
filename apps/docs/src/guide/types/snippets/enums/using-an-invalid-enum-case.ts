// #region snippet-1
// Valid case keys: 'StateError', 'UserError'
const enumParam = { UnknownKey: 'Completed' };

try {
  // @ts-expect-error UnknownKey is not a valid key
  await contract.functions.echo_error_enum(enumParam).get();
} catch (error) {
  console.log('error', error);
}
// #endregion snippet-1
