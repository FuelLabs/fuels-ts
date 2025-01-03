// #region fuel-options-target-object
import { Fuel } from 'fuels';
import type { TargetObject } from 'fuels';

const emptyWindow = {} as unknown as TargetObject;

const targetObject: TargetObject = emptyWindow || document;

const sdkWithTargetObject = await new Fuel({
  targetObject,
}).init();
// #endregion fuel-options-target-object
console.log('sdkWithTargetObject', sdkWithTargetObject);
