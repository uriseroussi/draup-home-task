import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshProps } from '@react-three/fiber/';
import { useLoader } from '@react-three/fiber/';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

interface props extends MeshProps {
  children?: React.ReactNode;
  className?: string;
}

const Cube: React.FC<props> = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    mesh.current.rotation.x = 1.5;
    mesh.current.rotation.y = 0;
  }, []);

  // use image as texture
  const texture = useLoader(
    TextureLoader,
    'https://i.seadn.io/gae/D-R6XnX1zkCAr7UZwEzNSK8PDhw5B4pjplqeSb9iZQLE92kXGwjawWTJQEeidmsMTZpVpt1qkzsyWX7flysoFb_LFWw1CYal__7lJA'
  );
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    mesh.current.rotation.z += 0.01;
    // mesh.current.rotation.y += 0.01;
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[2, 0.05, 2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Cube;
