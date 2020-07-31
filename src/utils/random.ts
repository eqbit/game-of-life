export const getRandomChance = (percent: number = 50) => {
  if (percent <= 0) {
    percent = 0;
  }

  if (percent > 100) {
    percent = 100;
  }

  return Math.random() * 100 < percent;
};

export const getRandomLives = () => {
  const random = Math.random();

  if (random < 0.2) {
    return 3;
  }

  if (random >= 0.2 && random < 0.4) {
    return 2;
  }

  if (random >= 0.4 && random < 0.75) {
    return 1;
  }

  return 0;
};
