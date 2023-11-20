export const debounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<T>): void => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      callback(...args);
      timerId = null;
    }, delay);
  };
};
