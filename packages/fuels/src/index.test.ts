import * as fuels from './index';

/**
 * @group node
 */
describe('index.js', () => {
  test('should export everything', () => {
    expect(fuels.hexlify).toBeTruthy();
    expect(fuels.arrayify).toBeTruthy();
    expect(fuels.concat).toBeTruthy();

    expect(fuels.AbiCoder).toBeTruthy();
    expect(fuels.Address).toBeTruthy();
    expect(fuels.FuelError).toBeTruthy();
    expect(fuels.Contract).toBeTruthy();
    expect(fuels.Predicate).toBeTruthy();
    expect(fuels.Account).toBeTruthy();
    expect(fuels.Provider).toBeTruthy();
    expect(fuels.Wallet).toBeTruthy();
    expect(fuels.TransactionType).toBeTruthy();
    expect(fuels.Script).toBeTruthy();
    expect(fuels.FunctionInvocationScope).toBeTruthy();
  });
});
