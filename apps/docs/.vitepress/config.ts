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
          // {
          //   text: 'Creating a Fuel dApp',
          //   link: '/creating-a-fuel-dapp', // need to add
          // }
        ],
      },
      {
        text: 'Basics',
        link: '/basics/', // need to add
        items: [
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
                text: 'Connecting to Testnet',
                link: '/guide/providers/connecting-to-testnet',
              },
              {
                text: 'Querying the Chain',
                link: '/guide/providers/querying-the-chain',
              },
              {
                text: 'Retrying calls',
                link: '/guide/providers/retrying-calls',
              },
            ],
          },
          // {
          //   text: 'GraphQL',
          //   link: '/guide/graphql/', // need to add
          //   collapsed: true,
          //   items: [
          //     {
          //       text: 'Schema',
          //       link: '/guide/graphql/schema', // need to add
          //     },
          //     {
          //       text: 'Playground',
          //       link: '/guide/graphql/playground', // need to add
          //     },
          //     {
          //       text: 'Custom Queries',
          //       link: '/guide/graphql/custom-queries', // need to add
          //     },
          //     {
          //       text: 'Subscriptions',
          //       link: '/guide/graphql/subscriptions', // need to add
          //     }
          //   ],
          // },
          {
            text: 'Wallets',
            link: '/guide/wallets/',
            collapsed: true,
            items: [
              // Deprecated?
              // {
              //   text: 'Access',
              //   link: '/guide/wallets/access',
              // },
              {
                text: 'Private Keys',
                link: '/guide/wallets/private-keys',
              },
              {
                text: 'Mnemonic Wallet',
                link: '/guide/wallets/mnemonic-wallet',
              },
              {
                text: 'Encrypting and Decrypting JSON Wallets',
                link: '/guide/wallets/encrypting-and-decrypting-json-wallets',
              },
              {
                text: 'Checking Balances',
                link: '/guide/wallets/checking-balances-and-coins',
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
              // New page
              // {
              //   text: 'Locking & Unlocking',
              //   link: '/guide/wallets/locking-and-unlocking',
              // },
              {
                text: 'Signing', // change to "Signing Transactions"
                link: '/guide/wallets/signing',
              },
              // New page
              // {
              //   text: 'External Connectors',
              //   link: '/guide/wallets/external-connectors',
              // },
              {
                text: 'Test Wallets',
                link: '/guide/wallets/test-wallets',
              },
            ],
          },
          {
            text: 'ABI',
            link: '/basics/abi/',
            collapsed: true,
            items: [
              // New page
              // {
              //   text: 'The JSON ABI file',
              //   link: '/guide/abi-typegen/the-json-abi-file',
              // },
              {
                text: 'Generating Types',
                link: '/basics/abi/generating-types',
              },
              {
                text: 'Using Generated Types',
                link: '/basics/abi/using-generated-types',
              },
            ],
          },
        ]
      },
      {
        text: 'Essentials',
        link: '/essentials/',
        items: [
          // Review required
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
                text: 'Interacting With Contracts',
                link: '/guide/contracts/interacting-with-contracts',
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
                text: 'Add Transfer',
                link: '/guide/contracts/add-transfer',
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
          // Review required
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
          // Review required
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
            text: 'Tutorials',
            link: '/guide/cookbook/', // change dir
            collapsed: true,
            items: [
              {
                text: 'Transferring Assets',
                link: '/guide/cookbook/transferring-assets',
              },
              {
                text: 'Deposit And Withdraw',
                link: '/guide/cookbook/deposit-and-withdraw',
              },
              {
                text: 'Wallet SDK and React Hooks',
                link: '/guide/cookbook/wallet-sdk-and-react-hooks',
              },

              // Deprecated?
              // {
              //   text: 'Custom Transactions',
              //   link: '/guide/cookbook/custom-transactions',
              // },
              // {
              //   text: 'Custom Transactions from Contract Calls',
              //   link: '/guide/cookbook/custom-transactions-from-contract-calls',
              // },
            ],
          },
        ],

      },
      {
        text: 'Extras',
        link: '/extras/', // new dir required
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
                text: 'Asset Id',
                link: '/guide/types/asset-id',
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
          // {
          //   text: 'Errors',
          //   link: '/guide/errors/',
          //   collapsed: true,
          //   items: [
          //     {
          //       text: 'Error Codes',
          //       link: '/guide/errors/error-codes',
          //     },
          //     {
          //       text: 'Revert Errors',
          //       link: '/guide/errors/revert-errors',
          //     },
          //   ],
          // },
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
          {
            text: 'Utilities',
            link: '/guide/utilities/',
            collapsed: true,
            items: [
              // {
              //   text: 'Big Number conversions',
              //   link: '/guide/utilities/big-number-conversions', // New page
              // },
              {
                text: 'Date time conversion',
                link: '/guide/types/date-time',
              },
              {
                text: 'Address conversion',
                link: '/guide/addresses/conversion',
              }
            ]
          }
        ]
      },
      {
        text: 'Tooling',
        link: '/tooling/',  // new dir required
        items: [
          {
            text: 'Testing',
            link: '/guide/testing/',
            collapsed: true,
            items: [
              {
                text: 'Testing in TS',
                link: '/guide/testing/testing-in-ts',
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
            text: 'Testing',
            link: '/guide/testing/',
            collapsed: true,
            items: [
              {
                text: 'Launching nodes',
                link: '/guide/testing/launching-nodes',
              },
              {
                text: 'Launching test nodes',
                link: '/guide/testing/launching-test-nodes',
              },
              {
                text: 'Generate test wallets',
                link: '/guide/testing/generate-test-wallets',
              },
              {
                text: 'Test Utilities',
                link: '/guide/testing/test-utilities',
              }
            ]
          },
          {
            text: 'CLI',
            link: '/guide/cli/',
            collapsed: true,
            // Review required
            items: [
              {
                text: 'create fuels',
                link: '/guide/quickstart/', //placeholder
                collapsed: true,
              },
              {
                text: 'fuels',
                link: '/guide/quickstart/', //placeholder
                collapsed: true,
              },
              // {
              //   text: 'Commands',
              //   link: '/guide/cli/commands',
              // },
              // {
              //   text: 'Config File',
              //   link: '/guide/cli/config-file',
              // },
              // {
              //   text: 'Built-in Binaries',
              //   link: '/guide/cli/built-in-binaries',
              // },
            ],
          },
        ]
      },
      apiLinks,
    ],
  },
});
