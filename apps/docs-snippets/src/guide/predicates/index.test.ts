import type { PredicateParams } from 'fuels';
import { Predicate } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';

/**
 * @group node
 */
describe(__filename, () => {
  const { abiContents: jsonAbi, binHexlified: binary } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.RETURN_TRUE_PREDICATE
  );

  it('should successfully instantiate a predicate', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    // #region predicate-index-2
    // #import { Predicate, PredicateParams };
    const predicateParams: PredicateParams = {
      bytecode: binary,
      provider,
      abi: jsonAbi,
    };
    const predicate = new Predicate(predicateParams);
    // #endregion predicate-index-2

    expect(predicate).toBeTruthy();
  });
});
