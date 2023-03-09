import { validateConfig } from './validateConfig';

describe('Bin Utils validateConfig', () => {
  it('Should pass valid configs', async () => {
    expect(
      await validateConfig({
        contracts: ['/foo', '/bar'],
        output: '/otuput',
      })
    ).toBeTruthy();
    expect(
      await validateConfig({
        workspace: '/workspace',
        output: '/otuput',
      })
    ).toBeTruthy();
  });
  it('Should fail with invalid configs', async () => {
    expect(
      validateConfig({
        output: '/otuput',
      })
    ).rejects.toThrowError('config.contracts should be a valid array');
    expect(
      validateConfig({
        contracts: [],
        output: '/otuput',
      })
    ).rejects.toThrowError('config.contracts should have at least 1 item');
    expect(
      validateConfig({
        workspace: '/workspace',
      })
    ).rejects.toThrowError('config.output should be a valid string');
  });
});
