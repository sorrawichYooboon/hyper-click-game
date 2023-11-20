import { forwardRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Text } from "@react-three/drei";

interface IcosahedronModelProps {
  position?: [number, number, number];
  scale?: number;
  onPointerUp?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
  meshText?: any;
  meshTextSize?: number;
  meshTextColor?: string;
}

const IcosahedronModel = forwardRef<any, IcosahedronModelProps>(
  (
    {
      position = [0, 0, 0],
      scale = 1,
      onPointerUp,
      onPointerOver,
      onPointerOut,
      meshText,
      meshTextSize = 0.4,
      meshTextColor = "#F1EFF4",
      ...props
    },
    ref
  ) => {
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
        position={position}
        scale={scale}
        castShadow
        onPointerUp={onPointerUp}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        {...props}
      >
        <icosahedronGeometry />
        <meshNormalMaterial />
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

export default IcosahedronModel;
