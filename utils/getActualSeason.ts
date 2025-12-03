export const getActualSeason = () => {
  const today = new Date();
  const y = today.getFullYear();

  const springStart = new Date(y, 2, 20);
  const summerStart = new Date(y, 5, 21);
  const fallStart   = new Date(y, 8, 23);
  const winterStart = new Date(y, 11, 21);

  if (today >= winterStart) return "WINTER";
  if (today >= fallStart)   return "FALL";
  if (today >= summerStart) return "SUMMER";
  if (today >= springStart) return "SPRING";
  return "WINTER";
};
