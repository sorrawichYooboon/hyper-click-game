import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import Button from "src/components/Button";
import BoxModel from "src/components/Models/BoxModel";
import OctahedronModel from "src/components/Models/OctahedronModel";
import IcosahedronModel from "src/components/Models/IcosahedronModel";
import clickSound from "src/assets/sounds/click_1.mp3";
import { GAME_MODE } from "src/constants/games";
import useSound from "use-sound";

interface OverlayProps {
  handleGameStart: () => void;
  gameMode: string;
  setGameMode: (mode: string) => void;
  gameStart: boolean;
  gameOver: boolean;
}

const Overlay: React.FC<OverlayProps> = ({
  handleGameStart,
  gameMode,
  setGameMode,
  gameStart,
  gameOver,
}) => {
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [playClickSound] = useSound(clickSound, {
    volume: 1,
  });

  useEffect(() => {
    if (gameStart) {
      setFadeIn(false);
      return;
    }

    setTimeout(() => {
      setFadeIn(true);
    }, 700);
  }, [gameStart, fadeIn]);

  const ScoreBox = () => {
    const scoreMeshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
      scoreMeshRef.current.rotation.x += 0.015 * window.devicePixelRatio;
      scoreMeshRef.current.rotation.y += 0.015 * window.devicePixelRatio;
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
      lostScoreMeshRef.current.rotation.x += 0.015 * window.devicePixelRatio;
      lostScoreMeshRef.current.rotation.y += 0.015 * window.devicePixelRatio;
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
      gainLifeMeshRef.current.rotation.x += 0.015 * window.devicePixelRatio;
      gainLifeMeshRef.current.rotation.y += 0.015 * window.devicePixelRatio;
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
    <div
      className={`opacity-0 transition-all duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`absolute text-white w-full h-full flex justify-center items-center transition-all duration-700 ${
          gameStart && "opacity-0 z-0"
        }`}
      >
        <div className="ml-4 flex flex-col justify-center items-center mt-10">
          <div className="mb-5 sm:mb-10">
            <h1 className="font-bold text-3xl sm:text-[52px] lg:text-[64px]">
              {gameOver ? "Game Over" : "Hyper Click Game"}
            </h1>
            {/* <div>Previous Score : 0</div> */}
          </div>
          <div className="flex justify-between mb-5 lg:mb-10 lg:h-[480px] lg:w-[960px]">
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
                    <span className="text-orange">lose a life.</span> You have 5
                    lives.
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
                    <div className="flex items-center mt-[-12px] sm:text-sm lg:w-full lg:h-full">
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
            label={gameOver ? "Play Again" : "Start"}
            color="blue"
            type="outline"
            className="z-20 w-[100px] h-[40px] !text-xs !text-white !bg-blue !bg-opacity-5 sm:!text-sm sm:w-[200px] sm:h-[50px]"
            onClick={() => handleGameStart()}
          />
        </div>
      </div>
    </div>
  );
};

export default Overlay;
