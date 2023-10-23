import * as fuels from './index';

describe('index.js', () => {
  test('should export everything', () => {
    expect(fuels.hexlify).toBeTruthy();
    expect(fuels.arrayify).toBeTruthy();

    expect(fuels.Interface).toBeTruthy();
    expect(fuels.Address).toBeTruthy();
    expect(fuels.Contract).toBeTruthy();
    expect(fuels.Predicate).toBeTruthy();
    expect(fuels.Account).toBeTruthy();
    expect(fuels.Provider).toBeTruthy();
    expect(fuels.Wallet).toBeTruthy();
    expect(fuels.TransactionType).toBeTruthy();
    expect(fuels.ScriptResultDecoderError).toBeTruthy();
    expect(fuels.Script).toBeTruthy();
    expect(fuels.FunctionInvocationScope).toBeTruthy();
    expect(fuels.arrayify).toBeTruthy();
    expect(fuels.hexlify).toBeTruthy();
    expect(fuels.concat).toBeTruthy();
  });
});
