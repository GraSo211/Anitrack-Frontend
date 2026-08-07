import { getHeroImages } from "@/actions/admin/getHeroImages";
import { getBannerImageFromAnimeOfSeason } from "@/actions/animes/getBannerImageFromAnimeOfSeason";
import HeroCarousel from "@/components/general-components/HeroCarousel";

export default async function HeroSection() {
    const heroImages = await getHeroImages();
    const images = heroImages?.map((heroImage) => heroImage.secureUrl) ?? [];

    if (images.length === 0) {
        const bannerImage = await getBannerImageFromAnimeOfSeason();
        if (bannerImage) {
            images.push(bannerImage);
        }
    }

    return (
        <HeroCarousel images={images} />
    );
}
