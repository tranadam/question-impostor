export const generateRandomIntFromRange = (min: number, max: number, count: number) => {
  const randomInts = new Set<number>();
  while (randomInts.size < count) {
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    randomInts.add(randomInt);
  }
  return Array.from(randomInts);
};
