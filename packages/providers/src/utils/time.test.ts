import { fromTai64ToUnix, fromUnixToTai64 } from './time';

/**
 * @group node
 */
test('fromTai64ToUnix', () => {
  expect(fromTai64ToUnix('4611686020108779312')).toEqual(1681391398);
});

test('fromUnixToTai64', () => {
  expect(fromUnixToTai64(1681391398)).toEqual('4611686020108779312');
});
