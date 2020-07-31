export const getRandomChance = (percent: number = 50) => {
  if (percent <= 0) {
    percent = 0;
  }

  if (percent > 100) {
    percent = 100;
  }

  return Math.random() * 100 < percent;
};
