import { GqlMessageState, type GqlGetMessageStatusQuery } from '../../__generated__/operations';

export const messageStatusResponse: Omit<GqlGetMessageStatusQuery['messageStatus'], '__typename'> =
  {
    state: GqlMessageState.Spent,
  };
