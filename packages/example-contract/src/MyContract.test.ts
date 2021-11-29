import { hexlify } from '@ethersproject/bytes';
import { Provider } from '@fuel-ts/fuels';
import fs from 'fs';
import path from 'path';

import { MyContract__factory } from './MyContract-types';

const genSalt = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

describe('MyContract', () => {
  it('should return the input', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    // Deploy
    const bytecode = fs.readFileSync(path.join(__dirname, './MyContract.bin'));
    const salt = genSalt();
    const { contractId } = await provider.submitContract(bytecode, salt);
    const contract = MyContract__factory.connect(contractId, provider);

    // Call
    const result = await contract.functions.return_input(1337);

    // Assert
    expect(result.toNumber()).toEqual(1337);
  });
});
