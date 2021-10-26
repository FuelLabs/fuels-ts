import { hexlify } from '@ethersproject/bytes';
import { Provider, Contract, getContractId } from '@fuel-ts/fuels';
import fs from 'fs';

import type { MyContract } from './MyContract-types';
import MyContractAbi from './MyContract.json';

const genSalt = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

describe('MyContract', () => {
  it('should return the input', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const bytecode = fs.readFileSync('./src/MyContract.bin');
    const salt = genSalt();
    const contractId = getContractId(bytecode, salt);

    await provider.submitContract(bytecode, salt);

    const contract = new Contract(contractId, MyContractAbi as any, provider) as MyContract;

    const result = await contract.functions.return_input(1337);

    expect(result.toNumber()).toEqual(1337);
  });
});
