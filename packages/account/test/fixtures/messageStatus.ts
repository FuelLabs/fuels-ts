import {
  GqlMessageState,
  type GqlGetMessageStatusQuery,
} from '../../src/providers/__generated__/operations';

export const messageStatusResponse: Omit<GqlGetMessageStatusQuery['messageStatus'], '__typename'> =
  {
    state: GqlMessageState.Spent,
  };
