import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { randomPositionOrNegativeNumber } from "src/utils/calculations";
import EarthModel from "src/components/Models/Earth";
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
    ref.current.rotation.x += 0.04 * window.devicePixelRatio;
    ref.current.rotation.y += 0.04 * window.devicePixelRatio;
    ref.current.position.z += (Math.random() / 5) * window.devicePixelRatio;
    if (ref.current.position.z < -30) {
      setScale(0);
    }

    if (ref.current.position.z > 4) {
      setScale(0);
      setMeshPosition(getRandomPosition());
      setIsHide(false);
    }

    if (!isHide) {
      if (scale === 0.25) return;

      setScale((prevScale) =>
        prevScale < 0.25 ? prevScale + 0.05 : prevScale - 0.05
      );
    }
  });

  return (
    <EarthModel
      ref={ref}
      position={meshPosition}
      scale={scale}
      onPointerUp={(e) => {
        e.stopPropagation();
        handleMeteoriteClick();
      }}
      {...props}
    />
  );
};

export default FakeMeteorite;
