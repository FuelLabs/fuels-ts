import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';
import {} from 'ts-node';

describe('cli.js', () => {
  const files = [
    join(__dirname, './contracts.json'),
    join(__dirname, './contracts/foo/out'),
    join(__dirname, './contracts/bar/out'),
    join(__dirname, './types'),
  ];

  const cleanup = () => {
    files.forEach((file) => {
      rimraf.sync(file);
    });
  };

  beforeAll(cleanup);

  afterAll(cleanup);

  test('should execute cli routine and generate files', async () => {
    await execSync(['../node_modules/.bin/ts-node', '../dist/bin.js', 'run'].join(' '), {
      cwd: join(__dirname),
      stdio: 'ignore',
    });
    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });
    const contractsOutput = JSON.parse(readFileSync(join(__dirname, './contracts.json'), 'utf8'));
    expect(contractsOutput).toHaveProperty('CONTRACT_FOO');
    expect(contractsOutput).toHaveProperty('CONTRACT_BAR');
  });
});
