import * as checkForUpdatesMod from '../../src/cli/utils/checkForAndDisplayUpdates';

export const mockCheckForUpdates = () => {
  vi.spyOn(checkForUpdatesMod, 'checkForAndDisplayUpdates').mockImplementation(() =>
    Promise.resolve()
  );
};
