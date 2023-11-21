import React, { useState, useEffect } from "react";
import { FaShieldHeart } from "react-icons/fa6";
import Button from "src/components/Button";
import { Canvas } from "@react-three/fiber";
import { debounce } from "src/utils/time";
import Stars from "src/pages/HyperClickGame/components/Stars";
import Overlay from "src/pages/HyperClickGame/components/Overlay";
import Camera from "src/pages/HyperClickGame/components/Camera";
import abstractSound from "src/assets/sounds/abstract_1.mp3";
import gameStartClickSound from "src/assets/sounds/game_start_1.mp3";
import lowCombo from "src/assets/sounds/combo_1.mp3";
import powerUp from "src/assets/sounds/power_up_1.mp3";
import powerDown from "src/assets/sounds/power_down_1.mp3";
import Meteorite from "src/pages/HyperClickGame/components/Meteorite";
import FakeMeteorite from "src/pages/HyperClickGame/components/FakeMeteorite";
import ShieldMeteorite from "src/pages/HyperClickGame/components/ShieldMeteorite";
import { GAME_MODE } from "src/constants/games";
import useSound from "use-sound";

const HyperClickGame: React.FC = () => {
  const [prevScore, setPrevScore] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [life, setLife] = useState<number>(5);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<string>(GAME_MODE.EASY);
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
    if (!isGameStarted) {
      setIsGamePaused(false);
      return;
    }
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
    if (event.code === "ControlLeft") {
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
    if (!isGamePaused) {
      playAbstractSound();
      playPowerUpSound();
    } else {
      pauseAbstractSound();
      playPowerDownSound();
    }
  }, [isGamePaused]);

  useEffect(() => {
    if (life <= 0) {
      setIsGameStarted(false);
      setIsGameOver(true);
      stopAbstractSound();
      setScore(0);
    }
  }, [life]);

  useEffect(() => {
    if (score !== 0) {
      for (let i = prevScore + 1; i <= score; i++) {
        if (i % 5 === 0) {
          playLowComboSound();
        }
      }
      setPrevScore(score);
    }
  }, [score]);

  const gameModeAttributes = {
    [GAME_MODE.EASY]: {
      meteoriteClickGoals: [1, 2],
      fakeMeteoriteAmount: 4,
      shieldMeteoriteAmount: 1,
    },
    [GAME_MODE.MEDIUM]: {
      meteoriteClickGoals: [1, 2, 3],
      fakeMeteoriteAmount: 5,
      shieldMeteoriteAmount: 1,
    },
    [GAME_MODE.HARD]: {
      meteoriteClickGoals: [1, 2, 3, 4],
      fakeMeteoriteAmount: 6,
      shieldMeteoriteAmount: 1,
    },
    [GAME_MODE.HELL]: {
      meteoriteClickGoals: [1, 2, 3, 4, 5],
      fakeMeteoriteAmount: 7,
      shieldMeteoriteAmount: 1,
    },
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <Overlay
        handleGameStart={handleGameStart}
        gameStart={isGameStarted}
        gameOver={isGameOver}
        gameMode={gameMode}
        setGameMode={setGameMode}
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
        className={`opacity-0 transition-all duration-700 z-10 text-white select-none fixed bottom-0 mb-6 lg:mb-14 lg:text-xl w-full ${
          isGameStarted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex w-full items-center justify-center">
          <span>LIFE:</span>
          <div className="ml-2 flex">
            {Array.from(Array(life < 0 ? 0 : life).keys()).map((_, index) => (
              <FaShieldHeart key={index} className="text-aqua text-3xl ml-1" />
            ))}
          </div>
        </div>
      </div>
      <div className="fixed z-10 w-full lg:right-0 lg:mt-4 lg:mr-4">
        <div className="flex w-full justify-center mt-2">
          <div
            className={`!transition-all !duration-700 mr-4 mt-1 text-white select-none text-xl lg:text-xl ${
              isGameStarted ? "!opacity-100" : "!opacity-0 !pointer-events-none"
            }`}
          >
            Mode :&nbsp;
            <span
              className={`${
                gameMode === GAME_MODE.EASY
                  ? "text-green"
                  : gameMode === GAME_MODE.MEDIUM
                  ? "text-blue"
                  : gameMode === GAME_MODE.HARD
                  ? "text-orange"
                  : gameMode === GAME_MODE.HELL
                  ? "text-pink"
                  : "text-pink"
              }`}
            >
              {gameMode}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Button
              label={isGamePaused ? "Resume" : "Pause"}
              color="aqua"
              type="outline"
              className={`!opacity-0 !transition-all !duration-700 !z-20 w-[90px] h-[35px] !text-xs !text-white !bg-blue !bg-opacity-5 lg:w-[120px] lg:h-[40px] lg:text-[24px] ${
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
              (Left Ctrl)
            </div>
          </div>
          <Button
            label={abstractSoundVolumn === 0 ? "Unmute" : "Mute"}
            color="green"
            type="outline"
            className={`z-20 w-[90px] h-[35px] !text-xs !text-white !bg-blue !bg-opacity-5 !ml-2 lg:w-[120px] lg:h-[40px] lg:text-[24px] ${
              isGameStarted ? "" : "!fixed text-center"
            }`}
            onClick={() => handleMuteSound()}
          />
        </div>
      </div>
      <Canvas>
        <Stars />
        <rectAreaLight width={10} height={10} position={[0, 0, 5]} castShadow />
        <Camera isGameStarted={isGameStarted} />
        <ambientLight intensity={0.5} />
        {gameModeAttributes[gameMode].meteoriteClickGoals.map(
          (numberToClickGoal, index) => (
            <Meteorite
              key={index}
              numberToClickGoal={numberToClickGoal}
              setScore={setScore}
              setLife={setLife}
              isGameStarted={isGameStarted}
              isGamePaused={isGamePaused}
            />
          )
        )}
        {Array.from(
          Array(gameModeAttributes[gameMode].fakeMeteoriteAmount).keys()
        ).map((_, index) => (
          <FakeMeteorite
            key={index}
            setLife={setLife}
            isGameStarted={isGameStarted}
            isGamePaused={isGamePaused}
          />
        ))}
        {Array.from(
          Array(gameModeAttributes[gameMode].shieldMeteoriteAmount).keys()
        ).map((_, index) => (
          <ShieldMeteorite
            key={index}
            life={life}
            setLife={setLife}
            isGameStarted={isGameStarted}
            isGamePaused={isGamePaused}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default HyperClickGame;
