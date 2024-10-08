import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { debounce } from "src/utils/time";
import { randomPositionOrNegativeNumber } from "src/utils/calculations";
import OctahedronModel from "src/components/Models/OctahedronModel";
import lostLife from "src/assets/sounds/lost_life_1.mp3";
import useSound from "use-sound";

interface FakeMeteoriteProps {
  setLife: any;
  isGameStarted: boolean;
  isGamePaused: boolean;
  level: number;
}

const FakeMeteorite: React.FC<FakeMeteoriteProps> = ({
  setLife,
  isGameStarted,
  isGamePaused,
  level,
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
  const [isProcessingLife, setIsProcessingLife] = useState<boolean>(false);
  const [playLostLifeSound] = useSound(lostLife, { volume: 0.5 });
  const moveSpeed = 10;

  const handleMeteoriteClick = () => {
    if (isGamePaused || isProcessingLife) return;
    setIsProcessingLife(true);
    setLife((prevLife: any) => prevLife - 1);
    playLostLifeSound();
    setScale(0);
    setIsHide(true);
    setIsProcessingLife(false);
  };

  const debouncedHandleMeteoriteClick = debounce(handleMeteoriteClick, 40);

  useFrame((_, delta) => {
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

    const varySpeed = 1 + 2 * (level / 20);
    ref.current.rotation.x += moveSpeed * delta * 0.3 * varySpeed;
    ref.current.rotation.y += moveSpeed * delta * 0.3 * varySpeed;
    ref.current.position.z +=
      Math.random() * moveSpeed * delta * 1.2 * varySpeed;
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
          prevScale > 0.55 ? prevScale : prevScale + 0.05
        );
      } else {
        setScale((prevScale) =>
          prevScale < 0.4 ? prevScale + 0.05 : prevScale - 0.05
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
        debouncedHandleMeteoriteClick();
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
