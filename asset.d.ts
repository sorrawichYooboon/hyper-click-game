declare module "*.mp3" {
  const value: any;
  export default value;
}

declare module "react-script-tag";

declare module "*.gltf" {
  const value: any;
  export default value;
}

declare module "use-sound" {
  type PlayOptions = {
    volume?: number;
    playbackRate?: number;
    soundEnabled?: boolean;
    sprite?: string;
    id?: string;
  };

  type StopOptions = {
    id?: string;
  };

  type LoadOptions = {
    volume?: number;
    loop?: boolean;
    preload?: boolean;
  };

  type Result = [
    () => void,
    {
      sound: Howl;
      play: (options?: PlayOptions) => void;
      stop: (options?: StopOptions) => void;
      pause: () => void;
      isPlaying: boolean;
      duration: number;
      seek: (position: number) => void;
      volume: number;
      playbackRate: number;
    }
  ];

  export default function useSound(
    src: string | string[],
    options?: LoadOptions
  ): Result;
}
