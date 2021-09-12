import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-typechain';
import 'hardhat-deploy';
import 'solidity-coverage';
// import 'hardhat-gas-reporter';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
const ROPSTEN_PRIVATE_KEY =
  process.env.ROPSTEN_PRIVATE_KEY ||
  '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'; // well known private key
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [
      {
        version: '0.7.4',
      },
    ],
  },
  mocha: {
    timeout: 180_000,
  },
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ROPSTEN_PRIVATE_KEY],
    },
    coverage: {
      url: 'http://127.0.0.1:8555',
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
