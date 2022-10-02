import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { MeshProps } from '@react-three/fiber/';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

interface props extends MeshProps {
  children?: React.ReactNode;
  className?: string;
  image: string;
}

const Picture: React.FC<props> = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    mesh.current.rotation.x = 1.4;
    mesh.current.rotation.y = -0.2;
    mesh.current.rotation.z = 0.9;
  }, []);

  // use image as texture
  let image_url = props.image ? props.image : '/boredape.png';
  const loader = new TextureLoader();
  const texture = loader.load(image_url);

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[2, 0.05, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Picture;
