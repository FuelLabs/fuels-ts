import { bn } from 'fuels';

/**
 * @group node
 * @group browser
 */
describe('unit-conversion', () => {
  it('should convert one gwei to wei', () => {
    // #region parse-units-1
    const oneGwei = bn.parseUnits('0.000000001')

    // 1
    const result = oneGwei.toNumber();
    // #endregion parse-units-1

    expect(result).toEqual(1);
  })

  it('should format one gwei', () => {
    // #region format-1
    const oneGwei = bn('1000000000');

    // "1.000"
    const result = oneGwei.format();
    // #endregion format-1

    expect(result).toEqual('1.000');
  })

  it('should format one gwei with precision', () => {
    // #region format-2
    const oneGwei = bn('1000000000');

    // "1.00"
    const result = oneGwei.format({
      precision: 2,
    });
    // #endregion format-2

    expect(result).toEqual('1.00');
  })

  it('should format units of one gwei', () => {
    // #region format-units-1
    const oneGwei = bn('1000000000');

    // "1.000000000"
    const result = oneGwei.formatUnits();
    // #endregion format-units-1

    expect(result).toEqual('1.000000000');
  })

  it('should format units of one ether', () => {
    // #region format-units-2
    const oneEther = bn('1000000000000000000');

    // "1.000000000000000000"
    const result = oneEther.formatUnits(18);
    // #endregion format-units-2

    const expected = '1.000000000000000000'; 
    expect(result).toEqual(expected);
  })


})