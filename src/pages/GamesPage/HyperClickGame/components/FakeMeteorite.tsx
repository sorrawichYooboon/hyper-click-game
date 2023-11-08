import { ThreeEvent, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { randomPositionOrNegativeNumber } from "src/utils/calculations";
import lostLife from "src/assets/mixkit-negative-tone-interface-tap-2569.mp3";
import useSound from "use-sound";

interface FakeMeteoriteProps {
  setLife: any;
}

const FakeMeteorite: React.FC<FakeMeteoriteProps> = ({
  setLife,
  ...props
}: FakeMeteoriteProps) => {
  const { nodes, materials } = useGLTF("/earth.gltf") as any;
  const ref = useRef<any>(null);
  const [meshPosition, setMeshPosition] = useState<[number, number, number]>([
    (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
    (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
    -(Math.random() * 10 + 30),
  ]);
  const [meshColor, setMeshColor] = useState<string>("#AE2035");
  const [mestColorText, setMeshColorText] = useState<string>("#000000");
  const [mestText, setMeshText] = useState<string>("X");
  const [isHide, setIsHide] = useState<boolean>(false);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0.25);
  const [playLostLifeSound] = useSound(lostLife, { volume: 0.5 });

  const handleMeteoriteClick = () => {
    setLife((prevLife: any) => prevLife - 1);
    playLostLifeSound();
    setScale(0);
    setIsHide(true);
  };

  useFrame(() => {
    ref.current.rotation.x += 0.06;
    ref.current.rotation.y += 0.06;
    ref.current.position.z += Math.random() / 3;
    if (ref.current.position.z < -30) {
      setScale(0);
    }

    if (ref.current.position.z > 4) {
      setScale(0);
      setMeshPosition([
        (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
        (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
        -(Math.random() * 10 + 30),
      ]);
      setIsHide(false);
    }

    if (!isHide) {
      if (scale === 0.25) return;

      setScale((prevScale) =>
        prevScale < 0.25 ? prevScale + 0.05 : prevScale - 0.05
      );
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
    <group
      ref={ref}
      {...props}
      position={meshPosition}
      scale={scale}
      onPointerUp={(e) => {
        e.stopPropagation();
        handleMeteoriteClick();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => setOnHover(true)}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => setOnHover(false)}
    >
      <mesh
        geometry={nodes.earth4_blinn1_0.geometry}
        material={materials.blinn1}
        scale={[0.3, 0.3, 0.3]}
      />
      <mesh
        geometry={nodes.earth4_lambert1_0.geometry}
        material={materials.lambert1}
        scale={[0.3, 0.3, 0.3]}
      />
    </group>
  );
};

export default FakeMeteorite;
