import { expectToBeInRange } from './expectToBeInRange';

/**
 * @group node
 */
describe('expectValueToBeInRange', () => {
  it('should throw an error when value is less than the minimum', () => {
    expect(() =>
      expectToBeInRange({
        value: 4,
        min: 5,
        max: 10,
      })
    ).toThrow(`Expected value: '4' to be within range: '5-10'`);
  });

  it('should throw an error when value is greater than the maximum', () => {
    expect(() =>
      expectToBeInRange({
        value: 11,
        min: 5,
        max: 10,
      })
    ).toThrow(`Expected value: '11' to be within range: '5-10'`);
  });

  it('should return true when value is equal to the minimum', () => {
    expectToBeInRange({
      value: 5,
      min: 5,
      max: 10,
    });
  });

  it('should return true when value is equal to the maximum', () => {
    expectToBeInRange({
      value: 10,
      min: 5,
      max: 10,
    });
  });

  it('should return true when value is within the range', () => {
    expectToBeInRange({
      value: 7,
      min: 5,
      max: 10,
    });
  });
});
