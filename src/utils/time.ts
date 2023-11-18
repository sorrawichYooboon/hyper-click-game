export const debounce = (callback: any, delay: number) => {
  let timerId: any;

  return (...args: any) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      callback(...args);
      timerId = null;
    }, delay);
  };
};
