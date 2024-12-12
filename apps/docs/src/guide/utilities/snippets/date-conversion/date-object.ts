// #region date-object-methods
import { DateTime } from 'fuels';

const dateTime: DateTime = DateTime.fromUnixMilliseconds(1681391398000);

// Extends the Date object
const date: Date = dateTime;

// Date object methods
date.getTime(); // 1681391398000
date.toISOString(); // 2023-04-13T13:09:58.000Z
date.toDateString(); // Thu Apr 13 2023
// #endregion date-object-methods

const expectedTime = 1681391398000;
const expectedIsoString = '2023-04-13T13:09:58.000Z';
const expectedDateString = 'Thu Apr 13 2023';
console.log('Should equal expected time', date.getTime() === expectedTime);
console.log(
  'Should equal expected ISO string',
  date.toISOString() === expectedIsoString
);
console.log(
  'Should equal expected date string',
  date.toDateString() === expectedDateString
);
