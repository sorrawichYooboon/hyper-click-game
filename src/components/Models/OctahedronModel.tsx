import React, { forwardRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";

interface OctahedronModelProps {
  position?: [number, number, number];
  scale?: number;
  onPointerUp?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
  meshColor?: string;
  meshText?: any;
  meshTextSize?: number;
  meshTextColor?: string;
}

const OctahedronModel = forwardRef<any, OctahedronModelProps>(
  (
    {
      position = [0, 0, 0],
      scale = 1,
      onPointerUp,
      onPointerOver,
      onPointerOut,
      meshColor,
      meshText,
      meshTextSize = 0.4,
      meshTextColor = "#F1EFF4",
      ...props
    },
    ref
  ) => {
    const textsPosition = [
      { position: [0.3, 0.5, 0.25], rotation: [2.31, -0.6, -0.57] },
      { position: [-0.3, 0.5, 0.25], rotation: [2.31, 0.6, 0.57] },
      { position: [0.3, -0.5, 0.25], rotation: [-2.31, -0.6, 0.57] },
      { position: [0.3, 0.5, -0.25], rotation: [-2.31, 0.6, -0.57] },
      { position: [-0.3, 0.5, -0.25], rotation: [-2.31, -0.6, 0.57] },
      { position: [0.3, -0.5, -0.25], rotation: [2.31, 0.6, 0.57] },
      { position: [-0.3, -0.5, 0.25], rotation: [-2.31, 0.6, -0.57] },
      { position: [-0.3, -0.5, -0.25], rotation: [2.31, -0.6, -0.57] },
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
        <octahedronGeometry />
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

export default OctahedronModel;
