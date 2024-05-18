// src/utils/shuffle.js
export const shuffleArray = (array) => {
  const arr = [...array]; // Copy the array to avoid modifying the original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
