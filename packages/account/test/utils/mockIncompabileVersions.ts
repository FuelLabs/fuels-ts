import * as fuelTsVersionsMod from '@fuel-ts/versions';
import { versions } from '@fuel-ts/versions';

export const mockIncompatibleVersions = (opts: {
  isMajorMismatch: boolean;
  isMinorMismatch: boolean;
}) => {
  const mismatch = (current: string) => (current === '0' ? 1 : parseInt(current, 10) - 1);

  const { isMajorMismatch, isMinorMismatch } = opts;
  const { FUEL_CORE } = versions;
  const [currentMajor, currentMinor, currentPatch] = FUEL_CORE.split('.');
  const [major, minor, patch] = [
    isMajorMismatch ? mismatch(currentMajor) : currentMajor,
    isMinorMismatch ? mismatch(currentMinor) : currentMinor,
    currentPatch,
  ].map(String);

  const mock = {
    isMajorSupported: major !== currentMajor,
    isMinorSupported: minor !== currentMinor,
    isPatchSupported: patch !== currentPatch,
    supportedVersion: `${major}.${minor}.${patch}`,
  };

  if (mock.supportedVersion === FUEL_CORE) {
    throw new Error();
  }

  const spy = vi.spyOn(fuelTsVersionsMod, 'checkFuelCoreVersionCompatibility');
  spy.mockImplementationOnce(() => mock);

  return {
    current: { FUEL_CORE },
    supported: { FUEL_CORE: mock.supportedVersion },
  };
};
