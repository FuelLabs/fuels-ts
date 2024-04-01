import { bn } from 'fuels';

/**
 * @group node
 * @group browser
 */
describe('unit-conversion', () => {
  it('should parse small units', () => {
    const expected = "1"

    // #region parse-units-1
    const result = bn.parseUnits('0.000000001').toString();
    // "1"
    // #endregion parse-units-1

    expect(result).toEqual(expected);
  })

  it('should parse large units', () => {
    const expected = "100100000000000";

    // #region parse-units-2
    const result = bn.parseUnits('100100').toString();
    // "100100000000000"
    // #endregion parse-units-2

    expect(result).toEqual(expected);
  })

  it('should parse human readable numbers', () => {
    const expected = "100100000200001";

    // #region parse-units-3
    const result = bn.parseUnits('100,100.000200001').toString();
    // "100100000200001"
    // #endregion parse-units-3

    expect(result).toEqual(expected);
  })

  it('should parse different units', () => {
    const expected = "1000000000000000000";

    // #region parse-units-4
    const result = bn.parseUnits('1', 18).toString();
    // "1000000000000000000"
    // #endregion parse-units-4

    expect(result).toEqual(expected);
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