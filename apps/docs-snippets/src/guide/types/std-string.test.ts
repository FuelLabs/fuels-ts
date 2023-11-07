import { TestNodeLauncher } from '@fuel-ts/test-utils';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe('StdString', () => {
  beforeAll(async (ctx) => {
    await TestNodeLauncher.prepareCache(ctx.tasks.length);

    return () => TestNodeLauncher.killCachedNodes();
  });

  it('should pass a std string to a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-std-string')],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region std-string-1

    const stdString = 'Hello World';

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

    const stdString = 'Hello Fuel';

    const { value } = await contract.functions.echo_string(stdString).simulate();

    expect(value).toEqual(stdString);
    // #endregion std-string-2
  });
});
