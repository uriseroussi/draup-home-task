import { Canvas } from '@react-three/fiber/';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { Suspense, useState } from 'react';
import { Euler, SpotLight } from 'three';
import Cube from '../components/3d/cube/Cube';
import Dress from '../components/3d/models/Dress';
import Picture from '../components/3d/picture/Picture';
import Platform from '../components/3d/platform/Platform';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import axios from 'axios';
import { NftData } from '../types/types';
import NFTGallery from '../components/gallery/NFTGallery';
import { OrbitControls, Stats, Text } from '@react-three/drei';

const HomePage: NextPage = () => {
  const [address, setAddress] = useState<string>('');
  const [isFetchingNfts, setIsFetchingNfts] = useState<boolean>(false);
  const [nfts, setNfts] = useState<NftData[]>([]);
  const [selectedNft, setSelectedNft] = useState<NftData>({
    contractAddress: '',
    tokenId: '',
    imageUrl: '',
  });

  console.log(nfts);
  console.log(selectedNft);

  const onAddressSubmitHandler = async () => {
    setIsFetchingNfts(true);
    try {
      const addressNfts = await axios.get(
        `/api/v1/index-nfts?address=${address}`
      );
      setNfts(addressNfts.data.nfts);
    } catch (err) {
      setNfts([]);
      console.log(err);
    }
    setIsFetchingNfts(false);
  };

  return (
    <>
      <Head>
        <title>My Dress is an NFT</title>
        <meta
          name="description"
          content="a wep app to texturize garments with NFTs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center h-[100vh]">
        <form
          className="flex gap-[1rem] mt-[10rem] mb-[5rem]"
          onSubmit={(event: React.FormEvent) => {
            event.preventDefault();
            onAddressSubmitHandler();
          }}
        >
          <Input
            name="address"
            placeholder="Address"
            type="text"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />
          {!isFetchingNfts && <Button>Submit</Button>}
          {isFetchingNfts && <Button disabled>Fetching NFTs</Button>}
        </form>

        {nfts.length > 0 && (
          <div>
            <NFTGallery nfts={nfts} setSelectedNft={setSelectedNft} />
          </div>
        )}

        <Canvas camera={{ fov: 75, position: [0, 2, 6] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 10, 5]} />
            {/* <Cube position={[0, 0, 1]} /> */}
            <Picture
              position={[3, -1, -2]}
              scale={1.2}
              image={selectedNft?.imageUrl}
            />
            <Dress
              position={[0, -2, 2]}
              scale={0.033}
              image={selectedNft?.imageUrl}
            />
            {/* <Platform position={[0, -0.3, 0]} /> */}
            <Text
              scale={[3, 3, 3]}
              position={[2.8, -2.5, -2]}
              rotation={new Euler(0, -0.8, -0.05)}
              color="white" // default
              anchorX="center" // default
              anchorY="middle" // default
            >
              {selectedNft.name}
            </Text>
          </Suspense>
        </Canvas>
      </main>
    </>
  );
};

export default HomePage;
