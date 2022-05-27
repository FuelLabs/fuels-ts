import { wallet } from './services/fuel-core/chainConfig.json';

process.env.GENESIS_SECRET = wallet.privateKey;
