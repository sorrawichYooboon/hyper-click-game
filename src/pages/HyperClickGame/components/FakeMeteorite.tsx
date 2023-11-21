import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { randomPositionOrNegativeNumber } from "src/utils/calculations";
import OctahedronModel from "src/components/Models/OctahedronModel";
import lostLife from "src/assets/sounds/lost_life_1.mp3";
import useSound from "use-sound";

interface FakeMeteoriteProps {
  setLife: any;
  isGameStarted: boolean;
  isGamePaused: boolean;
}

const FakeMeteorite: React.FC<FakeMeteoriteProps> = ({
  setLife,
  isGameStarted,
  isGamePaused,
  ...props
}: FakeMeteoriteProps) => {
  const getRandomPosition = (): [number, number, number] => [
    (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
    (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
    -(Math.random() * 10 + 30),
  ];

  const ref = useRef<THREE.Mesh>(null!);
  const [meshPosition, setMeshPosition] = useState<[number, number, number]>(
    () => getRandomPosition()
  );
  const [onHover, setOnHover] = useState<boolean>(false);
  const [isHide, setIsHide] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0);
  const [playLostLifeSound] = useSound(lostLife, { volume: 0.5 });

  const handleMeteoriteClick = () => {
    if (isGamePaused) return;
    setLife((prevLife: any) => prevLife - 1);
    playLostLifeSound();
    setScale(0);
    setIsHide(true);
  };

  useFrame(() => {
    if (isGamePaused) return;

    if (!isGameStarted) {
      setScale((prevScale) => (prevScale > 0 ? prevScale - 0.05 : 0));
      if (scale === 0) {
        setMeshPosition(getRandomPosition());
      }
      return;
    }

    if (isHide) {
      setScale((prevScale) => (prevScale > 0 ? prevScale - 0.05 : 0));
    }

    ref.current.rotation.x += 0.04 * window.devicePixelRatio;
    ref.current.rotation.y += 0.04 * window.devicePixelRatio;
    ref.current.position.z += (Math.random() / 6) * window.devicePixelRatio;
    if (ref.current.position.z < -30) {
      setScale(0);
    }

    if (ref.current.position.z > 4) {
      setScale(0);
      setMeshPosition(getRandomPosition());
      setIsHide(false);
    }

    if (!isHide) {
      if (onHover) {
        setScale((prevScale) =>
          prevScale > 1.8 ? prevScale : prevScale + 0.05
        );
      } else {
        setScale((prevScale) =>
          prevScale < 1.4 ? prevScale + 0.05 : prevScale - 0.05
        );
      }
    }
  });

  return (
    <OctahedronModel
      ref={ref}
      position={meshPosition}
      scale={scale}
      onPointerUp={(e) => {
        e.stopPropagation();
        handleMeteoriteClick();
      }}
      onPointerOver={() => setOnHover(true)}
      onPointerOut={() => setOnHover(false)}
      meshColor="#AE2035"
      meshText="X"
      {...props}
    />
  );
};

export default FakeMeteorite;
