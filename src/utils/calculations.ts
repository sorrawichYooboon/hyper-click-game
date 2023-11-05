export const randomPositionOrNegativeNumber = () => {
  return Math.random() > 0.5 ? 1 : -1;
};

export const randomColor = () => {
  const colors = ["#D436C5", "#307ADF", "#08C4EC", "#03D7AE", "#F26546"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const randomNumber = () => {
  return Math.floor(Math.random() * 10);
};

export const randomNumberRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomNumberRangeFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
