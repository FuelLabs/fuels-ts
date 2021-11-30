import { hexlify } from '@ethersproject/bytes';
import { Provider, Contract } from '@fuel-ts/fuels';
import fs from 'fs';
import path from 'path';

import type { MyContract } from './MyContract-types';

const genSalt = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

describe('MyContract', () => {
  it('should return the input', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // Deploy
    const bytecode = fs.readFileSync(path.join(__dirname, './MyContract.bin'));
    const salt = genSalt();
    const { contractId } = await provider.submitContract(bytecode, salt);
    const MyContractAbi = JSON.parse(
      fs.readFileSync(path.join(__dirname, './MyContract.json'), 'utf-8')
    );
    const contract = new Contract(contractId, MyContractAbi as any, provider) as MyContract;

    // Call
    const result = await contract.functions.return_input(1337);

    // Assert
    expect(result.toNumber()).toEqual(1337);
  });
});
