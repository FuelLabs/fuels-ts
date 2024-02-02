import { MockConnector } from '../fixtures/mocked-connector';
import { promiseCallback } from '../fixtures/promise-callback';
import { Fuel } from '../fuel';
import { dispatchFuelConnectorEvent } from '../utils';

/**
 * @group browser
 */
describe('Fuel Connector on browser', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should add connector using window events', async () => {
    const fuel = new Fuel({
      connectors: [],
      storage: null,
    });
    let connectors = await fuel.connectors();
    expect(connectors.length).toBe(0);

    // listen to connection event
    const onConnectors = promiseCallback();
    fuel.on(fuel.events.connectors, onConnectors);

    // Trigger event to add connector
    dispatchFuelConnectorEvent(new MockConnector());

    // wait for the event to be triggered
    await onConnectors.promise;

    connectors = await fuel.connectors();
    expect(onConnectors).toBeCalledTimes(1);
    expect(onConnectors).toBeCalledWith(connectors);
    expect(connectors.length).toBeGreaterThan(0);
    expect(connectors[0].name).toEqual('Fuel Wallet');
    expect(connectors[0].installed).toEqual(true);
  });

  it('should retrieve default connector from storage', async () => {
    const walletConnector = new MockConnector({
      name: 'Fuel Wallet',
    });
    const thirdPartyConnector = new MockConnector({
      name: 'Third Party Wallet',
    });
    const fuel = new Fuel({
      connectors: [walletConnector, thirdPartyConnector],
      storage: window.localStorage,
    });

    // Select third party connector
    await fuel.selectConnector(thirdPartyConnector.name);

    const fuelNewInstance = new Fuel({
      connectors: [walletConnector, thirdPartyConnector],
      storage: window.localStorage,
    });
    await fuelNewInstance.hasConnector();
    expect(fuelNewInstance.currentConnector()?.name).toBe(thirdPartyConnector.name);
  });

  it('should use custom storage', async () => {
    const storage = {
      setItem: vi.fn(),
      getItem: vi.fn(),
      removeItem: vi.fn(),
    };
    const connector = new MockConnector();
    const fuel = new Fuel({
      connectors: [connector],
      storage,
    });

    await fuel.hasConnector();
    expect(storage.getItem).toBeCalledTimes(1);
    expect(storage.getItem).toBeCalledWith(Fuel.STORAGE_KEY);
    expect(storage.setItem).toBeCalledTimes(1);
    expect(storage.setItem).toBeCalledWith(Fuel.STORAGE_KEY, connector.name);
    await fuel.clean();
    expect(storage.removeItem).toBeCalledTimes(1);
    expect(storage.removeItem).toBeCalledWith(Fuel.STORAGE_KEY);
    await fuel.destroy();
    expect(storage.removeItem).toBeCalledTimes(2);
    expect(storage.removeItem).toBeCalledWith(Fuel.STORAGE_KEY);
  });

  it('should store on localStorage and remove on clean', async () => {
    const connector = new MockConnector();
    const fuel = new Fuel({
      connectors: [connector],
    });

    await fuel.hasConnector();
    const value = window.localStorage.getItem(Fuel.STORAGE_KEY);
    expect(value).toBeTruthy();
    expect(value).toEqual(connector.name);
    fuel.clean();
    const value2 = window.localStorage.getItem(Fuel.STORAGE_KEY);
    expect(value2).toBeFalsy();
  });

  it('should remove all listeners', async () => {
    const connector = new MockConnector();
    const fuel = new Fuel({
      connectors: [connector],
    });

    await fuel.hasConnector();
    const onConnection = vi.fn();
    fuel.on(fuel.events.connection, onConnection);

    // Expect to be call
    fuel.emit(fuel.events.connection, true);
    connector.emit(fuel.events.connection, true);
    expect(onConnection).toBeCalledTimes(2);
    onConnection.mockClear();
    // Expect to not be called after cleaning
    fuel.unsubscribe();
    fuel.emit(fuel.events.connection, true);
    connector.emit(fuel.events.connection, true);
    expect(onConnection).toBeCalledTimes(0);
  });

  it('should remove all listeners and clean storage on destroy', async () => {
    const connector = new MockConnector();
    const fuel = new Fuel({
      connectors: [connector],
    });

    await fuel.hasConnector();
    const onConnection = vi.fn();
    fuel.on(fuel.events.connection, onConnection);
    expect(window.localStorage.getItem(Fuel.STORAGE_KEY)).toBeTruthy();

    // Expect to not be called after cleaning
    fuel.destroy();
    fuel.emit(fuel.events.connection, true);
    connector.emit(fuel.events.connection, true);
    expect(onConnection).toBeCalledTimes(0);
    expect(window.localStorage.getItem(Fuel.STORAGE_KEY)).toBeFalsy();
  });
});
