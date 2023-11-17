import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

interface EarthModelProps {
  position?: [number, number, number];
  scale?: number;
  onPointerUp?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
}

const EarthModel = forwardRef<any, EarthModelProps>(
  (
    {
      position = [0, 0, 0],
      scale = 1,
      onPointerUp,
      onPointerOver,
      onPointerOut,
      ...props
    },
    ref
  ) => {
    const { nodes, materials } = useGLTF("/models/earth.gltf") as any;
    return (
      <group
        ref={ref}
        position={position}
        scale={scale}
        onPointerUp={onPointerUp}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        {...props}
      >
        <mesh
          geometry={nodes.earth4_blinn1_0.geometry}
          material={materials.blinn1}
          scale={[0.3, 0.3, 0.3]}
        />
        <mesh
          geometry={nodes.earth4_lambert1_0.geometry}
          material={materials.lambert1}
          scale={[0.3, 0.3, 0.3]}
        />
      </group>
    );
  }
);

export default EarthModel;
