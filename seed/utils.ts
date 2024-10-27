export function getRandomNumbers(x: number, y: number) {
  // Create an array with numbers from 0 to Y - 1
  const numbers = Array.from({ length: y }, (_, index) => index);

  // Shuffle the array using Fisher-Yates shuffle algorithm
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements
  }

  // Return the first X numbers from the shuffled array
  return numbers.slice(0, x);
}
