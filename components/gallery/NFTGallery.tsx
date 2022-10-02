import { useState } from 'react';
import { NftData } from '../../types/types';

type props = {
  children?: React.ReactNode;
  className?: string;
  nfts: NftData[];
  setSelectedNft: Function;
};

const NFTGallery: React.FC<props> = (props) => {
  const [offset, setOffset] = useState<number>(0);

  const displayedNfts = props.nfts
    .slice(offset, offset + 5)
    .map((nft, index) => {
      return (
        <div
          key={index}
          className="w-[5rem] h-[5rem] overflow-hidden rounded-xl cursor-pointer hover:border-2 hover:border-purple-600"
          onClick={() => props.setSelectedNft(nft)}
        >
          <img className="w-full" src={nft.imageUrl} loading="lazy" />
        </div>
      );
    });

  return (
    <div className="flex flex-col items-center">
      <div>
        <span className="text-[1.4rem]">{`Found ${props.nfts.length} NFTs`}</span>
      </div>
      <div className="flex items-center gap-[1rem]">
        <button
          className="w-[2.5rem] h-[2.5rem] rounded-full bg-purple-200 hover:bg-purple-500 flex justify-center items-center"
          onClick={() => {
            if (offset - 5 < 0) {
              setOffset(props.nfts.length - 5);
              return;
            }
            setOffset(offset - 5);
          }}
        >
          <svg
            className="w-[1rem] fill-black"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.71001 0.71C6.32001 0.32 5.69001 0.32 5.30001 0.71L0.710011 5.3C0.320011 5.69 0.320011 6.32 0.710011 6.71L5.30001 11.3C5.69001 11.69 6.32001 11.69 6.71001 11.3C7.10001 10.91 7.10001 10.28 6.71001 9.89L2.83001 6L6.71001 2.12C7.10001 1.73 7.09001 1.09 6.71001 0.71V0.71Z" />
          </svg>
        </button>
        <div className="flex gap-[1rem] w-[29rem]">{displayedNfts}</div>
        <button
          className="w-[2.5rem] h-[2.5rem] rounded-full bg-purple-200 hover:bg-purple-500 flex justify-center items-center"
          onClick={() => setOffset((offset + 5) % props.nfts.length)}
        >
          <svg
            className="w-[1rem] fill-black rotate-180"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.71001 0.71C6.32001 0.32 5.69001 0.32 5.30001 0.71L0.710011 5.3C0.320011 5.69 0.320011 6.32 0.710011 6.71L5.30001 11.3C5.69001 11.69 6.32001 11.69 6.71001 11.3C7.10001 10.91 7.10001 10.28 6.71001 9.89L2.83001 6L6.71001 2.12C7.10001 1.73 7.09001 1.09 6.71001 0.71V0.71Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NFTGallery;
