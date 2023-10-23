import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

interface MeteoriteProps {
  onClick: () => void;
}

const Meteorite: React.FC<MeteoriteProps> = ({ onClick }: MeteoriteProps) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    ref.current.rotation.x += 0.02;
    ref.current.rotation.y += 0.02;
    ref.current.position.z += 0.05;

    if (ref.current.position.z > 10) {
      ref.current.position.z = -30;
    }
  });

  const texts = [
    { position: [0, -0.05, 0.26], rotation: [0, 0, 0] },
    { position: [0, -0.05, -0.26], rotation: [0, 3.13, 0] },
    { position: [0, 0.26, -0.05], rotation: [1.58, 3.13, 0] },
    { position: [0, -0.26, 0.05], rotation: [-1.58, 3.13, 0] },
    { position: [-0.26, -0.05, 0], rotation: [0, -1.58, 0] },
    { position: [0.26, -0.05, 0], rotation: [0, 1.58, 0] },
  ];

  return (
    <mesh onClick={onClick} ref={ref} position={[0, 0, -0]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#03D7AE" />
      {texts.map((text, index) => (
        <Text
          key={index}
          position={text.position as [number, number, number]}
          fontSize={0.4}
          rotation={text.rotation as [number, number, number]}
          color="#F1EFF4"
        >
          2
        </Text>
      ))}
      {/* <Text position={[0, -0.05, 0.26]} fontSize={0.4} color="#F1EFF4">
        2
      </Text>
      <Text
        position={[0, -0.05, -0.26]}
        fontSize={0.4}
        rotation={[0, 3.13, 0]}
        color="#F1EFF4"
      >
        2
      </Text>
      <Text
        position={[0, 0.26, -0.05]}
        fontSize={0.4}
        rotation={[1.58, 3.13, 0]}
        color="#F1EFF4"
      >
        2
      </Text>
      <Text
        position={[0, -0.26, 0.05]}
        fontSize={0.4}
        rotation={[-1.58, 3.13, 0]}
        color="#F1EFF4"
      >
        2
      </Text>
      <Text
        position={[-0.26, -0.05, 0]}
        fontSize={0.4}
        rotation={[0, -1.58, 0]}
        color="#F1EFF4"
      >
        2
      </Text>
      <Text
        position={[0.26, -0.05, 0]}
        fontSize={0.4}
        rotation={[0, 1.58, 0]}
        color="#F1EFF4"
      >
        2
      </Text> */}
    </mesh>
  );
};

export default Meteorite;
