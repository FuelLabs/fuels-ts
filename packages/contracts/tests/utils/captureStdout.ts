export function captureStdout(spy: ReturnType<typeof jest.spyOn>) {
  const out = spy.mock.calls.reduce((output, call) => {
    const [message] = call;
    return `${output}${message.toString()}`;
  }, '');
  return out;
}
