import { GqlMessageState, type GqlGetMessageStatusQuery } from '../../src/__generated__/operations';

export const messageStatusResponse: Omit<GqlGetMessageStatusQuery['messageStatus'], '__typename'> =
  {
    state: GqlMessageState.Spent,
  };
