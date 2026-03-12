"use server";

import { AnimesByName } from "@/types/AnimesByName";

export const getAnimesByName = async (cant:number, name: string) : Promise<AnimesByName[] | null> => {
  if (!process.env.BACKEND_URL) {
    console.error("BACKEND_URL no está definida");
    return null;
  }

  try{
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/anime/filtered?cant=${cant}&name=${name}`,
      {method: "GET"}
    )
    if(!response.ok){
      throw new Error(`Error status: ${response.status}`);
    }
    const data: AnimesByName[] = await response.json();
    return data;
    
  }catch(error){
    console.error("Fallo de fetch getAnimesByName:", error);
    return null;
  }

};
