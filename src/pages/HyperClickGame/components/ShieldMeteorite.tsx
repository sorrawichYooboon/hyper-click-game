import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { debounce } from "src/utils/time";
import IcosahedronModel from "src/components/Models/IcosahedronModel";
import * as THREE from "three";
import {
  randomPositionOrNegativeNumber,
  randomNumberRange,
} from "src/utils/calculations";
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

  const debouncedHandleMeteoriteClick = debounce(handleMeteoriteClick, 25);

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
    ref.current.rotation.x += 0.05 / window.devicePixelRatio;
    ref.current.rotation.y += 0.05 / window.devicePixelRatio;
    ref.current.position.z += Math.random() / 2 / window.devicePixelRatio;
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
          prevScale > 1.7 ? prevScale : prevScale + 0.05
        );
      } else {
        setScale((prevScale) =>
          prevScale < 1.3 ? prevScale + 0.05 : prevScale - 0.05
        );
      }
    }
  });

  return (
    <IcosahedronModel
      ref={ref}
      position={meshPosition}
      scale={scale}
      onPointerUp={(e) => {
        e.stopPropagation();
        debouncedHandleMeteoriteClick();
      }}
      onPointerOver={() => setOnHover(true)}
      onPointerOut={() => setOnHover(false)}
      meshText="S"
      {...props}
    />
  );
};

export default ShieldMeteorite;
