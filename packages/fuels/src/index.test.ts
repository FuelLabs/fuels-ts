import * as fuels from './index';

describe('index.js', () => {
  test('should export everything', async () => {
    expect(fuels.AbiCoder).toBeTruthy();
    expect(fuels.Address).toBeTruthy();
    expect(fuels.Contract).toBeTruthy();
    expect(fuels.Predicate).toBeTruthy();
    expect(fuels.Account).toBeTruthy();
    expect(fuels.Provider).toBeTruthy();
    expect(fuels.Wallet).toBeTruthy();
    expect(fuels.TransactionType).toBeTruthy();
    expect(fuels.ScriptResultDecoderError).toBeTruthy();
  });
});
