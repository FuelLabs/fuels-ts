import { getProgramDetails } from './utils';

/**
 * @group node
 */
describe('utils', () => {
  test('getProgramDetails skips invalid folder and logs it', () => {
    const spy = vi.spyOn(console, 'log');
    const buildDirs = ['invalid-folder'];
    const result = getProgramDetails(buildDirs);
    expect(result).toEqual([]);
    expect(spy).toHaveBeenCalledWith('No build outputs found in invalid-folder, skipping...');
  });
});
