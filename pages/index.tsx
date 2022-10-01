import { Canvas } from '@react-three/fiber/';
import type { NextPage } from 'next';
import Head from 'next/head';
import Cube from '../components/3d/cube/Cube';

const HomePage: NextPage = () => {
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

      <div className="w-[100vw] h-[100vh]">
        <Canvas>
          <ambientLight intensity={0.1} />
          <pointLight position={[20, 20, 20]} />
          <Cube position={[0, 0, 0]} />
        </Canvas>
      </div>
    </>
  );
};

export default HomePage;
