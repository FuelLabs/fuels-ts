// #region create-from-multiple-sources
import { DateTime } from 'fuels';

const tai64: DateTime = DateTime.fromTai64('4611686020108779339');
const unixSeconds: DateTime = DateTime.fromUnixSeconds(1681391398);
const unixMilliseconds: DateTime = DateTime.fromUnixMilliseconds(1681391398000);
// #endregion create-from-multiple-sources

const expected = {
  tai64: '4611686020108779339',
  unixSeconds: 1681391398,
  unixMilliseconds: 1681391398000,
};
console.log('Tai64 should be expected', tai64.toTai64() === expected.tai64);
console.log(
  'UNIX (s) should be expected',
  unixSeconds.toUnixSeconds() === expected.unixSeconds
);
console.log(
  'UNIX (ms) should be expected',
  unixMilliseconds.toUnixMilliseconds() === expected.unixMilliseconds
);
