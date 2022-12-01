import * as fuels from './index';

describe('index.js', () => {
  test('should export everything', async () => {
    expect(fuels.AbiCoder);
    expect(fuels.Address);
    expect(fuels.Contract);
    expect(fuels.Predicate);
    expect(fuels.Provider);
    expect(fuels.Wallet);
    expect(fuels.TransactionType);
    expect(fuels.versions);
    expect(true).toBeTruthy();
  });
});
