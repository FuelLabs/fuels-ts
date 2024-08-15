import type { StdString } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoStdStringFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('StdString', () => {
  it('should pass a std string to a contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoStdStringFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region std-string-1
    // #import { StdString };

    const stdString: StdString = 'Hello World';

    const { value } = await contract.functions.string_comparison(stdString).simulate();

    expect(value).toBeTruthy();
    // #endregion std-string-1
  });

  it('should retrieve a std string from a contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoStdStringFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region std-string-2
    // #import { StdString };

    const stdString: StdString = 'Hello Fuel';

    const { value } = await contract.functions.echo_string(stdString).simulate();

    expect(value).toEqual(stdString);
    // #endregion std-string-2
  });
});
