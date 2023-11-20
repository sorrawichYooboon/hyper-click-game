import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { randomPositionOrNegativeNumber } from "src/utils/calculations";
import BoxModel from "src/components/Models/BoxModel";
import meteoriteClickSound from "src/assets/sounds/click_1.mp3";
import getScore from "src/assets/sounds/get_score_1.mp3";
import lostLife from "src/assets/sounds/lost_life_1.mp3";
import useSound from "use-sound";

interface MeteoriteProps {
  numberToClickGoal: number;
  setScore: any;
  setLife: any;
  isGameStarted: boolean;
  isGamePaused: boolean;
}

const mappingNumberColor = (number: number) => {
  switch (number) {
    case 1:
      return "#03D7AE";
    case 2:
      return "#08C4EC";
    case 3:
      return "#307ADF";
    case 4:
      return "#F26546";
    case 5:
      return "#D436C5";
    default:
      return "#FFFFFF";
  }
};

const Meteorite: React.FC<MeteoriteProps> = ({
  numberToClickGoal,
  setScore,
  setLife,
  isGameStarted,
  isGamePaused,
}: MeteoriteProps) => {
  const getRandomPosition = (): [number, number, number] => [
    (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
    (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
    -(Math.random() * 10 + 30),
  ];

  const ref = useRef<THREE.Mesh>(null!);
  const [meshPosition, setMeshPosition] = useState<[number, number, number]>(
    () => getRandomPosition()
  );
  const [meshColor, setMeshColor] = useState<string>(
    mappingNumberColor(numberToClickGoal)
  );
  const [mestColorText, setMeshColorText] = useState<string>("#F1EFF4");
  const [mestText, setMeshText] = useState<number>(numberToClickGoal);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isAlreadyAddedScore, setIsAlreadyAddedScore] =
    useState<boolean>(false);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0);
  const [playMeteoriteClickSound] = useSound(meteoriteClickSound, {
    volume: 1,
  });
  const [playGetScoreSound] = useSound(getScore, { volume: 0.3 });
  const [playLostLifeSound] = useSound(lostLife, { volume: 0.5 });

  const handleMeteoriteClick = () => {
    if (isGamePaused) return;

    setMeshColor("#F1EFF4");
    setMeshColorText("#000000");
    setScale(2.7);
    setTimeout(() => {
      setMeshColor(mappingNumberColor(numberToClickGoal));
      setMeshColorText("#F1EFF4");
    }, 100);
    setClickCount((prevClick) => prevClick + 1);
    if (clickCount < numberToClickGoal) {
      playMeteoriteClickSound();
    }
  };

  useFrame(() => {
    if (isGamePaused) return;
    if (!isGameStarted) {
      setScale((prevScale) => (prevScale > 0 ? prevScale - 0.05 : 0));
      if (scale === 0) {
        setMeshPosition(getRandomPosition);
      }
      return;
    }
    ref.current.rotation.x += 0.04 * window.devicePixelRatio;
    ref.current.rotation.y += 0.04 * window.devicePixelRatio;
    ref.current.position.z += (Math.random() / 6) * window.devicePixelRatio;
    if (ref.current.position.z < -30) {
      setScale(0);
    }

    if (ref.current.position.z > 4 || clickCount >= numberToClickGoal) {
      if (ref.current.position.z > 4) {
        setLife((prevLife: any) => prevLife - 1);
        playLostLifeSound();
      }

      if (clickCount >= numberToClickGoal && !isAlreadyAddedScore) {
        setIsAlreadyAddedScore(true);
        setScore((prevScore: any) => prevScore + numberToClickGoal);
        playGetScoreSound();
        setIsAlreadyAddedScore(false);
      }

      setScale(0);
      setClickCount(0);
      setMeshPosition(getRandomPosition);
      setMeshColor(mappingNumberColor(numberToClickGoal));
      setMeshText(numberToClickGoal);
    }

    if (onHover) {
      setScale((prevScale) => (prevScale > 2.5 ? prevScale : prevScale + 0.05));
    } else {
      setScale((prevScale) =>
        prevScale < 1.5 ? prevScale + 0.05 : prevScale - 0.05
      );
    }
  });

  return (
    <BoxModel
      ref={ref}
      position={meshPosition}
      scale={scale}
      onPointerUp={(e) => {
        e.stopPropagation();
        handleMeteoriteClick();
      }}
      onPointerOver={() => setOnHover(true)}
      onPointerOut={() => setOnHover(false)}
      meshSize={[0.5, 0.5, 0.5]}
      meshColor={meshColor}
      meshText={mestText}
      meshTextSize={0.4}
      meshTextColor={mestColorText}
    />
  );
};

export default Meteorite;
