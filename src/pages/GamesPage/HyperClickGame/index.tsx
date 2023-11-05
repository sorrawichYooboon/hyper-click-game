import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Stars from "src/pages/GamesPage/HyperClickGame/components/Stars";
import Overlay from "src/pages/GamesPage/HyperClickGame/components/Overlay";
import Camera from "src/pages/GamesPage/HyperClickGame/components/Camera";
import inspiringSound from "src/assets/emotional-inspiring-epic-trailer-11258.mp3";
import Meteorite from "src/pages/GamesPage/HyperClickGame/components/Meteorite";
import useSound from "use-sound";

const HyperClickGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [play] = useSound(inspiringSound, {
    volume: 0.05,
  });

  const handleGameStart = () => {
    if (isGameStarted) return;
    play();
    setIsGameStarted(true);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <Overlay handleGameStart={handleGameStart} gameStart={isGameStarted} />
      <span className="z-10 text-white select-none">score: {score}</span>
      <Canvas>
        <Stars />
        <rectAreaLight width={10} height={10} position={[0, 0, 5]} castShadow />
        <Camera isGameStarted={isGameStarted} />
        <ambientLight intensity={0.5} />
        {isGameStarted && (
          <>
            <Meteorite numberToClickGoal={1} setScore={setScore} />
            <Meteorite numberToClickGoal={2} setScore={setScore} />
            <Meteorite numberToClickGoal={3} setScore={setScore} />
          </>
        )}
      </Canvas>
    </div>
  );
};

export default HyperClickGame;
