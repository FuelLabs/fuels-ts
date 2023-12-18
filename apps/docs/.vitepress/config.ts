import { defineConfig } from 'vitepress';
import { codeInContextPlugin } from './plugins/codeInContextPlugin';
import { snippetPlugin } from './plugins/snippetPlugin';
import apiLinks from '../.typedoc/api-links.json';

export default defineConfig({
  title: 'Fuels-ts',
  description: 'Fuel Labs Typescript SDK',
  base: '/fuels-ts/',
  srcDir: 'src',
  outDir: 'dist',
  lang: 'en-US',
  appearance: 'dark',
  markdown: {
    config: (md) => {
      md.use(snippetPlugin);
      md.use(codeInContextPlugin);
      md.block.ruler.disable('snippet');
    },
  },
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
        text: 'Introduction',
        link: '/',
        items: [
          {
            text: 'Getting Started',
            link: '/getting-started',
          },
          {
            text: 'Glossary',
            link: '/glossary',
          },
        ],
      },
      {
        text: 'Guide',
        link: '/guide/',
        items: [
          {
            text: 'CLI',
            link: '/guide/cli/',
            collapsed: true,
            items: [
              {
                text: 'Commands',
                link: '/guide/cli/commands',
              },
              {
                text: 'Config File',
                link: '/guide/cli/config-file',
              },
              {
                text: 'Built-in Binaries',
                link: '/guide/cli/built-in-binaries',
              },
            ],
          },
          {
            text: 'Quickstart',
            link: '/guide/quickstart/',
            items: [
              {
                text: 'Address',
                link: '/guide/types/address',
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
                text: 'Evm Address',
                link: '/guide/types/evm-address',
              },
              {
                text: 'Asset Id',
                link: '/guide/types/asset-id',
              },
              {
                text: 'Arrays',
                link: '/guide/types/arrays',
              },
              {
                text: 'Bech32',
                link: '/guide/types/bech32',
              },
              {
                text: 'Bits256',
                link: '/guide/types/bits256',
              },
              {
                text: 'Bits512',
                link: '/guide/types/bits512',
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
                text: 'String',
                link: '/guide/types/string',
              },
              {
                text: 'Std String',
                link: '/guide/types/std-string',
              },
              {
                text: 'Enums',
                link: '/guide/types/enums',
              },
              {
                text: 'Options',
                link: '/guide/types/options',
              },
              {
                text: 'Tuples',
                link: '/guide/types/tuples',
              },
              {
                text: 'Raw Slice',
                link: '/guide/types/raw-slice',
              },
              {
                text: 'Structs',
                link: '/guide/types/structs',
              },
              {
                text: 'Vectors',
                link: '/guide/types/vectors',
              },
            ],
          },
          {
            text: 'Abi Typegen',
            link: '/guide/abi-typegen/',
            collapsed: true,
            items: [
              {
                text: 'Generating Types from ABI',
                link: '/guide/abi-typegen/generating-types-from-abi',
              },
              {
                text: 'Using Generated Types',
                link: '/guide/abi-typegen/using-generated-types',
              },
            ],
          },
          {
            text: 'Wallets',
            link: '/guide/wallets/',
            collapsed: true,
            items: [
              {
                text: 'Access',
                link: '/guide/wallets/access',
              },
              {
                text: 'Checking Balances And Coins',
                link: '/guide/wallets/checking-balances-and-coins',
              },
              {
                text: 'Encrypting and Decrypting JSON Wallets',
                link: '/guide/wallets/encrypting-and-decrypting-json-wallets',
              },
              {
                text: 'Mnemonic Wallet',
                link: '/guide/wallets/mnemonic-wallet',
              },
              {
                text: 'Private Keys',
                link: '/guide/wallets/private-keys',
              },
              {
                text: 'Signing',
                link: '/guide/wallets/signing',
              },
              {
                text: 'Test Wallets',
                link: '/guide/wallets/test-wallets',
              },
            ],
          },
          {
            text: 'Wallet Manager',
            link: '/guide/wallet-manager/',
            collapsed: true,
            items: [
              {
                text: 'Getting Started With Wallet Manager',
                link: '/guide/wallet-manager/getting-started-with-wallet-manager',
              },
              {
                text: 'Locking And Unlocking Wallet Manager',
                link: '/guide/wallet-manager/locking-and-unlocking-wallet-manager',
              },
            ],
          },
          {
            text: 'Providers',
            link: '/guide/providers/',
            collapsed: true,
            items: [
              {
                text: 'Connection',
                link: '/guide/providers/connection',
              },
              {
                text: 'Connecting to an External Node',
                link: '/guide/providers/connecting-to-an-external-node',
              },
              {
                text: 'Querying the Chain',
                link: '/guide/providers/querying-the-chain',
              },
            ],
          },
          {
            text: 'Contracts',
            link: '/guide/contracts/',
            collapsed: true,
            items: [
              {
                text: 'Deploying Contracts',
                link: '/guide/contracts/deploying-contracts',
              },
              {
                text: 'Managing Deployed Contracts',
                link: '/guide/contracts/managing-deployed-contracts',
              },
              {
                text: 'Simulate Transactions',
                link: '/guide/contracts/simulate-transactions',
              },
              {
                text: 'Transaction Parameters',
                link: '/guide/contracts/transaction-parameters',
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
                text: 'Multicalls',
                link: '/guide/contracts/multicalls',
              },
              {
                text: 'Cost Estimation',
                link: '/guide/contracts/cost-estimation',
              },
              {
                text: 'Inter-Contract Calls',
                link: '/guide/contracts/inter-contract-calls',
              },
              {
                text: 'Calls With Different Wallets',
                link: '/guide/contracts/calls-with-different-wallets',
              },
              {
                text: 'Configurable Constants',
                link: '/guide/contracts/configurable-constants',
              },
              {
                text: 'Storage Slots',
                link: '/guide/contracts/storage-slots',
              },
              {
                text: 'Logs',
                link: '/guide/contracts/logs',
              },
              {
                text: 'Variable Outputs',
                link: '/guide/contracts/variable-outputs',
              },
              {
                text: 'Transaction Dependency Estimation',
                link: '/guide/contracts/transaction-dependency-estimation',
              },
              {
                text: 'The Fuelvm Binary File',
                link: '/guide/contracts/the-fuelvm-binary-file',
              },
            ],
          },
          {
            text: 'Addresses',
            link: '/guide/addresses',
            collapsed: true,
            items: [
              {
                text: 'Conversion',
                link: 'guide/addresses/conversion',
              },
            ],
          },
          {
            text: 'Cookbook',
            link: '/guide/cookbook/',
            collapsed: true,
            items: [
              {
                text: 'Transferring Assets',
                link: '/guide/cookbook/transferring-assets',
              },
              {
                text: 'Custom Transactions',
                link: '/guide/cookbook/custom-transactions',
              },
              {
                text: 'Deposit And Withdraw',
                link: '/guide/cookbook/deposit-and-withdraw',
              },
              {
                text: 'Transfer All Assets',
                link: '/guide/cookbook/transfer-all-assets',
              },
            ],
          },
          {
            text: 'Predicates',
            link: '/guide/predicates/',
            collapsed: true,
            items: [
              {
                text: 'Send And Spend Funds From Predicates',
                link: '/guide/predicates/send-and-spend-funds-from-predicates',
              },
              {
                text: 'Predicate With Configurable Constants',
                link: '/guide/predicates/predicate-with-configurable-constants',
              },
              {
                text: 'Predicate with More Complex Args',
                link: '/guide/predicates/predicate-with-more-complex-args',
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
                text: 'Calling A Script',
                link: '/guide/scripts/calling-a-script',
              },
              {
                text: 'Preparing A Script',
                link: '/guide/scripts/preparing-a-script',
              },
              {
                text: 'Script With Configurable Constants',
                link: '/guide/scripts/script-with-configurable-constants',
              },
            ],
          },
          {
            text: 'Testing',
            link: '/guide/testing/',
            collapsed: true,
            items: [
              {
                text: 'Testing with Jest',
                link: '/guide/testing/testing-with-jest',
              },
              {
                text: 'Setting Up a Custom Chain',
                link: '/guide/testing/setting-up-a-custom-chain',
              },
              {
                text: 'Tweaking the Blockchain',
                link: '/guide/testing/tweaking-the-blockchain',
              },
            ],
          },
          {
            text: 'Messages',
            link: '/guide/messages/',
            collapsed: true,
            items: [
              {
                text: 'Getting a Message Proof',
                link: '/guide/messages/getting-a-message-proof',
              },
              {
                text: 'Getting All Resources',
                link: '/guide/messages/getting-all-resources',
              },
              {
                text: 'Getting Messages',
                link: '/guide/messages/getting-messages',
              },
            ],
          },
        ],
      },
      apiLinks,
    ],
  },
});
