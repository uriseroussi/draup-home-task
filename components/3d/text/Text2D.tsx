import { Text } from '@react-three/drei';
import { Euler } from 'three';
import { NftData } from '../../../types/types';
type props = {
  children?: React.ReactNode;
  className?: string;
  selectedNft: NftData;
};

const Text2D: React.FC<props> = (props) => {
  return (
    <Text
      scale={[2, 3, 0]}
      position={[2.96, -1.2, 0.4]}
      rotation={new Euler(-0.11, -0.96, 0.13)}
      font="Roboto-Bold.otf"
    >
      {props.selectedNft.name ? props.selectedNft.name : 'Bored Ape Yacht Club'}
    </Text>
  );
};

export default Text2D;
