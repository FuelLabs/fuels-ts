import { hexlify } from '@ethersproject/bytes';
import fs from 'fs';
import { Provider } from 'fuels';
import path from 'path';

import { ExampleContractAbi__factory } from './example-contract-types';

const genSalt = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

describe('ExampleContract', () => {
  it('should return the input', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // Deploy
    const bytecode = fs.readFileSync(path.join(__dirname, '../out/debug/example-contract.bin'));
    const salt = genSalt();
    const { contractId } = await provider.submitContract(bytecode, salt);
    const contract = ExampleContractAbi__factory.connect(contractId, provider);

    // Call
    const result = await contract.functions.return_input(1337);

    // Assert
    expect(result.toNumber()).toEqual(1337);
  });
});
