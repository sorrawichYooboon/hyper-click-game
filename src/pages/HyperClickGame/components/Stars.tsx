import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, memo } from "react";

const Stars = (props: any) => {
  const ref = useRef<THREE.Mesh>(null!);
  const sphere = new Float32Array(1000 * 3);
  const moveSpeed = 2.5;
  for (let i = 0; i < sphere.length; i += 3) {
    const radius = 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    sphere[i] = x;
    sphere[i + 1] = y;
    sphere[i + 2] = z;
  }

  useFrame((_, delta) => {
    ref.current.rotation.x += moveSpeed * delta * 0.05;
    ref.current.rotation.y += moveSpeed * delta * 0.05;
  });

  return (
    <group>
      <Points
        ref={ref}
        positions={sphere}
        frustumCulled={false}
        {...props}
        scale={3.5}
      >
        <PointMaterial color="white" size={0.04} />
      </Points>
    </group>
  );
};

export default memo(Stars);
