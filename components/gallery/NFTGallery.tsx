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
          className="w-[5rem] h-[5rem] overflow-hidden rounded-xl"
          onClick={() => props.setSelectedNft(nft)}
        >
          <img className="w-full" src={nft.imageUrl} loading="lazy" />
        </div>
      );
    });

  return (
    <div className="flex gap-[1rem]">
      <button
        onClick={() => {
          if (offset - 5 < 0) {
            setOffset(props.nfts.length - 5);
            return;
          }
          setOffset(offset - 5);
        }}
      >
        Prev
      </button>
      <div className="flex gap-[1rem] w-[29rem]">{displayedNfts}</div>
      <button onClick={() => setOffset((offset + 5) % props.nfts.length)}>
        Next
      </button>
    </div>
  );
};

export default NFTGallery;
