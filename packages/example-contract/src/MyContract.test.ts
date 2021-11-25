import { hexlify } from '@ethersproject/bytes';
import { Provider, Contract } from '@fuel-ts/fuels';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import type { MyContract } from './MyContract-types';
import MyContractAbi from './MyContract.json';

const genSalt = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

describe('MyContract', () => {
  it('should return the input', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // Deploy
    const bytecode = fs.readFileSync(path.join(__dirname, './MyContract.bin'));
    const salt = genSalt();
    const { contractId } = await provider.submitContract(bytecode, salt);
    const contract = new Contract(contractId, MyContractAbi as any, provider) as MyContract;

    // Call
    const result = await contract.functions.return_input(1337);

    // Assert
    expect(result.toNumber()).to.eq(1337);
  });
});
