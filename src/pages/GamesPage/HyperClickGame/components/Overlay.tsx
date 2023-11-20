import { memo } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import Button from "src/components/Button";
import BoxModel from "src/components/Models/BoxModel";
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

  const MemoScoreBox = memo(ScoreBox);

  const LostLifeBox = () => {
    const lostScoreMeshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
      lostScoreMeshRef.current.rotation.x += 0.015 * window.devicePixelRatio;
      lostScoreMeshRef.current.rotation.y += 0.015 * window.devicePixelRatio;
    });

    const textsPosition = [
      { position: [0.3, 0.5, 0.25], rotation: [2.31, -0.6, -0.57] },
      { position: [-0.3, 0.5, 0.25], rotation: [2.31, 0.6, 0.57] },
      { position: [0.3, -0.5, 0.25], rotation: [-2.31, -0.6, 0.57] },
      { position: [0.3, 0.5, -0.25], rotation: [-2.31, 0.6, -0.57] },
      { position: [-0.3, 0.5, -0.25], rotation: [-2.31, -0.6, 0.57] },
      { position: [0.3, -0.5, -0.25], rotation: [2.31, 0.6, 0.57] },
      { position: [-0.3, -0.5, 0.25], rotation: [-2.31, 0.6, -0.57] },
      { position: [-0.3, -0.5, -0.25], rotation: [2.31, -0.6, -0.57] },
    ];

    return (
      <mesh ref={lostScoreMeshRef} position={[0, 0, 0]} scale={2.3}>
        <octahedronGeometry />
        <meshPhysicalMaterial color="#AE2035" />
        {textsPosition.map((text, index) => (
          <Text
            key={index}
            position={text.position as [number, number, number]}
            fontSize={0.4}
            rotation={text.rotation as [number, number, number]}
          >
            X
          </Text>
        ))}
      </mesh>
    );
  };

  const GainLifeBox = () => {
    const gainLifeMeshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
      gainLifeMeshRef.current.rotation.x += 0.015 * window.devicePixelRatio;
      gainLifeMeshRef.current.rotation.y += 0.015 * window.devicePixelRatio;
    });

    const textsPosition = [
      { position: [0.48, 0.45, 0.47], rotation: [-0.72, 0.6, 0.95] },
      { position: [-0.48, 0.45, 0.47], rotation: [2.4, -2.6, 2.2] },
      { position: [0.5, -0.45, 0.45], rotation: [0.8, 0.7, 2.2] },
      { position: [0.42, 0.5, -0.48], rotation: [0.82, 2.45, 2.25] },
      { position: [-0.48, -0.45, 0.47], rotation: [-2.4, -2.45, 0.85] },
      { position: [-0.48, -0.45, -0.47], rotation: [-0.72, -2.45, 2.15] },
      { position: [0.48, -0.45, -0.47], rotation: [2.4, -2.6, 2.2] },
      { position: [-0.48, 0.45, -0.47], rotation: [-2.4, 2.6, 2.2] },
    ];

    return (
      <mesh ref={gainLifeMeshRef} position={[0, 0, 0]} scale={2} castShadow>
        <icosahedronGeometry />
        <meshNormalMaterial />
        {textsPosition.map((text, index) => (
          <Text
            key={index}
            position={text.position as [number, number, number]}
            fontSize={0.4}
            rotation={text.rotation as [number, number, number]}
          >
            S
          </Text>
        ))}
      </mesh>
    );
  };

  const handleGameMode = (mode: string) => {
    playClickSound();
    setGameMode(mode);
  };

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
        <div className="flex flex-col justify-center items-center">
          <div className="mb-10">
            <h1 className="text-[64px]">
              {gameOver ? "Game Over" : "Hyper Click Game"}
            </h1>
          </div>
          <div className="flex h-[480px] w-[960px] justify-between mb-10">
            <div className="w-full flex flex-col items-center">
              <div>Tutorial</div>
              <div className="mt-4 w-full h-[calc(100%-112px)]">
                <div>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio
                  asperiores cum rem! Maiores mollitia fuga dolores! Eius libero
                </div>
                <div className="flex flex-col h-full w-full mt-2">
                  <div className="flex w-full h-full">
                    <div className="w-[200px] h-[100px]">
                      <Canvas>
                        <rectAreaLight
                          width={10}
                          height={10}
                          position={[0, 0, 5]}
                          castShadow
                        />
                        <ambientLight intensity={0.5} />
                        <MemoScoreBox />
                      </Canvas>
                    </div>
                    <div className="w-full h-full flex items-center mt-[-12px]">
                      Score Box
                    </div>
                  </div>
                  <div className="flex w-full h-full">
                    <div className="w-[200px] h-[100px]">
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
                    <div className="w-full h-full flex items-center mt-[-12px]">
                      Lost Life Box
                    </div>
                  </div>
                  <div className="flex w-full h-full">
                    <div className="w-[200px] h-[100px]">
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
                    <div className="w-full h-full flex items-center mt-[-12px]">
                      Gain Life Box
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center border-l border-r rounded border-[#307ADF]/40">
              <div className="flex flex-col">
                <div className="flex justify-center">
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
                <div className="flex flex-col mt-4 gap-10 h-full mb-10">
                  <Button
                    label={"Easy"}
                    color="blue"
                    type="outline"
                    onClick={() => handleGameMode(GAME_MODE.EASY)}
                    className={`z-20 w-[200px] h-[50px] text-[24px] !bg-green ${
                      gameMode === GAME_MODE.EASY
                        ? "!border-green !bg-opacity-50 !text-white"
                        : "!border-green !bg-opacity-5 !text-white"
                    }`}
                  />
                  <Button
                    label={"Medium"}
                    color="blue"
                    type="outline"
                    onClick={() => handleGameMode(GAME_MODE.MEDIUM)}
                    className={`z-20 w-[200px] h-[50px] text-[24px] !bg-blue ${
                      gameMode === GAME_MODE.MEDIUM
                        ? "!border-blue !bg-opacity-50 !text-white"
                        : "!border-blue !bg-opacity-5 !text-white"
                    }`}
                  />
                  <Button
                    label={"Hard"}
                    color="blue"
                    type="outline"
                    onClick={() => handleGameMode(GAME_MODE.HARD)}
                    className={`z-20 w-[200px] h-[50px] text-[24px] !bg-orange ${
                      gameMode === GAME_MODE.HARD
                        ? "!border-orange !bg-opacity-50 !text-white"
                        : "!border-orange !bg-opacity-5 !text-white"
                    }`}
                  />
                  <Button
                    label={"Hell"}
                    color="blue"
                    type="outline"
                    onClick={() => handleGameMode(GAME_MODE.HELL)}
                    className={`z-20 w-[200px] h-[50px] text-[24px] !bg-pink ${
                      gameMode === GAME_MODE.HELL
                        ? "!border-pink !bg-opacity-50 !text-white"
                        : "!border-pink !bg-opacity-5 !text-white"
                    }`}
                  />
                  <Button
                    label={"Dynamic"}
                    color="blue"
                    type="outline"
                    onClick={() => handleGameMode(GAME_MODE.DYNAMIC)}
                    className={`z-20 w-[200px] h-[50px] text-[24px] !bg-pink ${
                      gameMode === GAME_MODE.DYNAMIC
                        ? "!border-pink !bg-opacity-50 !text-white"
                        : "!border-pink !bg-opacity-5 !text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className=" w-full flex justify-center">Score board</div>
          </div>
          <Button
            label={gameOver ? "Play Again" : "Start"}
            color="blue"
            type="outline"
            className="z-20 w-[200px] h-[50px] text-[24px] !text-white !bg-blue !bg-opacity-5"
            onClick={() => handleGameStart()}
          />
        </div>
      </div>
      {/* <div className="fixed text-white bottom-0 right-0 mb-4 mr-4">Sound Credit</div> */}
    </div>
  );
};

export default Overlay;
