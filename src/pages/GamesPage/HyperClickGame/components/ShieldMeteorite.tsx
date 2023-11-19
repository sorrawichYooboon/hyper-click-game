import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  randomPositionOrNegativeNumber,
  randomNumberRange,
} from "src/utils/calculations";
import { Text } from "@react-three/drei";
import gainLife from "src/assets/sounds/gain_life_1.mp3";
import useSound from "use-sound";

interface ShieldMeteoriteProps {
  life: number;
  setLife: any;
  isGameStarted: boolean;
  isGamePaused: boolean;
}

const ShieldMeteorite: React.FC<ShieldMeteoriteProps> = ({
  life,
  setLife,
  isGameStarted,
  isGamePaused,
  ...props
}: ShieldMeteoriteProps) => {
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
  const [lastGenerateTime, setLastGenerateTime] = useState<number>(0);
  const [isFirstLowerFive, setIsFirstLowerFive] = useState<boolean>(false);
  const [isHide, setIsHide] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0);
  const [playGainLifeSound] = useSound(gainLife, { volume: 2 });

  const handleMeteoriteClick = () => {
    if (isGamePaused || life === 5) return;
    setLife((prevLife: any) => prevLife + 1);
    setIsHide(true);
    playGainLifeSound();
    setScale(0);
    setMeshPosition(getRandomPosition);
    setLastGenerateTime(Date.now());
  };

  useEffect(() => {
    if (life < 5) {
      if (lastGenerateTime === 0) {
        setLastGenerateTime(Date.now());
      }
      setIsFirstLowerFive(true);
    } else {
      setIsFirstLowerFive(false);
    }
  }, [life]);

  useFrame(() => {
    if (isGamePaused || life === 5) return;

    if (!isGameStarted) {
      setScale((prevScale) => (prevScale > 0 ? prevScale - 0.05 : 0));
      if (scale === 0) {
        setMeshPosition(getRandomPosition);
        setIsFirstLowerFive(false);
      }
      return;
    }

    if (isHide) {
      setScale((prevScale) => (prevScale > 0 ? prevScale - 0.05 : 0));
    }

    if (!isFirstLowerFive) return;

    const currentTime = Date.now();
    const regenerateDelay = randomNumberRange(5, 10) * 1000;

    if (currentTime - lastGenerateTime < regenerateDelay) return;
    ref.current.rotation.x += 0.04 * window.devicePixelRatio;
    ref.current.rotation.y += 0.04 * window.devicePixelRatio;
    ref.current.position.z += (Math.random() / 6) * window.devicePixelRatio;
    if (ref.current.position.z < -30) {
      setScale(0);
    }

    if (ref.current.position.z > 4 || isHide) {
      setLastGenerateTime(Date.now());
      setScale(0);
      setMeshPosition(getRandomPosition);
      setIsHide(false);
    }

    if (!isHide) {
      if (onHover) {
        setScale((prevScale) =>
          prevScale > 1.0 ? prevScale : prevScale + 0.05
        );
      } else {
        setScale((prevScale) =>
          prevScale < 0.6 ? prevScale + 0.05 : prevScale - 0.05
        );
      }
    }
  });

  const textsPosition = [
    { position: [0.48, 0.45, 0.47], rotation: [-0.72, 0.6, 0.95] },
    { position: [-0.48, 0.45, 0.47], rotation: [2.4, -2.6, 2.2] },
    { position: [0.5, -0.45, 0.45], rotation: [0.8, 0.7, 2.2] },
    { position: [0.42, 0.5, -0.48], rotation: [0.82, 2.45, 2.25] },
    { position: [-0.48, -0.45, 0.47], rotation: [-2.4, -2.45, 0.85] },
    { position: [-0.48, -0.45, -0.47], rotation: [-0.72, -2.45, 2.15] },
    { position: [0.48, -0.45, -0.47], rotation: [2.4, -2.6, 2.2] },
    { position: [-0.48, 0.45, -0.47], rotation: [-2.4, 2.6, 2.2] },
  ];

  return (
    <mesh
      ref={ref}
      position={meshPosition}
      scale={scale}
      castShadow
      onPointerUp={(e) => {
        e.stopPropagation();
        handleMeteoriteClick();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => setOnHover(true)}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => setOnHover(false)}
      {...props}
    >
      <icosahedronGeometry />
      <meshNormalMaterial />
      {textsPosition.map((text, index) => (
        <Text
          key={index}
          position={text.position as [number, number, number]}
          fontSize={0.4}
          rotation={text.rotation as [number, number, number]}
        >
          S
        </Text>
      ))}
    </mesh>
  );
};

export default ShieldMeteorite;
