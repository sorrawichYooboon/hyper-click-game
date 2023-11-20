import { OrbitControls } from "@react-three/drei";
import React from "react";

interface CameraProps {
  isGameStarted: boolean;
}

const Camera: React.FC<CameraProps> = () => {
  return <OrbitControls enableZoom={false} enablePan={false} enabled={false} />;
};

export default Camera;
