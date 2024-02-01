import { FuelWalletConnector } from './fuel-wallet-connector';
import type { ConnectorMetadata } from './types';

export class FuelWalletDevelopmentConnector extends FuelWalletConnector {
  metadata: ConnectorMetadata = {
    image: '/connectors/fuel-wallet-dev.svg',
    install: {
      action: 'Install',
      description: 'To connect your Fuel Wallet, you need to install the browser extension first.',
      link: 'https://chrome.google.com/webstore/detail/fuel-wallet-development/hcgmehahnlbhpilepakbdinkhhaackmc',
    },
  };

  constructor() {
    super('Fuel Wallet Development');
  }
}
