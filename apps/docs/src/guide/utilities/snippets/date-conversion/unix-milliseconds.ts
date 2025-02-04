// #region from-unix-milliseconds-and-to-unix-milliseconds
import { DateTime } from 'fuels';

const date: DateTime = DateTime.fromUnixMilliseconds(1681391398000);

const unixMilliseconds: number = date.toUnixMilliseconds();
// 1681391398000
// #endregion from-unix-milliseconds-and-to-unix-milliseconds

const expectedUnixMilliseconds = 1681391398000;
console.log(
  'Should equal expected UNIX (ms)',
  unixMilliseconds === expectedUnixMilliseconds
);
