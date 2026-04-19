import { render, screen } from '@testing-library/react';
import Sidebar from '@/components/general-components/Sidebar';

// Mock the zustand store
jest.mock('@/stores/sidebar', () => ({
  useSidebarStore: jest.fn(),
}));

import { useSidebarStore } from '@/stores/sidebar';

describe('Sidebar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    (useSidebarStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ isOpen: false, toggle: jest.fn() })
    );

    const { container } = render(<Sidebar />);
    expect(container.firstChild).toBeNull();
  });

  it('should render when isOpen is true', () => {
    (useSidebarStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ isOpen: true, toggle: jest.fn() })
    );

    render(<Sidebar />);

    expect(screen.getByText('Iniciar Sesion')).toBeInTheDocument();
    expect(screen.getByText('Animes')).toBeInTheDocument();
  });

  it('should render search input', () => {
    (useSidebarStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ isOpen: true, toggle: jest.fn() })
    );

    render(<Sidebar />);

    const searchInput = screen.getByPlaceholderText('Buscar...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should have correct navigation links', () => {
    (useSidebarStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ isOpen: true, toggle: jest.fn() })
    );

    render(<Sidebar />);

    const loginLink = screen.getByText('Iniciar Sesion');
    const animesLink = screen.getByText('Animes');

    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
    expect(animesLink.closest('a')).toHaveAttribute('href', '/animes');
  });
});
