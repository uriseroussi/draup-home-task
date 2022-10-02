export type NftData = {
  contractAddress: string;
  tokenId: string;
  imageUrl?: string;
  name?: string;
  creator?: string;
};

export interface OpenseaAsset {
  id: number;
  num_sales: number;
  background_color: string;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  animation_url: string;
  animation_original_url: string;
  name: string;
  description: string;
  external_link: string;
  asset_contract: any;
  permalink: string;
  collection: any;
  token_metadata: string;
  owner: any;
  creator: any;
  token_id: string;
}
