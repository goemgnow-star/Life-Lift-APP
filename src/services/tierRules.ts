export const calculateTier = (
  mental: number, 
  physical: number, 
  spiritual: number, 
  financial: number
): number => {
  const scores = [mental, physical, spiritual, financial];
  const lowestScore = Math.min(...scores);

  if (lowestScore <= 2) return 1;
  if (lowestScore <= 4) return 2;
  if (lowestScore <= 6) return 3;
  return 4;
};
