import { fromTai64ToUnix, fromUnixToTai64 } from './time';

/**
 * @group node
 */
test('fromTai64ToUnix', () => {
  const unixTimestampInSeconds = 1681391398;
  const tai64Timestamp = '4611686020108779312';

  const result = fromTai64ToUnix(tai64Timestamp);

  expect(result).toEqual(unixTimestampInSeconds);
});

test('fromUnixToTai64', () => {
  const unixTimestampInSeconds = 1681391398;
  const tai64Timestamp = '4611686020108779312';

  const result = fromUnixToTai64(unixTimestampInSeconds);

  expect(result).toEqual(tai64Timestamp);
});
