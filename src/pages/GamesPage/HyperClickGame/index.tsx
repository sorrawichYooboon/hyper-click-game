import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Stars from "src/pages/GamesPage/HyperClickGame/components/Stars";
import Overlay from "src/pages/GamesPage/HyperClickGame/components/Overlay";
import inspiringSound from "src/assets/emotional-inspiring-epic-trailer-11258.mp3";
import Meteorite from "src/pages/GamesPage/HyperClickGame/components/Meteorite";
import useSound from "use-sound";

const HyperClickGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(0);
  const [play] = useSound(inspiringSound, {
    volume: 0.05,
  });

  const handleGameStart = () => {
    if (gameStart) return;
    play();
    setGameStart(true);
    setZoom(50);
  };

  const handleMeteoriteClick = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <Overlay handleGameStart={handleGameStart} gameStart={gameStart} />
      <span className="z-10 text-white">score: {score}</span>
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}>
        <Stage environment="city">
          <Stars />
          {/* <ambientLight intensity={0.5} /> */}
          {/* <pointLight position={[10, 10, 10]} /> */}
          <OrbitControls
            target={[0, 0, 0]}
            makeDefault
            enableZoom={false}
            enablePan={false}
          />
        </Stage>
        <Meteorite onClick={handleMeteoriteClick} />
        <Meteorite onClick={handleMeteoriteClick} />
        <Meteorite onClick={handleMeteoriteClick} />
        <Meteorite onClick={handleMeteoriteClick} />
        <Meteorite onClick={handleMeteoriteClick} />
        <Meteorite onClick={handleMeteoriteClick} />
        <Meteorite onClick={handleMeteoriteClick} />
      </Canvas>
    </div>
  );
};

export default HyperClickGame;
