import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Stars from "src/pages/GamesPage/HyperClickGame/components/Stars";
import Overlay from "src/pages/GamesPage/HyperClickGame/components/Overlay";
import inspiringSound from "src/assets/emotional-inspiring-epic-trailer-11258.mp3";
import useSound from "use-sound";

const HyperClickGame: React.FC = () => {
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(0); // [0, 50
  const [play] = useSound(inspiringSound, {
    volume: 0.2,
  });

  const handleGameStart = () => {
    if (gameStart) return;

    play();
    setGameStart(true);
    setZoom(50);
  };

  return (
    <div className="w-screen h-screen bg-black">
      <Overlay handleGameStart={handleGameStart} gameStart={gameStart} />
      <Canvas>
        <Stars />
        <OrbitControls
          makeDefault
          maxDistance={7}
          enableZoom={true}
          zoom0={zoom}
        />
      </Canvas>
    </div>
  );
};

export default HyperClickGame;
