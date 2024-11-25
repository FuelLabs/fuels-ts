// #region from-tai-64-and-to-tai-64
import { DateTime } from 'fuels';

const date: DateTime = DateTime.fromTai64('4611686020108779339');

const tai64: string = date.toTai64();
// "4611686020108779339"
// #endregion from-tai-64-and-to-tai-64

const expectedIsoString = '2023-04-13T13:09:58.000Z';
const expectedTai64 = '4611686020108779339';
console.log(
  'Should equal expected ISO string',
  date.toISOString() === expectedIsoString
);
console.log('Should equal expected TAI 64', tai64 === expectedTai64);
