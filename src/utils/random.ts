export const getRandomChance = (percent: number = 50) => {
  if (percent <= 0) {
    percent = 1;
  }

  if (percent > 100) {
    percent = 99;
  }

  return Math.random() * 100 > percent;
};
