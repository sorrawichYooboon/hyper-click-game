import { ThreeEvent, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import {
  randomPositionOrNegativeNumber,
  randomColor,
} from "src/utils/calculations";

interface MeteoriteProps {
  onClick: () => void;
}

const Meteorite: React.FC<MeteoriteProps> = ({ onClick }: MeteoriteProps) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [meshPosition, setMeshPosition] = useState<[number, number, number]>([
    Math.random() * 10 * randomPositionOrNegativeNumber(),
    Math.random() * 10 * randomPositionOrNegativeNumber(),
    -11,
  ]);
  const [meshColor, setMeshColor] = useState<string>(randomColor());
  const [mestText, setMeshText] = useState<string>(
    Math.floor(Math.random() * 4 + 1).toString()
  );
  const [onHover, setOnHover] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.position.z += Math.random() / 20;
    if (ref.current.position.z < -10) {
      setScale(0);
    }

    if (ref.current.position.z > 10) {
      ref.current.position.z = -30;
      setMeshPosition([
        (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
        (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
        -(Math.random() * 10 + 5),
      ]);
      setMeshColor(randomColor());
      setMeshText(Math.floor(Math.random() * 4 + 1).toString());
    }

    if (onHover) {
      setScale((prevScale) => {
        if (prevScale > 1.5) return 1.5;
        return prevScale + 0.05;
      });
    } else {
      setScale((prevScale) => {
        if (prevScale > 1) return 1;
        return prevScale + 0.005;
      });
    }
  });

  const textsPosition = [
    { position: [0, -0.05, 0.26], rotation: [0, 0, 0] },
    { position: [0, -0.05, -0.26], rotation: [0, 3.13, 0] },
    { position: [0, 0.26, -0.05], rotation: [1.58, 3.13, 0] },
    { position: [0, -0.26, 0.05], rotation: [-1.58, 3.13, 0] },
    { position: [-0.26, -0.05, 0], rotation: [0, -1.58, 0] },
    { position: [0.26, -0.05, 0], rotation: [0, 1.58, 0] },
  ];

  return (
    <mesh
      onClick={onClick}
      ref={ref}
      position={meshPosition}
      scale={scale}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => setOnHover(true)}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => setOnHover(false)}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={meshColor} />
      {textsPosition.map((text, index) => (
        <Text
          key={index}
          position={text.position as [number, number, number]}
          fontSize={0.4}
          rotation={text.rotation as [number, number, number]}
          color="#F1EFF4"
        >
          {mestText}
        </Text>
      ))}
    </mesh>
  );
};

export default Meteorite;
