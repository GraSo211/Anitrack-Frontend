"use server";
//todo api:
export const postTranslateText = async (textToTranslate:string) => {
    const res = await fetch("https://es.libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q:{textToTranslate},
            source: "auto",
            target: "es",
            format: "text",
            alternatives: 3,
        
        }),
        headers: { "Content-Type": "application/json" },
    });
    const data= await res.json();
    console.log(data)
    return data;
};
