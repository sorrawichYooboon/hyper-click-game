import React, { forwardRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";

interface BoxModelProps {
  position?: [number, number, number];
  scale?: number;
  onPointerUp?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
  meshSize?: [number, number, number];
  meshColor?: string;
  meshText?: string;
  meshTextSize?: number;
  meshTextColor?: string;
}

const BoxModel = forwardRef<any, BoxModelProps>(
  (
    {
      position = [0, 0, 0],
      scale = 1,
      onPointerUp,
      onPointerOver,
      onPointerOut,
      meshSize = [0.5, 0.5, 0.5],
      meshColor,
      meshText,
      meshTextSize = 0.4,
      meshTextColor = "#F1EFF4",
      ...props
    },
    ref
  ) => {
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
        position={position}
        scale={scale}
        onPointerUp={onPointerUp}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        {...props}
      >
        <boxGeometry args={meshSize} />
        <meshPhysicalMaterial color={meshColor} />
        {textsPosition.map((text, index) => (
          <Text
            key={index}
            position={text.position as [number, number, number]}
            fontSize={meshTextSize}
            rotation={text.rotation as [number, number, number]}
            color={meshTextColor}
          >
            {meshText}
          </Text>
        ))}
      </mesh>
    );
  }
);

export default BoxModel;
