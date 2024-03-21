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
  ignoreDeadLinks: true,
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
          // Not in Notion
          {
            text: 'Quickstart',
            link: '/quickstart',
          },
          // New page
          // {
          //   text: 'Creating a Fuel dApp',
          //   link: '/creating-a-fuel-dapp',
          // }
        ],
      },
      {
        text: 'Basics',
        link: '/guide/basics/',
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
                collapsed: true,
                items: [
                  {
                    text: 'Messages',
                    link: '/guide/providers/messages',
                    // // These could probably be consolidated to the same page (/guide/providers/messages/)
                    // collapsed: true,
                    // items: [
                    //   {
                    //     text: 'Getting a Message Proof',
                    //     link: '/guide/providers/messages/getting-a-message-proof',
                    //   },
                    //   {
                    //     text: 'Getting All Resources',
                    //     link: '/guide/providers/messages/getting-all-resources',
                    //   },
                    //   {
                    //     text: 'Getting Messages',
                    //     link: '/guide/providers/messages/getting-messages',
                    //   },
                    // ],
                  },
                ]
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
              // {
              //   text: 'Wallet Manager',
              //   link: '/guide/wallets/wallet-manager/',
              //   collapsed: true,
              //   items: [
              //     {
              //       text: 'Getting Started With Wallet Manager',
              //       link: '/guide/wallets/wallet-manager/getting-started-with-wallet-manager',
              //     },
              //     {
              //       text: 'Locking And Unlocking Wallet Manager',
              //       link: '/guide/wallets/wallet-manager/locking-and-unlocking-wallet-manager',
              //     },
              //   ],
              // },
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
            link: '/guide/abi/',
            collapsed: true,
            items: [
              // New page
              // {
              //   text: 'The JSON ABI file',
              //   link: '/guide/abi/the-json-abi-file',
              // },
              {
                text: 'Generating Types',
                link: '/guide/abi/generating-types',
              },
              {
                text: 'Using Generated Types',
                link: '/guide/abi/using-generated-types',
              },
            ],
          },
        ]
      },
      apiLinks,
    ],
  },
});
