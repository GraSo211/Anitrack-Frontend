import { render, screen } from '@testing-library/react';
import Hero from '@/components/anime/Hero';

describe('Hero Component', () => {
  it('should render banner image when provided', () => {
    const bannerImage = 'https://example.com/banner.jpg';
    const title = 'Test Anime';

    render(<Hero bannerImage={bannerImage} title={title} />);

    const img = screen.getByAltText(title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', bannerImage);
  });

  it('should render fallback color when bannerImage is not provided', () => {
    const colorBg = '#ff0000';

    const { container } = render(
    <Hero bannerImage={undefined} colorBg={colorBg} />);

    // Should have a div with the background color
    const coloredDiv = container.querySelector('[style*="background-color: rgb(255, 0, 0)"]');
    expect(coloredDiv).toBeInTheDocument();
  });

  it('should render nothing when neither banner nor color provided', () => {
    const { container } = render(<Hero bannerImage={undefined} />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('should use fallback title when title is not provided', () => {
    const bannerImage = 'https://example.com/banner.jpg';

    render(<Hero bannerImage={bannerImage} />);

    const img = screen.getByAltText('Desconocido');
    expect(img).toBeInTheDocument();
  });

  it('should have overlay elements when banner image exists', () => {
    const { container } = render(
      <Hero bannerImage="https://example.com/banner.jpg" />
    );

    // Should have dark overlay
    const overlays = container.querySelectorAll('.absolute');
    expect(overlays.length).toBeGreaterThan(0);
  });
});
