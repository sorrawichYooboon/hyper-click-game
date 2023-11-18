import React, { useState, useEffect } from "react";
import { FaShieldHeart } from "react-icons/fa6";
import Button from "src/components/Button";
import { Canvas } from "@react-three/fiber";
import { debounce } from "src/utils/time";
import Stars from "src/pages/GamesPage/HyperClickGame/components/Stars";
import Overlay from "src/pages/GamesPage/HyperClickGame/components/Overlay";
import Camera from "src/pages/GamesPage/HyperClickGame/components/Camera";
import abstractSound from "src/assets/sounds/abstract_1.mp3";
import gameStartClickSound from "src/assets/sounds/game_start_1.mp3";
import lowCombo from "src/assets/sounds/combo_1.mp3";
import powerUp from "src/assets/sounds/power_up_1.mp3";
import powerDown from "src/assets/sounds/power_down_1.mp3";
import Meteorite from "src/pages/GamesPage/HyperClickGame/components/Meteorite";
import FakeMeteorite from "src/pages/GamesPage/HyperClickGame/components/FakeMeteorite";
import ShieldMeteorite from "src/pages/GamesPage/HyperClickGame/components/ShieldMeteorite";
import useSound from "use-sound";

const HyperClickGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [life, setLife] = useState<number>(5);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [abstractSoundVolumn, setAbstractSoundVolumn] = useState<number>(0.3);
  const [
    playAbstractSound,
    { stop: stopAbstractSound, pause: pauseAbstractSound },
  ] = useSound(abstractSound, {
    volume: abstractSoundVolumn,
    loop: true,
  });
  const [playGameStartClickSound] = useSound(gameStartClickSound, {
    volume: 0.4,
  });
  const [playLowComboSound] = useSound(lowCombo, { volume: 1 });
  const [playPowerUpSound] = useSound(powerUp, { volume: 0.5 });
  const [playPowerDownSound] = useSound(powerDown, { volume: 1 });

  const handleGameStart = () => {
    if (isGameStarted) return;
    playAbstractSound();
    setIsGamePaused(false);
    playGameStartClickSound();
    setLife(5);
    setIsGameStarted(true);

    setTimeout(() => {
      setIsGameOver(false);
    }, 1000);
  };

  const handlePauseGame = () => {
    setIsGamePaused((prevIsGamePaused) => !prevIsGamePaused);
  };
  const debouncedHandlePauseGame = debounce(handlePauseGame, 100);

  const handleMuteSound = () => {
    if (abstractSoundVolumn === 0) {
      setAbstractSoundVolumn(0.3);
    } else {
      setAbstractSoundVolumn(0);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.code === "Space") {
      debouncedHandlePauseGame();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    console.log(isGamePaused);
    if (!isGamePaused) {
      playAbstractSound();
      playPowerUpSound();
    } else {
      pauseAbstractSound();
      playPowerDownSound();
    }
  }, [isGamePaused]);

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
          <span>LIFE:</span>
          <div className="ml-2 flex">
            {Array.from(Array(life).keys()).map((_, index) => (
              <FaShieldHeart key={index} className="text-aqua text-3xl ml-1" />
            ))}
          </div>
        </div>
      </div>
      <div className="fixed right-0 mt-4 mr-4 z-10">
        <div className="flex">
          <div className="flex flex-col justify-center items-center">
            <Button
              label={isGamePaused ? "Resume" : "Pause"}
              color="aqua"
              type="outline"
              className={`!opacity-0 !transition-all !duration-700 !z-20 w-[70px] h-[40px] text-[24px] !text-white !bg-blue !bg-opacity-5 ${
                isGameStarted
                  ? "!opacity-100"
                  : "!opacity-0 !pointer-events-none"
              }`}
              onClick={() => debouncedHandlePauseGame()}
            />
            <div
              className={`text-aqua opacity-0 transition-all duration-700 z-20 select-none text-xs mt-1 ${
                isGameStarted ? "!opacity-100" : "!opacity-0"
              }`}
            >
              SPACE BAR
            </div>
          </div>
          <Button
            label={abstractSoundVolumn === 0 ? "Unmute" : "Mute"}
            color="green"
            type="outline"
            className="z-20 w-[120px] h-[40px] text-[24px] !text-white !bg-blue !bg-opacity-5 !ml-2"
            onClick={() => handleMuteSound()}
          />
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
          isGamePaused={isGamePaused}
        />
        <Meteorite
          numberToClickGoal={2}
          setScore={setScore}
          setLife={setLife}
          isGameStarted={isGameStarted}
          isGamePaused={isGamePaused}
        />
        <Meteorite
          numberToClickGoal={3}
          setScore={setScore}
          setLife={setLife}
          isGameStarted={isGameStarted}
          isGamePaused={isGamePaused}
        />
        <FakeMeteorite
          setLife={setLife}
          isGameStarted={isGameStarted}
          isGamePaused={isGamePaused}
        />
        <FakeMeteorite
          setLife={setLife}
          isGameStarted={isGameStarted}
          isGamePaused={isGamePaused}
        />
        <ShieldMeteorite
          life={life}
          setLife={setLife}
          isGameStarted={isGameStarted}
          isGamePaused={isGamePaused}
        />
      </Canvas>
    </div>
  );
};

export default HyperClickGame;
