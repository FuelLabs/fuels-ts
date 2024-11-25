// #region snippet-1
// Valid types: string
const emumParam = 1;

try {
  // @ts-expect-error number is not a valid type
  await contract.functions.echo_state_error_enum(emumParam).get();
} catch (error) {
  console.log('error', error);
}
// #endregion snippet-1
