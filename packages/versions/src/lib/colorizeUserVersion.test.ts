import { cyan, red, green } from 'chalk';

import { colorizeUserVersion } from './colorizeUserVersion';

/**
 * @group node
 */
describe('colorizeUserVersion.js', () => {
  test('should colorize user versions just fine', () => {
    const version = '1.0.0';

    // cyan = used for displaying newer versions
    const newerVersion = colorizeUserVersion({
      version,
      isGt: true,
      isOk: true,
    });

    // green = used for displaying exact versions
    const exactVersion = colorizeUserVersion({
      version,
      isGt: false,
      isOk: true,
    });

    // red = used for displaying older versions
    const olderVersion = colorizeUserVersion({
      version,
      isGt: false,
      isOk: false,
    });

    expect(newerVersion).toEqual(cyan(version));
    expect(exactVersion).toEqual(green(version));
    expect(olderVersion).toEqual(red(version));
  });
});
