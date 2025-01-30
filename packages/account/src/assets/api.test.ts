import { setupTestProviderAndWallets } from "../test-utils";
import { getAssetById, TESTNET_ASSET_API_URL, getAssetsByOwner, MAINNET_ASSET_API_URL } from "./api";

describe('Asset API', () => {
  describe('getAssetById', () => {
    it('should get an asset by id [Base Asset - Verified]', async () => {
      const BASE_ASSET = {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'https://verified-assets.fuel.network/images/eth.svg',
        networks: [
          {
            type: 'ethereum',
            chain: 'sepolia',
            decimals: 18,
            chainId: 11155111,
            __typename: 'AssetNetworkEthereum'
          },
          {
            type: 'ethereum',
            chain: 'foundry',
            decimals: 18,
            chainId: 31337,
            __typename: 'AssetNetworkEthereum'
          },
          {
            type: 'ethereum',
            chain: 'mainnet',
            decimals: 18,
            chainId: 1,
            __typename: 'AssetNetworkEthereum'
          },
          {
            type: 'fuel',
            chain: 'devnet',
            decimals: 9,
            assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
            chainId: 0,
            __typename: 'AssetNetworkFuel'
          },
          {
            type: 'fuel',
            chain: 'testnet',
            decimals: 9,
            assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
            chainId: 0,
            __typename: 'AssetNetworkFuel'
          },
          {
            type: 'fuel',
            chain: 'mainnet',
            decimals: 9,
            assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
            chainId: 9889,
            __typename: 'AssetNetworkFuel'
          }
        ],
        assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
        decimals: 9,
        suspicious: false,
        verified: true,
        rate: expect.any(Number)
      }
      using launched = await setupTestProviderAndWallets();
      const { provider } = launched;
      const baseAssetId = await provider.getBaseAssetId();

      const response = await getAssetById(
        TESTNET_ASSET_API_URL,
        baseAssetId
      );

      expect(response).toEqual(BASE_ASSET)
      expect(response).toMatchObject({
        assetId: expect.any(String),
        // contractId: null,
        // subId: null,

        name: expect.any(String),
        symbol: expect.any(String),
        decimals: expect.any(Number),
        rate: expect.any(Number),

        suspicious: expect.any(Boolean),
        verified: expect.any(Boolean),
        // isNFT: expect.any(Boolean),

        networks: expect.any(Array),
        // metadata: expect.any(Object),
        // collection: null,
      })
    })

    it('should get an asset by id [Fuel - Verified]', async () => {
      const FUEL_ASSET_ID = '0x324d0c35a4299ef88138a656d5272c5a3a9ccde2630ae055dacaf9d13443d53b';
      const FUEL_ASSET = {
          name: 'Fuel',
          symbol: 'FUEL',
          icon: 'https://verified-assets.fuel.network/images/fuel.svg',
          networks: [
            {
              type: 'ethereum',
              chain: 'sepolia',
              address: '0xd7fc4e8fb2c05567c313f4c9b9e07641a361a550',
              decimals: 9,
              chainId: 11155111,
              __typename: 'AssetNetworkEthereum'
            },
            {
              type: 'ethereum',
              chain: 'mainnet',
              address: '0x675b68aa4d9c2d3bb3f0397048e62e6b7192079c',
              decimals: 9,
              chainId: 1,
              __typename: 'AssetNetworkEthereum'
            },
            {
              type: 'fuel',
              chain: 'testnet',
              decimals: 9,
              chainId: 0,
              contractId: '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471',
              subId: '0xede43647e2aad1c0f1696201d6ba913aa67c917c3ac9a4a7d95662962ab25c5b',
              assetId: '0x324d0c35a4299ef88138a656d5272c5a3a9ccde2630ae055dacaf9d13443d53b',
              __typename: 'AssetNetworkFuel'
            },
            {
              type: 'fuel',
              chain: 'mainnet',
              decimals: 9,
              chainId: 9889,
              contractId: '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
              subId: '0xe81c89b8cf795c7c25e79f6c4f2f1cd233290b58e217ed4e9b6b18538badddaf',
              assetId: '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82',
              __typename: 'AssetNetworkFuel'
            }
          ],
          assetId: '0x324d0c35a4299ef88138a656d5272c5a3a9ccde2630ae055dacaf9d13443d53b',
          contractId: '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471',
          subId: '0xede43647e2aad1c0f1696201d6ba913aa67c917c3ac9a4a7d95662962ab25c5b',
          decimals: 9,
          totalSupply: '100000000000',
          suspicious: false,
          verified: true,
          metadata: { 'bridged:chain': '1' },
          rate: expect.any(Number)
      };

      const response = await getAssetById(
        TESTNET_ASSET_API_URL,
        FUEL_ASSET_ID
      );

      expect(response).toEqual(FUEL_ASSET)
      expect(response).toMatchObject({
        assetId: expect.any(String),
        contractId: expect.any(String),
        subId: expect.any(String),

        name: expect.any(String),
        symbol: expect.any(String),
        decimals: expect.any(Number),
        rate: expect.any(Number),

        suspicious: expect.any(Boolean),
        verified: expect.any(Boolean),
        // isNFT: expect.any(Boolean),

        networks: expect.any(Array),
        metadata: expect.any(Object),
        // collection: null,
      })
    })

    it('can get asset by id [NFT]', async () => {
      const NFT = {
        assetId: '0x3720033febf5e272a2004742e59f0ce3ed9f59f8c7682fe9e37bef7b9722eeb1',
        contractId: '0xd18bdef74e3b5e6323e1f6cf699d275b3e2aeec17e81603347d0542fca212190',
        subId: "0x4c275ecc6917d30cd1d71d6a784504237885e58c9c6c5107b74e1fcb69039131",
        name: 'Coxinha',
        symbol: 'CXN',
        decimals: 0,
        totalSupply: null,
        suspicious: false,
        metadata: {
          image: 'QmYeZ2gXKDeq9uGhdYypELTy6UrDAUARnHm8Sjeq522BDb'
        },
        collection: null,
        verified: false,
        isNFT: false // TODO: This should be true?
      }

      const response = await getAssetById(
        TESTNET_ASSET_API_URL,
        '0x3720033febf5e272a2004742e59f0ce3ed9f59f8c7682fe9e37bef7b9722eeb1'
      );


      expect(response).toEqual(NFT)
      expect(response).toMatchObject({
        assetId: expect.any(String),
        contractId: expect.any(String),
        subId: expect.any(String),

        name: expect.any(String),
        symbol: expect.any(String),
        decimals: expect.any(Number),
        // rate: expect.any(Number),

        suspicious: expect.any(Boolean),
        verified: expect.any(Boolean),
        isNFT: expect.any(Boolean),

        // networks: expect.any(Array),
        metadata: expect.any(Object),
        collection: null,
      })
    });

    it('should get an asset by id [NFT]', async () => {
      const NFT = {
        "assetId": "0xca2df61461ab3ec61a5c5cccc38ef2dd1a396a39a2db5e70aa75a1ffc3cd6216",
        "contractId": "0x3f3f87bb15c693784e90521c64bac855ce23d971356a6ccd57aa92e02e696432",
        "subId": "0x00000000000000000000000000000000000000000000000000000000000010ad",
        "name": "Executoors",
        "symbol": "EXE",
        "decimals": 0,
        "totalSupply": "1",
        "suspicious": false,
        "metadata": {
          "dna": "f2189750e8209276434ff5362ad2e0048e4d91d1",
          "uri": "ipfs://bafybeif44cbambuyvtfhk6lbaozshy4xs3p4saeqnizxlon4age6pkr2ua/4269.json",
          "date": 1727986851229,
          "name": "Executoors #4269",
          "image": "ipfs://bafybeicwudiwhs6zanzootxak3bzhxsnoagkglikrbjwucjl5c3y4xne6y/4269.png",
          "edition": 4269,
          "attributes": [
            {
              "value": "Aqua",
              "trait_type": "Background"
            },
            {
              "value": "Green Lightning",
              "trait_type": "Climate"
            },
            {
              "value": "Trippy",
              "trait_type": "Body"
            },
            {
              "value": "Thalric the Fierce",
              "trait_type": "Face"
            },
            {
              "value": "The Traditional Hood",
              "trait_type": "Head"
            },
            {
              "value": "Red Rock and Roll",
              "trait_type": "Hands"
            },
            {
              "value": "Guy",
              "trait_type": "Eyes"
            },
            {
              "value": "Calm",
              "trait_type": "Brows"
            },
            {
              "value": "The Pineboy",
              "trait_type": "Axe"
            },
            {
              "value": "Green",
              "trait_type": "Level Bar"
            },
            {
              "value": "3",
              "trait_type": "Level"
            },
            {
              "value": "White",
              "trait_type": "Level Title"
            },
            {
              "value": "110",
              "trait_type": "Executioon Level"
            },
            {
              "value": "Guillotine",
              "trait_type": "Method"
            },
            {
              "value": "One",
              "trait_type": "Detail"
            }
          ],
          "description": "In search of the most flawless execution environment."
        },
        "collection": "Executoors",
        "isNFT": true,
        "verified": false,
        "owner": "0xc4d1e11937ed4521690a94ad2556f8919be16bebbb123259ce11fc12d36a7125",
        "uri": "https://ipfs.io/ipfs/bafybeif44cbambuyvtfhk6lbaozshy4xs3p4saeqnizxlon4age6pkr2ua/4269.json"
      }
      const response = await getAssetById(
        MAINNET_ASSET_API_URL,
        NFT.assetId
      );

      expect(response).toEqual(NFT)
    });

    it('should return null if asset not found', async () => {
      const response = await getAssetById(
        TESTNET_ASSET_API_URL,
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      );

      expect(response).toBeNull();
    });
  });

  describe('getAssetByOwner', { timeout: 10000 }, () => {
    it('should get assets by owner', async () => {
      const owner = '0x0000000000000000000000000000000000000000';
      const response = await getAssetsByOwner(
        TESTNET_ASSET_API_URL,
        owner,
        { last: 10 }
      );

      expect(response?.data).toHaveLength(10)
      response?.data.forEach(asset => {
        expect(asset).toMatchObject({
          assetId: expect.any(String),
          contractId: expect.any(String),
          subId: expect.any(String),

          name: expect.nullOrAny(String),
          symbol: expect.nullOrAny(String),
          decimals: expect.nullOrAny(Number),
          // rate: expect.any(Number),

          suspicious: expect.any(Boolean),
          verified: expect.any(Boolean),
          isNFT: expect.any(Boolean),

          // networks: expect.any(Array),
          metadata: expect.any(Object),
          collection: null,

          owner: expect.any(String),
          amount: expect.any(String),
          amountInUsd: expect.nullOrAny(String),
        })
      })
      expect(response?.pageInfo).toEqual({
        count: 10,
      })
    });

    it('should get assets by owner', async () => {
      const owner = '0xc4d1e11937ed4521690a94ad2556f8919be16bebbb123259ce11fc12d36a7125';
      const response = await getAssetsByOwner(
        MAINNET_ASSET_API_URL,
        owner,
        { last: 10 }
      );


    });
  })
});

