// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NftData, OpenseaAsset } from '../../../../types/types';
import Qs from 'qs';

const ASSETS_API_ENDPOINT = 'https://api.opensea.io/api/v1/assets/';

type Data = {
  nfts?: NftData[];
  message: string;
};

const getNfts = async (address: string) => {
  const nfts: NftData[] = [];
  let isNextCursor = true;
  let cursor = '';
  while (isNextCursor) {
    try {
      const addressNFTs = await axios.get(
        `https://deep-index.moralis.io/api/v2/${address}/nft`,
        {
          headers: {
            'X-API-KEY': process.env.MORALIS_API_KEY!,
          },
          params: {
            cursor,
          },
        }
      );
      const nextNfts = addressNFTs.data.result.map((result: any) => {
        return {
          contractAddress: result.token_address,
          tokenId: result.token_id,
        };
      });

      cursor = addressNFTs.data.cursor;
      if (!cursor) isNextCursor = false;

      nfts.push(...nextNfts);
    } catch (err) {
      console.log(err);
      return;
    }
  }
  return nfts;
};

const getNftImages = async (nfts: NftData[]) => {
  let nftsWithImages = [];
  const numRequests = Math.ceil(nfts.length / 20);
  const tokenIds = nfts.map((nft) => nft.tokenId);
  const addresses = nfts.map((nft) => nft.contractAddress);

  let cursor = '';
  for (let i = 0; i < numRequests; i++) {
    const max = i * 20 + 20 > tokenIds.length ? tokenIds.length : i * 20 + 20;
    const currentTokenIds = tokenIds.slice(i * 20, max);
    const currentAddresses = addresses.slice(i * 20, max);
    try {
      const data = await axios.get(ASSETS_API_ENDPOINT, {
        headers: { 'X-API-KEY': process.env.OPENSEA_API_KEY! },
        params: {
          token_ids: currentTokenIds,
          asset_contract_addresses: currentAddresses,
          cursor,
        },
        paramsSerializer: (params) =>
          Qs.stringify(params, { arrayFormat: 'repeat' }),
      });

      cursor = data.data.cursor;

      const nextNfts = data.data.assets.map((asset: OpenseaAsset) => {
        return {
          imageUrl: asset.image_url,
          name: asset.name,
          creator: asset.creator,
        };
      });

      nftsWithImages.push(...nextNfts);
    } catch (err: any) {
      console.log(err);
      return;
    }
  }
  return nftsWithImages;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET')
    return res.status(403).json({ message: 'method not allowed' });

  const address = req.query.address!;
  if (typeof address === 'object')
    return res.status(400).json({ message: 'invalid request parameters' });

  const addressNFTs = await getNfts(address);
  if (!addressNFTs?.length)
    return res.status(200).json({ message: 'No NFTs found' });

  const imageUrls = await getNftImages(addressNFTs);
  if (!imageUrls?.length)
    return res.status(200).json({ message: 'No NFTs found' });

  // hacky way to deal with discrepencies and get only nfts with images
  imageUrls
    .filter((nft) => nft.imageUrl)
    .forEach((nft, index) => {
      nft.contractAddress = addressNFTs[index].contractAddress;
      nft.tokenId = addressNFTs[index].tokenId;
    });

  res.status(200).json({
    nfts: imageUrls.filter((nft) => nft.imageUrl),
    message: 'OK',
  });
}
