import { defineConfig } from 'vitepress';
import { codeInContextPlugin } from './plugins/codeInContextPlugin';
import { snippetPlugin } from './plugins/snippetPlugin';

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
    ['link', { rel: 'icon', href: 'favicon.ico', type: 'image/png' }],
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
    sidebar: [
      {
        text: 'Introduction',
        link: '/',
        items: [
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
                text: 'Bech32',
                link: '/guide/types/bech32',
              },
              {
                text: 'Bits256',
                link: '/guide/types/bits256',
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
                text: 'Enums',
                link: '/guide/types/enums',
              },
              {
                text: 'Options',
                link: '/guide/types/options',
              },
              {
                text: 'Structs',
                link: '/guide/types/structs',
              },
              {
                text: 'Vectors',
                link: '/guide/types/vectors',
              },
              {
                text: 'Conversion',
                link: '/guide/types/conversion',
              },
            ],
          },
          {
            text: 'Abi Typegen',
            link: '/guide/abi-typegen/',
            collapsed: true,
            items: [
              {
                text: 'Generate Contract Types',
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
                text: 'Encrypting And Storing Wallets',
                link: '/guide/wallets/encrypting-and-storing-wallets',
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
              {
                text: 'Transferring Assets',
                link: '/guide/wallets/transferring-assets',
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
                text: 'Read Only Calls',
                link: '/guide/contracts/read-only-calls',
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
                text: 'Logs',
                link: '/guide/contracts/logs',
              },
              {
                text: 'Variables Outputs',
                link: '/guide/contracts/variable-outputs',
              },
              {
                text: 'The Fuelvm Binary File',
                link: '/guide/contracts/the-fuelvm-binary-file',
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
    ],
  },
});
