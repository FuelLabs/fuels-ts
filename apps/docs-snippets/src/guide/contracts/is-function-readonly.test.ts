import { bn } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

test('isReadOnly returns true for read-only functions', async () => {
  const contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.COUNTER);

  // #region is-function-readonly-1
  const isReadOnly = contract.functions.get_count().isReadOnly();

  expect(isReadOnly).toBe(true);

  if (isReadOnly) {
    await contract.functions.get_count().get();
  } else {
    await contract.functions.get_count().call();
  }
  // #endregion is-function-readonly-1
});

test('isReadOnly returns false for functions containing write operations', async () => {
  const contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.COUNTER);

  const isReadOnly = contract.functions.increment_count(bn(1)).isReadOnly();

  expect(isReadOnly).toBe(false);
});
