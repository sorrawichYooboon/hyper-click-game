import React, { useState, useEffect } from "react";
import { FaShieldHeart } from "react-icons/fa6";
import { Canvas } from "@react-three/fiber";
import Stars from "src/pages/GamesPage/HyperClickGame/components/Stars";
import Overlay from "src/pages/GamesPage/HyperClickGame/components/Overlay";
import Camera from "src/pages/GamesPage/HyperClickGame/components/Camera";
import abstractSound from "src/assets/floating-abstract-142819.mp3";
import gameStartClickSound from "src/assets/mixkit-water-sci-fi-bleep-902.mp3";
import lowCombo from "src/assets/combo1.mp3";
import Meteorite from "src/pages/GamesPage/HyperClickGame/components/Meteorite";
import FakeMeteorite from "src/pages/GamesPage/HyperClickGame/components/FakeMeteorite";
import useSound from "use-sound";

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
    volume: 0.4,
  });
  const [playLowComboSound] = useSound(lowCombo, { volume: 1 });

  const handleGameStart = () => {
    if (isGameStarted) return;
    playAbstractSound();
    playGameStartClickSound();
    setLife(5);
    setIsGameStarted(true);

    setTimeout(() => {
      setIsGameOver(false);
    }, 1000);
  };

  useEffect(() => {
    if (life === 0) {
      setIsGameStarted(false);
      setIsGameOver(true);
      stopAbstractSound();
      setScore(0);
    }
  }, [life]);

  useEffect(() => {
    if (score % 5 === 0 && score !== 0) {
      playLowComboSound();
    }
  }, [score]);

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <Overlay
        handleGameStart={handleGameStart}
        gameStart={isGameStarted}
        gameOver={isGameOver}
      />
      {score > 0 && (
        <div className="animate-pulse z-10 text-white select-none absolute right-[25%] top-[20%] w-[200px] h-[100px]">
          <div className="flex justify-center items-center h-full w-full">
            <span
              className={`text-3xl italic ${
                score % 5 === 0 && score !== 0 && "text-[80px] animate-bounce"
              }`}
            >
              {score}
            </span>
          </div>
        </div>
      )}
      <div
        className={`opacity-0 transition-all duration-700 z-10 text-white select-none fixed bottom-0 mb-14 text-xl ${
          isGameStarted ? "opacity-100" : "opacity-0"
        } ${
          life === 5
            ? `right-[45%]`
            : life === 4
            ? `right-[46%]`
            : life === 3
            ? `right-[47%]`
            : life === 2
            ? `right-[48%]`
            : life === 1
            ? `right-[49%]`
            : `right-[50%]`
        }
        `}
      >
        <div className="flex items-center">
          <span className="mr-4">PAUSE</span>
          <span>LIFE:</span>
          <div className="ml-2 flex">
            {Array.from(Array(life).keys()).map((_, index) => (
              <FaShieldHeart
                key={index}
                className="text-[#08C4EC] text-3xl ml-1"
              />
            ))}
          </div>
        </div>
      </div>
      <Canvas>
        <Stars />
        <rectAreaLight width={10} height={10} position={[0, 0, 5]} castShadow />
        <Camera isGameStarted={isGameStarted} />
        <ambientLight intensity={0.5} />

        <Meteorite
          numberToClickGoal={1}
          setScore={setScore}
          setLife={setLife}
          isGameStarted={isGameStarted}
        />
        <Meteorite
          numberToClickGoal={1}
          setScore={setScore}
          setLife={setLife}
          isGameStarted={isGameStarted}
        />
        <Meteorite
          numberToClickGoal={2}
          setScore={setScore}
          setLife={setLife}
          isGameStarted={isGameStarted}
        />
        <Meteorite
          numberToClickGoal={3}
          setScore={setScore}
          setLife={setLife}
          isGameStarted={isGameStarted}
        />
        <FakeMeteorite setLife={setLife} isGameStarted={isGameStarted} />
        <FakeMeteorite setLife={setLife} isGameStarted={isGameStarted} />
      </Canvas>
    </div>
  );
};

export default HyperClickGame;
