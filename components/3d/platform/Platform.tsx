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

  var coordinatesList = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(5, 10, 0),
    new THREE.Vector3(2, 8, 0),
    new THREE.Vector3(5, 5, 0),
  ];

  useEffect(() => {
    mesh.current.rotation.x = 1.5;
    mesh.current.rotation.y = 0;
  }, []);
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh {...props} ref={mesh}>
      <shapeBufferGeometry args={coordinatesList} />
      <meshPhongMaterial />
    </mesh>
  );
};

export default Platform;
