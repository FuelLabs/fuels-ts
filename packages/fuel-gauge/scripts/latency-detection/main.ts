import 'dotenv/config';

import { setupPerformanceAnalysis, runOperations, parseResults, saveResults } from './helpers';
import { interContractCall } from './inter-contract-call';
import { missing4xOutputVariableCall } from './missing-4x-variable-output-call';
import { predicateSignatureValidation } from './predicate-signature-validation';
import { simpleTransfer } from './simple-transfer';

const { error } = console;
const main = async () => {
  const operations = [
    simpleTransfer,
    missing4xOutputVariableCall,
    interContractCall,
    predicateSignatureValidation,
  ];

  const operationsParams = await setupPerformanceAnalysis();
  const results = await runOperations(operations, operationsParams);
  const parsedResults = parseResults(results);
  saveResults(parsedResults);
};

main().catch(error);
