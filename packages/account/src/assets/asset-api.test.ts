import { MOCK_ASSET_INFO_BY_OWNER, MOCK_BASE_ASSET, MOCK_FUEL_ASSET, MOCK_NFT_ASSET } from "../../test/fixtures/assets";
import { getAssetById, TESTNET_ASSET_API_URL, getAssetsByOwner, MAINNET_ASSET_API_URL, AssetInfo } from "./asset-api";

const mockFetch = () => {
  const jsonResponse = vi.fn();
  const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jsonResponse
  } as unknown as Response);

  return {
    fetch: fetchSpy,
    json: jsonResponse
  }
}

/**
 * @group node
 * @group browser
 */
describe('Asset API', () => {
  describe('getAssetById', () => {
    it('should get an asset by id [Base Asset - Verified]', async () => {
      const expected = {
        assetId: expect.any(String),
        name: expect.any(String),
        symbol: expect.any(String),
        decimals: expect.any(Number),
        rate: expect.any(Number),
        icon: expect.any(String),
        suspicious: expect.any(Boolean),
        verified: expect.any(Boolean),
        networks: expect.any(Array),
      }
      const { fetch, json } = mockFetch();
      json.mockResolvedValueOnce(MOCK_BASE_ASSET);

      const response = await getAssetById({
        assetId: MOCK_BASE_ASSET.assetId
      });

      const assetInfo = response as AssetInfo;
      expect(assetInfo).toEqual(MOCK_BASE_ASSET)
      expect(assetInfo).toMatchObject(expected)
      expect(Object.keys(assetInfo).sort()).toEqual(Object.keys(expected).sort())
    })

    it('should get an asset by id [Fuel - Verified]', async () => {
      const expected = {
        assetId: expect.any(String),
        contractId: expect.any(String),
        subId: expect.any(String),
        icon: expect.any(String),
        name: expect.any(String),
        symbol: expect.any(String),
        decimals: expect.any(Number),
        rate: expect.any(Number),
        suspicious: expect.any(Boolean),
        verified: expect.any(Boolean),
        networks: expect.any(Array),
        metadata: expect.any(Object),
        totalSupply: expect.any(String),
      }
      const { json } = mockFetch();
      json.mockResolvedValueOnce(MOCK_FUEL_ASSET);

      const response = await getAssetById({
        assetId: MOCK_FUEL_ASSET.assetId
      });

      const assetInfo = response as AssetInfo;
      expect(response).toEqual(MOCK_FUEL_ASSET)
      expect(assetInfo).toMatchObject(expected)
      expect(Object.keys(assetInfo).sort()).toEqual(Object.keys(expected).sort())
    })

    it('should get an asset by id [NFT]', async () => {
      const expected = {
        assetId: expect.any(String),
        contractId: expect.any(String),
        subId: expect.any(String),

        name: expect.any(String),
        symbol: expect.any(String),
        decimals: expect.any(Number),
        totalSupply: expect.any(String),

        suspicious: expect.any(Boolean),
        verified: expect.any(Boolean),
        isNFT: expect.any(Boolean),

        metadata: expect.any(Object),
        collection: expect.any(String),

        owner: expect.any(String),
        amount: expect.any(String),
        amountInUsd: expect.nullOrAny(String),
        uri: expect.any(String),
      }

      const { json } = mockFetch();
      json.mockResolvedValueOnce(MOCK_NFT_ASSET);

      const response = await getAssetById({
        assetId: MOCK_NFT_ASSET.assetId
      });

      const assetInfo = response as AssetInfo;
      expect(response).toEqual(MOCK_NFT_ASSET)
      expect(assetInfo).toMatchObject(expected)
      expect(Object.keys(assetInfo).sort()).toEqual(Object.keys(expected).sort())
    });

    it('should return null if asset not found', async () => {
      const { json } = mockFetch();
      // The API returns a 200 status code but the response is not valid JSON
      json.mockRejectedValueOnce(null);

      const response = await getAssetById({
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000'
      });

      expect(response).toBeNull();
    });
  });

  describe('getAssetByOwner', () => {
    it('should get assets by owner', async () => {
      const { json } = mockFetch();
      json.mockResolvedValueOnce(MOCK_ASSET_INFO_BY_OWNER);

      const response = await getAssetsByOwner({
        owner: MOCK_NFT_ASSET.owner,
      });

      expect(response?.data).toEqual([MOCK_NFT_ASSET]);
      expect(response?.pageInfo).toEqual({
        count: 1,
      })
    });
  })
});

