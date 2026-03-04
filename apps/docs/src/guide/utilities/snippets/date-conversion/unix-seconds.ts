// #region from-unix-seconds-and-to-unix-seconds
import { DateTime } from 'fuels';

const date: DateTime = DateTime.fromUnixSeconds(1681391398);

const unixSeconds: number = date.toUnixSeconds();
// 1681391398
// #endregion from-unix-seconds-and-to-unix-seconds

const expectedUnixSeconds = 1681391398;
console.log(
  'Should equal expected UNIX (s)',
  unixSeconds === expectedUnixSeconds
);
