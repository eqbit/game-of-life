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

  if (random < 0.3) {
    return 0;
  }

  if (random >= 0.3 && random < 0.6) {
    return 1;
  }

  if (random >= 0.6 && random < 0.85) {
    return 2;
  }

  return 3;
};
