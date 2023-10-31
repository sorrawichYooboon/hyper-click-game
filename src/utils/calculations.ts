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
