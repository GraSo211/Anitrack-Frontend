export const getActualSeason=()=>{
  const month = new Date().getMonth()+1;
  if(month>=3&&month<=5)return "SPRING";
  if(month>=6&&month<=8)return "SUMMER";
  if(month>=9&&month<=11)return "FALL";
  return "WINTER";
}
