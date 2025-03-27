import { mockStartFuelCore } from '../utils/mockAutoStartFuelCore';
import { mockLogger } from '../utils/mockLogger';
import { bootstrapProject, resetDiskAndMocks, runNode } from '../utils/runCommands';

const mockAll = () => {
  const logger = mockLogger();
  const {
    autoStartFuelCore,
    killChildProcess,
    fuelCore: { providerUrl },
  } = mockStartFuelCore();

  return {
    logger,
    autoStartFuelCore,
    killChildProcess,
    providerUrl,
  };
};

/**
 * @group node
 */
describe('node', () => {
  const paths = bootstrapProject(__filename);

  beforeEach(() => {
    mockLogger();
  });

  afterAll(() => {
    resetDiskAndMocks(paths.root);
  });

  it('should run `node` command [defaults]', async () => {
    const { autoStartFuelCore, killChildProcess, logger, providerUrl } = mockAll();

    await runNode({
      root: paths.root,
    });

    expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
    expect(logger.log).toHaveBeenCalledWith(`Started fuel core on ${providerUrl}`);
  });

  it('should run `node` command [custom port]', async () => {
    const { autoStartFuelCore, killChildProcess, logger, providerUrl } = mockAll();

    await runNode({
      root: paths.root,
      fuelCorePort: '4001',
    });

    expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
    expect(autoStartFuelCore).toHaveBeenCalledWith(
      expect.objectContaining({
        fuelCorePort: '4001',
      })
    );
    expect(logger.log).toHaveBeenCalledWith(`Started fuel core on ${providerUrl}`);
  });

  it('should run `node` command [custom fuel-core path]', async () => {
    const { autoStartFuelCore, killChildProcess, logger, providerUrl } = mockAll();

    await runNode({
      root: paths.root,
      fuelCorePath: 'fuels-core',
    });

    expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
    expect(autoStartFuelCore).toHaveBeenCalledWith(
      expect.objectContaining({ fuelCorePath: 'fuels-core' })
    );
    expect(logger.log).toHaveBeenCalledWith(`Started fuel core on ${providerUrl}`);
  });

  it('should fail if fuel-core fails to start', async () => {
    const { autoStartFuelCore, killChildProcess, logger } = mockAll();

    autoStartFuelCore.mockRejectedValue(new Error('Failed to start fuel-core'));

    await runNode({
      root: paths.root,
    });

    expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
    expect(logger.error).toHaveBeenCalledWith('Failed to start fuel-core');
  });
});
