import { toThrowExact } from './src/to-throw-exact';
import { toThrowFuelError } from './src/to-throw-fuel-error';

expect.extend({
  toThrowExact,
  toThrowFuelError,
});
