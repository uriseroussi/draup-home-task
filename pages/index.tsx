import { Canvas } from '@react-three/fiber/';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { Suspense, useState } from 'react';
import { Euler } from 'three';
import Dress from '../components/3d/models/Dress';
import Picture from '../components/3d/picture/Picture';
import Platform from '../components/3d/platform/Platform';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import axios from 'axios';
import { NftData } from '../types/types';
import NFTGallery from '../components/gallery/NFTGallery';
import { Text, Text3D } from '@react-three/drei';
import Web3 from 'web3';

const HomePage: NextPage = () => {
  const [address, setAddress] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isFetchingNfts, setIsFetchingNfts] = useState<boolean>(false);
  const [nfts, setNfts] = useState<NftData[]>([]);
  const [selectedNft, setSelectedNft] = useState<NftData>({
    contractAddress: '',
    tokenId: '',
    imageUrl: '',
  });

  const onAddressSubmitHandler = async () => {
    setErrorMsg('');
    setIsFetchingNfts(true);

    if (!Web3.utils.isAddress(address)) {
      setErrorMsg('Invalid address');
      setIsFetchingNfts(false);
      return;
    }

    try {
      const addressNfts = await axios.get(
        `/api/v1/index-nfts?address=${address}`
      );
      if (!addressNfts.data.nfts) {
        setErrorMsg('No NFTs found!');
        setIsFetchingNfts(false);
        return;
      }
      setNfts(addressNfts.data.nfts);
    } catch (err: any) {
      setNfts([]);
      setErrorMsg(err.message);
      console.log(err);
    }
    setIsFetchingNfts(false);
  };

  return (
    <>
      <Head>
        <title>My Non-Fungible Garment</title>
        <meta
          name="description"
          content="a wep app to texturize garments with NFTs"
        />
      </Head>

      <main className="flex flex-col items-center h-[100vh]">
        <div className="mt-[10rem] mb-[2.5rem] text-center">
          <h1 className="text-purple-500">My Non-Fungible Garment</h1>
          <p className="text-purple-500 ">
            Get NFTs owned by an address and visualize them on garments
          </p>
        </div>
        <form
          className="flex flex-col mb-[2.5rem] w-[52rem]"
          onSubmit={(event: React.FormEvent) => {
            event.preventDefault();
            onAddressSubmitHandler();
          }}
        >
          <div className="flex gap-[1rem] w-full">
            <Input
              className="flex-1"
              name="address"
              placeholder="Address"
              type="text"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddress(e.target.value.trim());
                setErrorMsg('');
              }}
            />

            {!isFetchingNfts && <Button>Submit</Button>}
            {isFetchingNfts && <Button disabled>Fetching NFTs...</Button>}
          </div>
          <div className="h-[1em]">
            <p className="text-red-600 ml-[0.5rem]">{errorMsg}</p>
          </div>
        </form>

        <div className="min-h-[8rem]">
          {nfts.length > 0 && (
            <div>
              <NFTGallery nfts={nfts} setSelectedNft={setSelectedNft} />
            </div>
          )}
        </div>

        <Canvas camera={{ fov: 75, position: [0, 2, 6] }}>
          <ambientLight intensity={0.1} position={[0, 0, 0]} />
          <spotLight position={[0, 5, 10]} intensity={0.5} />
          <Picture
            position={[3, 0, 0]}
            scale={1}
            image={selectedNft?.imageUrl!}
          />
          <Dress
            position={[0, -2, 1]}
            scale={0.033}
            image={selectedNft?.imageUrl!}
          />
          <Platform position={[0, -4.5, -3]} scale={1} />
          <Text
            scale={[2, 3, 0]}
            position={[2.96, -1.2, 0.4]}
            rotation={new Euler(-0.11, -0.96, 0.13)}
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          >
            {selectedNft.name ? selectedNft.name : 'Bored Ape Yacht Club'}
          </Text>
        </Canvas>
      </main>
    </>
  );
};

export default HomePage;
