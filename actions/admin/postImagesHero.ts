"use server";



export const postImagesHero = async (images: File[]) => {
    if (!process.env.BACKEND_URL) {
        console.error("BACKEND_URL no está definida");
        return null;
    }
    const formData = new FormData();
    images.forEach((image) => {
        formData.append("images", image);
    });
    
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/hero-images`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const data:string[] = await response.json();
        console.log("Respuesta del servidor:", data);
        return data;
    } catch (error) {
        console.error("Fallo de fetch postImagesHero:", error);
        return null;
    }
};
