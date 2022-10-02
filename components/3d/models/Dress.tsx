import { useTexture } from '@react-three/drei';
import { MeshProps, useFrame, useLoader } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { Mesh, Vector2 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

interface props extends MeshProps {
  children?: React.ReactNode;
  className?: string;
  image: string;
}

const Dress: React.FC<props> = (props) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const obj = useLoader(OBJLoader, '/dress.obj');

  let image_url = props.image ? props.image : '/boredape.png';
  const texture = useTexture(image_url);
  texture.repeat = new Vector2(1, 1);
  texture.flipY = true;

  const geometry = useMemo(() => {
    let g;
    obj.traverse((c) => {
      if (c.type === 'Mesh') {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [obj]);

  useFrame((state, delta) => {
    // mesh.current.rotation.y += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  // I've used meshPhysicalMaterial because the texture needs lights to be seen properly.
  return (
    <mesh ref={mesh} geometry={geometry} {...props}>
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

export default Dress;
