import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Stars from "src/pages/GamesPage/HyperClickGame/components/Stars";
import Overlay from "src/pages/GamesPage/HyperClickGame/components/Overlay";
import Camera from "src/pages/GamesPage/HyperClickGame/components/Camera";
import abstractSound from "src/assets/floating-abstract-142819.mp3";
import gameStartClickSound from "src/assets/mixkit-water-sci-fi-bleep-902.mp3";
import Meteorite from "src/pages/GamesPage/HyperClickGame/components/Meteorite";
import FakeMeteorite from "src/pages/GamesPage/HyperClickGame/components/FakeMeteorite";
import useSound from "use-sound";
import { Button } from "@mui/material";

const HyperClickGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [life, setLife] = useState<number>(5);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [playAbstractSound, { stop: stopAbstractSound }] = useSound(
    abstractSound,
    {
      volume: 0.3,
      loop: true,
    }
  );
  const [playGameStartClickSound] = useSound(gameStartClickSound, {
    volume: 0.3,
  });

  const handleGameStart = () => {
    if (isGameStarted) return;
    playAbstractSound();
    playGameStartClickSound();
    setLife(5);
    setIsGameStarted(true);
  };

  useEffect(() => {
    if (life === 0) {
      setIsGameStarted(false);
      setIsGameOver(true);
      stopAbstractSound();
    }
  }, [life]);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <Overlay handleGameStart={handleGameStart} gameStart={isGameStarted} />
      <h3 className="z-10 text-white select-none">Score: {score}</h3>
      <h3 className="z-10 text-white select-none">Life: {life}</h3>
      {isGameOver && <Button>GAME OVER</Button>}
      <Canvas>
        <Stars />
        <rectAreaLight width={10} height={10} position={[0, 0, 5]} castShadow />
        <Camera isGameStarted={isGameStarted} />
        <ambientLight intensity={0.5} />
        {isGameStarted && (
          <>
            <Meteorite
              numberToClickGoal={1}
              setScore={setScore}
              setLife={setLife}
            />
            <Meteorite
              numberToClickGoal={2}
              setScore={setScore}
              setLife={setLife}
            />
            <Meteorite
              numberToClickGoal={3}
              setScore={setScore}
              setLife={setLife}
            />
            <FakeMeteorite setLife={setLife} />
            <FakeMeteorite setLife={setLife} />
          </>
        )}
      </Canvas>
    </div>
  );
};

export default HyperClickGame;
