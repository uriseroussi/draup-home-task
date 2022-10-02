import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { MeshProps } from '@react-three/fiber/';

interface props extends MeshProps {
  children?: React.ReactNode;
  className?: string;
}

const Platform: React.FC<props> = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    mesh.current.rotation.x = -0.5;
    mesh.current.rotation.y = 0;
  }, []);
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props} ref={mesh}>
      <cylinderGeometry args={[8, 8, 0.1, 16]} />
      <meshPhysicalMaterial
        metalness={0}
        roughness={0.7}
        transmission={1}
        thickness={0.5}
      />
    </mesh>
  );
};

export default Platform;
