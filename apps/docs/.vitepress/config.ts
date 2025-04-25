import { defineConfig } from 'vitepress';
import { codeInContextPlugin } from './plugins/codeInContextPlugin';
import { snippetPlugin } from './plugins/snippetPlugin';

export default defineConfig({
  title: 'Fuels-ts',
  description: 'Fuel Typescript SDK',
  srcDir: 'src',
  outDir: 'dist',
  lang: 'en-US',
  appearance: 'dark',
  markdown: {
    config: (md) => {
      md.use(snippetPlugin);
      md.use(codeInContextPlugin);
      md.block.ruler.disable('snippet');
      md.core.ruler.before('normalize', 'replace-docs-api-url', (state) => {
        const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5174' : '/api';
        state.src = state.src.replace(/DOCS_API_URL/g, apiUrl);
      });
    },
  },
  transformHtml: (code) => {
    // make the API links open in a new tab
    // because opening in the same tab doesn't work in the preview
    return code.replace(/(<a\s+[^>]*href="\/api\/[^"]*")/g, '$1 target="_blank" rel="noreferrer"');
  },
  // Finds dead DOCS_API_URL links and fails,
  // but they get replaced later in the markdown transformer.
  // We have the md link checker workflow which covers this.
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/fuels-ts/favicon.ico', type: 'image/png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://fuellabs.github.io/fuels-ts/' }],
  ],
  themeConfig: {
    logo: 'fuel-logo.png',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/FuelLabs/fuels-ts' },
      { icon: 'twitter', link: 'https://twitter.com/fuel_network' },
      { icon: 'discord', link: 'https://discord.com/invite/xfpK4Pe' },
    ],
    editLink: {
      pattern: 'https://github.com/fuellabs/fuels-ts/edit/master/apps/docs/src/:path',
      text: 'Edit this page on GitHub',
    },
    sidebar: [
      {
        items: [
          {
            text: 'Getting Started',
            link: '/guide/getting-started/',
            collapsed: true,
            items: [
              {
                text: 'Installation',
                link: '/guide/getting-started/installation',
              },
              {
                text: 'Connecting to the Network',
                link: '/guide/getting-started/connecting-to-the-network',
              },
              {
                text: 'Running a local Fuel node',
                link: '/guide/getting-started/running-a-local-fuel-node',
              },
              {
                text: 'React Example',
                link: '/guide/getting-started/react-example',
              },
              {
                text: 'CDN Usage',
                link: '/guide/getting-started/cdn-usage',
              },
              {
                text: 'Next Steps',
                link: '/guide/getting-started/next-steps',
              },
            ],
          },
          {
            text: 'The UTXO Model',
            link: '/guide/the-utxo-model/',
            collapsed: false,
            items: [],
          },
          {
            text: 'Creating a Fuel dApp',
            link: '/guide/creating-a-fuel-dapp/',
            collapsed: true,
            items: [
              {
                text: 'Options',
                link: '/guide/creating-a-fuel-dapp/options',
              },
              {
                text: 'Deploying a dApp to Testnet',
                link: '/guide/creating-a-fuel-dapp/deploying-a-dapp-to-testnet',
              },
              {
                text: 'Working with Predicates',
                link: '/guide/creating-a-fuel-dapp/working-with-predicates',
              },
            ],
          },
          {
            text: 'fuels CLI',
            link: '/guide/fuels-cli/',
            collapsed: true,
            items: [
              {
                text: 'Config File',
                link: '/guide/fuels-cli/config-file',
              },
              {
                text: 'Commands',
                link: '/guide/fuels-cli/commands',
              },
              {
                text: 'ABI Typegen',
                link: '/guide/fuels-cli/abi-typegen',
              },
              {
                text: 'Generating Types',
                link: '/guide/fuels-cli/generating-types',
              },
              {
                text: 'Using Generated Types',
                link: '/guide/fuels-cli/using-generated-types',
              },
            ],
          },
          {
            text: 'Provider',
            link: '/guide/provider/',
            collapsed: true,
            items: [
              {
                text: 'Provider Options',
                link: '/guide/provider/provider-options',
              },
              {
                text: 'Pagination',
                link: '/guide/provider/pagination',
              },
              {
                text: 'Querying the Chain',
                link: '/guide/provider/querying-the-chain',
              },
              {
                text: 'RPC Consistency',
                link: '/guide/provider/rpc-consistency',
              },
            ],
          },
          {
            text: 'Wallets',
            link: '/guide/wallets/',
            collapsed: true,
            items: [
              {
                text: 'Instantiating Wallets',
                link: '/guide/wallets/instantiating-wallets',
              },
              {
                text: 'Private Keys',
                link: '/guide/wallets/private-keys',
              },
              {
                text: 'Mnemonic Wallet',
                link: '/guide/wallets/mnemonic-wallet',
              },
              {
                text: 'Encrypting and Decrypting',
                link: '/guide/wallets/encrypting-and-decrypting',
              },
              {
                text: 'Checking Balances',
                link: '/guide/wallets/checking-balances',
              },
              {
                text: 'Wallet Transferring',
                link: '/guide/wallets/wallet-transferring',
              },
              {
                text: 'Signing',
                link: '/guide/wallets/signing',
              },
              {
                text: 'Connectors',
                link: '/guide/wallets/connectors',
              },
              {
                text: 'Wallet Manager',
                link: '/guide/wallets/wallet-manager',
              },
              {
                text: 'Locking and Unlocking',
                link: '/guide/wallets/locking-and-unlocking',
              },
            ],
          },
          {
            text: 'Contracts',
            link: '/guide/contracts/',
            collapsed: true,
            items: [
              {
                text: 'Methods',
                link: '/guide/contracts/methods',
              },
              {
                text: 'Call Parameters',
                link: '/guide/contracts/call-parameters',
              },
              {
                text: 'Contract Balance',
                link: '/guide/contracts/contract-balance',
              },
              {
                text: 'Cost Estimation',
                link: '/guide/contracts/cost-estimation',
              },
              {
                text: 'Dependency Estimation',
                link: '/guide/contracts/dependency-estimation',
              },
              {
                text: 'Variable Outputs',
                link: '/guide/contracts/variable-outputs',
              },
              {
                text: 'Logs',
                link: '/guide/contracts/logs',
              },
              {
                text: 'Inter-contract Calls',
                link: '/guide/contracts/inter-contract-calls',
              },
              {
                text: 'Multi-contract calls',
                link: '/guide/contracts/multi-contract-calls',
              },
              {
                text: 'Using different Wallets',
                link: '/guide/contracts/using-different-wallets',
              },
              {
                text: 'Transferring Assets',
                link: '/guide/contracts/transferring-assets',
              },
              {
                text: 'Deploying Contracts',
                link: '/guide/contracts/deploying-contracts',
              },
              {
                text: 'Storage Slots',
                link: '/guide/contracts/storage-slots',
              },
              {
                text: 'Configurable Constants',
                link: '/guide/contracts/configurable-constants',
              },
              {
                text: 'Minted Token Asset ID',
                link: '/guide/contracts/minted-token-asset-id',
              },
              {
                text: 'Managing Deployed Contracts',
                link: '/guide/contracts/managing-deployed-contracts',
              },
              {
                text: 'Proxy Contracts',
                link: '/guide/contracts/proxy-contracts',
              },
              {
                text: 'Understanding the FuelVM Binary File',
                link: '/guide/contracts/understanding-the-fuelvm-binary-file',
              },
            ],
          },
          {
            text: 'Scripts',
            link: '/guide/scripts/',
            collapsed: true,
            items: [
              {
                text: 'Instantiating A Script',
                link: '/guide/scripts/instantiating-a-script',
              },
              {
                text: 'Deploying Scripts',
                link: '/guide/scripts/deploying-scripts',
              },
              {
                text: 'Configurable Constants',
                link: '/guide/scripts/configurable-constants',
              },
              {
                text: 'Running scripts',
                link: '/guide/scripts/running-scripts',
              },
              {
                text: 'Custom script Call',
                link: '/guide/scripts/custom-script-call',
              },
              {
                text: 'Logs',
                link: '/guide/scripts/logs',
              },
            ],
          },
          {
            text: 'Predicates',
            link: '/guide/predicates/',
            collapsed: true,
            items: [
              {
                text: 'Instantiating A Predicate',
                link: '/guide/predicates/instantiating-a-predicate',
              },
              {
                text: 'Deploying Predicates',
                link: '/guide/predicates/deploying-predicates',
              },
              {
                text: 'Configurable Constants',
                link: '/guide/predicates/configurable-constants',
              },
              {
                text: 'Send And Spend Funds From Predicates',
                link: '/guide/predicates/send-and-spend-funds-from-predicates',
              },
              {
                text: 'Methods',
                link: '/guide/predicates/methods',
              },
              {
                text: 'Custom Transactions',
                link: '/guide/predicates/custom-transactions',
              },
            ],
          },
          {
            text: 'Transactions',
            link: '/guide/transactions/',
            collapsed: true,
            items: [
              {
                text: 'Assemble TX',
                link: '/guide/transactions/assemble-tx',
              },
              {
                text: 'Assemble TX Migration Guide',
                link: '/guide/transactions/assemble-tx-migration-guide',
              },
              {
                text: 'Modifying the Request',
                link: '/guide/transactions/modifying-the-request',
              },
              {
                text: 'Adding Parameters',
                link: '/guide/transactions/adding-parameters',
              },
              {
                text: 'Adding Policies',
                link: '/guide/transactions/adding-policies',
              },
              {
                text: 'Getting the Response',
                link: '/guide/transactions/getting-the-response',
              },
              {
                text: 'Optimizing Frontend Apps',
                link: '/guide/transactions/optimizing-frontend-apps',
              },
            ],
          },
          {
            text: 'Encoding',
            link: '/guide/encoding/',
            collapsed: true,
            items: [
              {
                text: 'Encode and Decode',
                link: '/guide/encoding/encode-and-decode',
              },
              {
                text: 'Working with Bytes',
                link: '/guide/encoding/working-with-bytes',
              },
            ],
          },
          {
            text: 'Utilities',
            link: '/guide/utilities/',
            collapsed: true,
            items: [
              {
                text: 'Date conversion',
                link: '/guide/utilities/date-conversion',
              },
              {
                text: 'Address conversion',
                link: '/guide/utilities/address-conversion',
              },
              {
                text: 'Unit conversion',
                link: '/guide/utilities/unit-conversion',
              },
              {
                text: 'Using assets',
                link: '/guide/utilities/using-assets',
              },
              {
                text: 'Asset API',
                link: '/guide/utilities/asset-api',
              },
            ],
          },
          {
            text: 'Cookbook',
            link: '/guide/cookbook/',
            collapsed: true,
            items: [
              {
                text: 'Deposit And Withdraw',
                link: '/guide/cookbook/deposit-and-withdraw',
              },
              {
                text: 'Wallet SDK and React Hooks',
                link: '/guide/cookbook/wallet-sdk-and-react-hooks',
              },
              {
                text: 'Custom Transactions',
                link: '/guide/cookbook/custom-transactions',
              },
              {
                text: 'Custom Transactions from Contract Calls',
                link: '/guide/cookbook/custom-transactions-from-contract-calls',
              },
              {
                text: 'Generate Fake Resources',
                link: '/guide/cookbook/generate-fake-resources',
              },
              {
                text: 'Sway Script with Signature Validation',
                link: '/guide/cookbook/sway-script-with-signature-validation',
              },
              {
                text: 'GraphQL Integration',
                link: '/guide/cookbook/graphql-integration',
              },
              {
                text: 'Resubmitting Failed Transactions',
                link: '/guide/cookbook/resubmitting-failed-transactions',
              },
              {
                text: 'Combining UTXOs',
                link: '/guide/cookbook/combining-utxos',
              },
              {
                text: 'Splitting UTXOs',
                link: '/guide/cookbook/splitting-utxos',
              },
              {
                text: 'Optimized React Example',
                link: '/guide/cookbook/optimized-react-example',
              },
            ],
          },
          {
            text: 'Testing',
            link: '/guide/testing/',
            collapsed: true,
            items: [
              {
                text: 'Launching a Test Node',
                link: '/guide/testing/launching-a-test-node',
              },
              {
                text: 'Test Node Options',
                link: '/guide/testing/test-node-options',
              },
              {
                text: 'Fuel Core Options',
                link: '/guide/testing/fuel-core-options',
              },
              {
                text: 'Basic Example',
                link: '/guide/testing/basic-example',
              },
              {
                text: 'Advanced Example',
                link: '/guide/testing/advanced-example',
              },
              {
                text: 'Custom Blocks',
                link: '/guide/testing/custom-blocks',
              },
              {
                text: 'Setting up test wallets',
                link: '/guide/testing/setting-up-test-wallets',
              },
            ],
          },
          {
            text: 'Types',
            link: '/guide/types/',
            collapsed: true,
            items: [
              {
                text: 'Address',
                link: '/guide/types/address',
              },
              {
                text: 'Arrays',
                link: '/guide/types/arrays',
              },
              {
                text: 'Asset Id',
                link: '/guide/types/asset-id',
              },
              {
                text: 'B256',
                link: '/guide/types/b256',
              },
              {
                text: 'B512',
                link: '/guide/types/b512',
              },
              {
                text: 'Bytes',
                link: '/guide/types/bytes',
              },
              {
                text: 'Bytes32',
                link: '/guide/types/bytes32',
              },
              {
                text: 'Enums',
                link: '/guide/types/enums',
              },
              {
                text: 'Evm Address',
                link: '/guide/types/evm-address',
              },
              {
                text: 'Native Parameters',
                link: '/guide/types/native-parameters',
              },
              {
                text: 'Numbers',
                link: '/guide/types/numbers',
              },
              {
                text: 'Options',
                link: '/guide/types/options',
              },
              {
                text: 'Raw Slice',
                link: '/guide/types/raw-slice',
              },
              {
                text: 'Std String',
                link: '/guide/types/std-string',
              },
              {
                text: 'String',
                link: '/guide/types/string',
              },
              {
                text: 'Structs',
                link: '/guide/types/structs',
              },
              {
                text: 'Tuples',
                link: '/guide/types/tuples',
              },
              {
                text: 'Vectors',
                link: '/guide/types/vectors',
              },
            ],
          },
          {
            text: 'Errors',
            link: '/guide/errors/',
            collapsed: false,
            items: [],
          },
        ],
      },
    ],
  },
});
