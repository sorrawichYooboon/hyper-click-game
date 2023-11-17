import { ThreeEvent, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { randomPositionOrNegativeNumber } from "src/utils/calculations";
import meteoriteClickSound from "src/assets/sounds/lost_life_2.mp3";
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
  const ref = useRef<THREE.Mesh>(null!);
  const [meshPosition, setMeshPosition] = useState<[number, number, number]>([
    (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
    (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
    -(Math.random() * 10 + 30),
  ]);
  const [meshColor, setMeshColor] = useState<string>(
    mappingNumberColor(numberToClickGoal)
  );
  const [mestColorText, setMeshColorText] = useState<string>("#F1EFF4");
  const [mestText, setMeshText] = useState<number>(numberToClickGoal);
  const [clickCount, setClickCount] = useState<number>(0);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0);
  const [playMeteoriteClickSound] = useSound(meteoriteClickSound, {
    volume: 0.5,
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
        setMeshPosition([
          (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
          (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
          -(Math.random() * 10 + 30),
        ]);
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

      if (clickCount >= numberToClickGoal) {
        setScore((prevScore: any) => prevScore + 1);
        playGetScoreSound();
      }

      setScale(0);
      setClickCount(0);
      setMeshPosition([
        (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
        (Math.random() * 10 * randomPositionOrNegativeNumber()) / 2,
        -(Math.random() * 10 + 30),
      ]);
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
      ref={ref}
      position={meshPosition}
      scale={scale}
      onPointerUp={(e) => {
        e.stopPropagation();
        handleMeteoriteClick();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => setOnHover(true)}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => setOnHover(false)}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshPhysicalMaterial color={meshColor} />
      {textsPosition.map((text, index) => (
        <Text
          key={index}
          position={text.position as [number, number, number]}
          fontSize={0.4}
          rotation={text.rotation as [number, number, number]}
          color={mestColorText}
        >
          {mestText}
        </Text>
      ))}
    </mesh>
  );
};

export default Meteorite;
