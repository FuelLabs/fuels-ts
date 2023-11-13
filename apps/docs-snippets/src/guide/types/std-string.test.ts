import { TestNodeLauncher } from '@fuel-ts/test-utils';
import type { StdString } from 'fuels';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe('StdString', () => {
  it('should pass a std string to a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-std-string')],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region std-string-1
    // #context import type { StdString } from 'fuels';

    const stdString: StdString = 'Hello World';

    const { value } = await contract.functions.string_comparison(stdString).simulate();

    expect(value).toBeTruthy();
    // #endregion std-string-1
  });

  it('should retrieve a std string from a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-std-string')],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region std-string-2
    // #context import type { StdString } from 'fuels';

    const stdString: StdString = 'Hello Fuel';

    const { value } = await contract.functions.echo_string(stdString).simulate();

    expect(value).toEqual(stdString);
    // #endregion std-string-2
  });
});
