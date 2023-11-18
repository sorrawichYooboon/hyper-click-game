import { useEffect, useState } from "react";
import Button from "src/components/Button";

interface OverlayProps {
  handleGameStart: () => void;
  gameStart: boolean;
  gameOver: boolean;
}

const Overlay: React.FC<OverlayProps> = ({
  handleGameStart,
  gameStart,
  gameOver,
}) => {
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  useEffect(() => {
    if (gameStart) {
      setFadeIn(false);
      return;
    }

    setTimeout(() => {
      setFadeIn(true);
    }, 700);
  }, [gameStart, fadeIn]);

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
            <div className="w-full flex justify-center">Tutorial</div>
            <div className="w-full flex justify-center border-l border-r rounded border-[#307ADF]/40">
              <div className="flex flex-col">
                <span className="flex justify-center">Select Mode</span>
                <div className="flex flex-col justify-center gap-10 h-full mb-10">
                  <Button
                    label={"Easy"}
                    color="blue"
                    type="outline"
                    className="z-20 w-[200px] h-[50px] text-[24px] !text-white !bg-green !border-green !bg-opacity-5"
                  />
                  <Button
                    label={"Medium"}
                    color="blue"
                    type="outline"
                    className="z-20 w-[200px] h-[50px] text-[24px] !text-white !bg-orange !border-orange !bg-opacity-5"
                  />
                  <Button
                    label={"Hard"}
                    color="blue"
                    type="outline"
                    className="z-20 w-[200px] h-[50px] text-[24px] !text-white !bg-pink !border-pink !bg-opacity-5"
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
    </div>
  );
};

export default Overlay;
