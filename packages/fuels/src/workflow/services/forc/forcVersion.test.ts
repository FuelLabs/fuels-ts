import { forcVersion } from './forcVersion';

jest.mock('child_process', () => ({
  execSync: jest.fn().mockReturnValue('0.1.0'),
}));

describe('Services Forc forcVersion', () => {
  it('Should return version when forc is detected', async () => {
    expect(await forcVersion()).toBe('0.1.0');
  });
  it('Should throw if forc is detected', async () => {
    const mockChildProcess = jest.requireMock('child_process');
    const { execSync } = jest.requireActual('child_process');

    mockChildProcess.execSync.mockImplementation(() =>
      // Execute a command that don't exists to emulate a error
      // of forc not exists/
      execSync('forc2 --version')
    );
    expect(forcVersion()).rejects.toThrowError(/Command forc not found/);
  });
});
