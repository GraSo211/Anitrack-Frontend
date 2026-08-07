import { render, screen } from '@testing-library/react';
import HeroCarousel from '@/components/general-components/HeroCarousel';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: { src: string; alt: string }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={props.src} alt={props.alt} />;
    },
}));

jest.mock('swiper/react', () => ({
    Swiper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SwiperSlide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('swiper/modules', () => ({
    Autoplay: {},
    EffectFade: {},
    Pagination: {},
}));

jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/autoplay', () => ({}));
jest.mock('swiper/css/effect-fade', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));

describe('HeroCarousel Component', () => {
    beforeAll(() => {
        global.ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    });

    it('should render title and action links', () => {
        render(<HeroCarousel images={['https://res.cloudinary.com/test/hero-1.jpg']} />);

        expect(screen.getByText('ANITRACK')).toBeInTheDocument();
        expect(screen.getByText('Comenzar a Trackear')).toBeInTheDocument();
        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    it('should render the images provided', () => {
        const images = [
            'https://res.cloudinary.com/test/hero-1.jpg',
            'https://res.cloudinary.com/test/hero-2.jpg',
        ];
        render(<HeroCarousel images={images} />);

        expect(screen.getByAltText('Hero Image 1')).toBeInTheDocument();
        expect(screen.getByAltText('Hero Image 2')).toBeInTheDocument();
    });

    it('should render placeholder when no images', () => {
        const { container } = render(<HeroCarousel images={[]} />);

        expect(screen.getByText('ANITRACK')).toBeInTheDocument();
        expect(container.querySelector('.bg-linear-to-b')).toBeInTheDocument();
    });
});
