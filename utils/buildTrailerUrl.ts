export default function buildTrailerUrl(trailer:{id?:number, site?:string, thumbnail?:string}) {
  if (!trailer) return null;

  switch (trailer.site) {
    case "youtube":
      return `https://www.youtube.com/watch?v=${trailer.id}`;
    case "dailymotion":
      return `https://www.dailymotion.com/video/${trailer.id}`;
    default:
      return null;
  }
}
