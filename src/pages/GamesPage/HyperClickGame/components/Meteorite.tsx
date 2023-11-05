import { ThreeEvent, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { randomPositionOrNegativeNumber } from "src/utils/calculations";

interface MeteoriteProps {
  numberToClickGoal: number;
  setScore: any;
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
  const [mestText, setMeshText] = useState<number>(numberToClickGoal);
  const [clickCount, setClickCount] = useState<number>(0);
  const [onHover, setOnHover] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1.5);

  const handleMeteoriteClick = () => {
    setClickCount((prevClick) => prevClick + 1);
  };

  useFrame(() => {
    ref.current.rotation.x += 0.03;
    ref.current.rotation.y += 0.03;
    ref.current.position.z += Math.random() / 5;
    if (ref.current.position.z < -30) {
      setScale(0);
    }

    if (ref.current.position.z > 30 || clickCount >= numberToClickGoal) {
      if (clickCount >= numberToClickGoal) {
        setScore((prevScore: any) => prevScore + 1);
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
          color="#F1EFF4"
        >
          {mestText}
        </Text>
      ))}
    </mesh>
  );
};

export default Meteorite;
