import { useEffect, useState } from "react";
import Button from "src/components/Button";

interface OverlayProps {
  handleGameStart: () => void;
  gameStart: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ handleGameStart, gameStart }) => {
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
            <h1 className="text-[64px]">Hyper Click Game</h1>
          </div>
          <Button
            label="START"
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
