import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
test('isReadOnly returns true for read-only functions', async () => {
  const contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.COUNTER);

  // #region is-function-readonly-1
  const isReadOnly = contract.functions.get_count.isReadOnly();

  if (isReadOnly) {
    await contract.functions.get_count().get();
  } else {
    const { waitForResult } = await contract.functions.get_count().call();
    await waitForResult();
  }
  // #endregion is-function-readonly-1

  expect(isReadOnly).toBe(true);
});
