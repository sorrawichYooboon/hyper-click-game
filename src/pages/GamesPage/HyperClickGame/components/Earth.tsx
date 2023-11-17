import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef(null);
  const { nodes, materials } = useGLTF("/models/earth.gltf") as any;
  return (
    <group ref={group} {...props}>
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

useGLTF.preload("/models/earth.gltf");
