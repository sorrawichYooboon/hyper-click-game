import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FaShieldHeart } from "react-icons/fa6";
import Button from "src/components/Button";
import { Canvas, useFrame } from "@react-three/fiber";
import { debounce } from "src/utils/time";
import Stars from "src/pages/HyperClickGame/components/Stars";
import Camera from "src/pages/HyperClickGame/components/Camera";
import abstractSound from "src/assets/sounds/abstract_1.mp3";
import gameStartClickSound from "src/assets/sounds/game_start_1.mp3";
import clickSound from "src/assets/sounds/click_1.mp3";
import lowCombo from "src/assets/sounds/combo_1.mp3";
import powerUp from "src/assets/sounds/power_up_1.mp3";
import powerDown from "src/assets/sounds/power_down_1.mp3";
import Meteorite from "src/pages/HyperClickGame/components/Meteorite";
import FakeMeteorite from "src/pages/HyperClickGame/components/FakeMeteorite";
import ShieldMeteorite from "src/pages/HyperClickGame/components/ShieldMeteorite";
import { GAME_MODE } from "src/constants/games";
import GoogleAdSense from "src/components/GoogleAdsense";
import useSound from "use-sound";
import BoxModel from "src/components/Models/BoxModel";
import OctahedronModel from "src/components/Models/OctahedronModel";
import IcosahedronModel from "src/components/Models/IcosahedronModel";

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
  const [playClickSound] = useSound(clickSound, {
    volume: 1,
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
    playClickSound();
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
      fakeMeteoriteAmount: 5,
      shieldMeteoriteAmount: 1,
    },
    [GAME_MODE.MEDIUM]: {
      meteoriteClickGoals: [1, 2, 3],
      fakeMeteoriteAmount: 6,
      shieldMeteoriteAmount: 1,
    },
    [GAME_MODE.HARD]: {
      meteoriteClickGoals: [1, 2, 3, 4],
      fakeMeteoriteAmount: 7,
      shieldMeteoriteAmount: 1,
    },
    [GAME_MODE.HELL]: {
      meteoriteClickGoals: [1, 2, 3, 4, 5],
      fakeMeteoriteAmount: 8,
      shieldMeteoriteAmount: 1,
    },
  };

  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    if (isGameStarted) {
      setFadeIn(false);
      return;
    }

    setTimeout(() => {
      setFadeIn(true);
    }, 700);
  }, [isGameStarted, fadeIn]);

  const ScoreBox = () => {
    const scoreMeshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
      scoreMeshRef.current.rotation.x += 0.05 / window.devicePixelRatio;
      scoreMeshRef.current.rotation.y += 0.05 / window.devicePixelRatio;
    });

    return (
      <BoxModel
        ref={scoreMeshRef}
        position={[0, 0, 0]}
        scale={5}
        meshColor="#08C4EC"
        meshText="2"
      />
    );
  };

  const LostLifeBox = () => {
    const lostScoreMeshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
      lostScoreMeshRef.current.rotation.x += 0.05 / window.devicePixelRatio;
      lostScoreMeshRef.current.rotation.y += 0.05 / window.devicePixelRatio;
    });

    return (
      <OctahedronModel
        ref={lostScoreMeshRef}
        position={[0, 0, 0]}
        scale={2.3}
        meshColor="#AE2035"
        meshText="X"
      />
    );
  };

  const GainLifeBox = () => {
    const gainLifeMeshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
      gainLifeMeshRef.current.rotation.x += 0.05 / window.devicePixelRatio;
      gainLifeMeshRef.current.rotation.y += 0.05 / window.devicePixelRatio;
    });

    return (
      <IcosahedronModel
        ref={gainLifeMeshRef}
        position={[0, 0, 0]}
        scale={2}
        meshText="S"
      />
    );
  };

  const handleGameMode = (mode: string) => {
    playClickSound();
    setGameMode(mode);
  };

  const gameModes = [
    { label: "Easy", color: "green", mode: GAME_MODE.EASY },
    { label: "Medium", color: "blue", mode: GAME_MODE.MEDIUM },
    { label: "Hard", color: "orange", mode: GAME_MODE.HARD },
    { label: "Hell", color: "pink", mode: GAME_MODE.HELL },
  ];

  return (
    <div className="h-screen w-screen bg-black">
      <Helmet>
        <title>Hyper Click Game - Flowech</title>
      </Helmet>
      <GoogleAdSense />

      <div
        className={`text-white w-full h-full flex flex-col transition-all duration-700 overflow-hidden`}
      >
        <div className="w-full pt-2 z-30">
          <div className="flex w-full justify-center">
            <div
              className={`select-none pointer-events-none !transition-all !duration-700 mr-4 mt-1 text-white text-xl sm:text-2xl ${
                isGameStarted
                  ? "!opacity-100"
                  : "!opacity-0 !pointer-events-none"
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
                className={`!opacity-0 !transition-all !duration-700 !z-20 w-[90px] h-[35px] !text-xs !text-white !bg-blue !bg-opacity-5 sm:!text-sm sm:w-[200px] sm:h-[50px] ${
                  isGameStarted
                    ? "!opacity-100"
                    : "!opacity-0 !pointer-events-none"
                }`}
                onClick={() => debouncedHandlePauseGame()}
              />
              <div
                className={`text-aqua opacity-0 transition-all duration-700 z-20 select-none pointer-events-none text-xs mt-1 sm:text-sm ${
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
              className={`z-20 w-[90px] h-[35px] !text-xs !text-white !bg-blue !bg-opacity-5 !ml-2 sm:!text-sm sm:w-[200px] sm:h-[50px] ${
                isGameStarted ? "" : "!fixed text-center"
              }`}
              onClick={() => handleMuteSound()}
            />
          </div>
        </div>
        <div className="overflow-auto h-full w-full z-10 pb-2">
          <div
            className={`min-h-full flex flex-col justify-center items-center ml-4 transition-all duration-700 ${
              isGameStarted && "opacity-0"
            } ${fadeIn ? "opacity-100" : "opacity-0"}`}
          >
            <div className="mb-2">
              <h1 className="font-bold text-3xl sm:text-[52px]">
                {isGameStarted ? "Game Over" : "Hyper Click Game"}
              </h1>
            </div>
            <div className="flex mb-3">
              <div className="w-full flex flex-col items-center text-xs px-2">
                <div className="text-sm font-bold sm:text-xl">Tutorial</div>
                <div className="mt-4 w-full lg:h-[calc(100%-112px)]">
                  <div>
                    <span className="text-xs sm:text-sm">
                      1. Click the score box to{" "}
                      <span className="text-green">score points</span> based on
                      the displayed number and click count.
                    </span>
                    <br />
                    <span className="text-xs sm:text-sm">
                      2. Click the lost life box to{" "}
                      <span className="text-orange">lose a life.</span> You have
                      5 lives.
                    </span>
                    <br />
                    <span className="text-xs sm:text-sm">
                      3. Click the <span className="text-blue">gain life</span>{" "}
                      box to gain 1 life.
                    </span>
                  </div>
                  <div className="flex flex-col h-full w-full mt-2 text-xs">
                    <div className="flex lg:w-full lg:h-full">
                      <div className="w-[100px] h-[50px] sm:w-[200px] sm:h-[100px]">
                        <Canvas>
                          <rectAreaLight
                            width={10}
                            height={10}
                            position={[0, 0, 5]}
                            castShadow
                          />
                          <ambientLight intensity={0.5} />
                          <ScoreBox />
                        </Canvas>
                      </div>
                      <div className="flex items-center sm:text-sm lg:w-full lg:h-full">
                        Score Box
                      </div>
                    </div>
                    <div className="flex lg:w-full lg:h-full">
                      <div className="w-[100px] h-[50px] sm:w-[200px] sm:h-[100px]">
                        <Canvas>
                          <rectAreaLight
                            width={10}
                            height={10}
                            position={[0, 0, 5]}
                            castShadow
                          />
                          <ambientLight intensity={0.5} />
                          <LostLifeBox />
                        </Canvas>
                      </div>
                      <div className="flex items-center mt-[-12px] sm:text-sm lg:w-full lg:h-full">
                        Lost Life Box
                      </div>
                    </div>
                    <div className="flex lg:w-full lg:h-full">
                      <div className="w-[100px] h-[50px] sm:w-[200px] sm:h-[100px]">
                        <Canvas>
                          <rectAreaLight
                            width={10}
                            height={10}
                            position={[0, 0, 5]}
                            castShadow
                          />
                          <ambientLight intensity={0.5} />
                          <GainLifeBox />
                        </Canvas>
                      </div>
                      <div className="flex items-center mt-[-12px] sm:text-sm lg:w-full lg:h-full">
                        Gain Life Box
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center border-l border-[#307ADF]/40 text-xs">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center text-sm font-bold sm:text-xl">
                    Select Mode :{" "}
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
                      &nbsp;{gameMode}
                    </span>
                  </div>
                  <div className="flex flex-col mt-4  h-full gap-6 sm:mb-10 sm:gap-8 lg:gap-10">
                    {gameModes.map(({ label, color, mode }, index) => (
                      <Button
                        key={index}
                        label={label}
                        color="blue"
                        type="outline"
                        onClick={() => handleGameMode(mode)}
                        className={`z-20 !bg-${color} w-[90px] h-[35px] !text-xs sm:!text-sm sm:w-[200px] sm:h-[50px] ${
                          gameMode === mode
                            ? `!border-${color} !bg-opacity-50 !text-white`
                            : `!border-${color} !bg-opacity-5 !text-white`
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Button
              label={isGameOver ? "Play Again" : "Start"}
              color="blue"
              type="outline"
              className="z-20 w-[100px] h-[40px] !text-xs !text-white !bg-blue !bg-opacity-5 sm:!text-sm sm:w-[200px] sm:h-[50px]"
              onClick={() => handleGameStart()}
            />
          </div>
        </div>
        <div
          className={`absolute w-full h-full top-0 ${
            isGameStarted ? "z-20" : "z-0"
          }`}
        >
          <Canvas>
            <Stars />
            <rectAreaLight
              width={10}
              height={10}
              position={[0, 0, 5]}
              castShadow
            />
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
      </div>
      {score > 0 && (
        <div className="select-none pointer-events-none animate-pulse text-white absolute right-[25%] top-[20%] w-[200px] h-[100px]">
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
        className={`opacity-0 transition-all duration-700 z-10 text-white select-none pointer-events-none fixed bottom-0 mb-14 w-full sm:mb-14 sm:text-2xl ${
          isGameStarted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex w-full items-center justify-center">
          <span>LIFE:</span>
          <div className="ml-2 flex">
            {Array.from(Array(life < 0 ? 0 : life).keys()).map((_, index) => (
              <FaShieldHeart
                key={index}
                className="text-aqua text-3xl sm:text-[42px] ml-1"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HyperClickGame;
