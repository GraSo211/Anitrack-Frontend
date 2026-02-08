// components/anime-detailed/right-section/RightSection.server.tsx
import RightSectionClient from "./RightSection.client";
import { getEpisodesOfAnime } from "@/actions/getEpisodesOfAnime";
import { EpisodePage } from "@/types/EpisodePage";

interface Props {
  malId: number;
  titleRomaji?: string;
  titleEnglish?: string;
  synonyms: string[];
  averageScore?: number;
  popularity?: number;
  status?: string;
  genres: string[];
  description?: string;
  trailer?: {
    id?: number;
    site?: string;
    thumbnail?: string;
  };
}

export default async function RightSection(props: Props) {
  const episodePage: EpisodePage = await getEpisodesOfAnime(props.malId);

  return (
    <RightSectionClient
      {...props}
      episodePage={episodePage}
    />
  );
}
