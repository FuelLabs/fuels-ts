import { bn } from '@fuel-ts/math';
import {
  transactionRequestify,
  type TransactionRequest,
  type TransactionRequestLike,
} from '../../src';

import { MockConnector } from './mocked-connector';

export class MockedPredicateConnector extends MockConnector {
  override name = 'Predicate Connector';

  override async onBeforeEstimation(
    _transaction: TransactionRequestLike
  ): Promise<TransactionRequest> {
    const transaction = transactionRequestify(_transaction);

    const currentTip = bn(transaction.tip);
    transaction.tip = currentTip.add(bn(1));

    return transaction;
  }
}
