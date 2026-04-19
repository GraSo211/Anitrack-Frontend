import { render, screen } from '@testing-library/react';
import Header from '@/components/general-components/Header/Header';

// Mock zustand
jest.mock('@/stores/sidebar', () => ({
  useSidebarStore: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock Search component
jest.mock('@/components/general-components/Header/Search', () => {
  return function MockSearch() {
    return <div data-testid="search">Search</div>;
  };
});

// Mock IoMenu icon
jest.mock('react-icons/io5', () => ({
  IoMenu: () => <div data-testid="menu-icon">Menu</div>,
}));

import { useSidebarStore } from '@/stores/sidebar';

describe('Header Component', () => {
  beforeEach(() => {
    (useSidebarStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ toggle: jest.fn() })
    );
  });

  it('should render logo', () => {
    render(<Header isAuthenticated={false} />);

    expect(screen.getByText('ANITRACK')).toBeInTheDocument();
  });

  it('should render login link when not authenticated', () => {
    render(<Header isAuthenticated={false} />);

    expect(screen.getByText('Iniciar Sesion')).toBeInTheDocument();
  });

  it('should render profile link when authenticated', () => {
    render(<Header isAuthenticated={true} />);

    expect(screen.getByText('Perfil')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Header isAuthenticated={false} />);

    expect(screen.getByText('Animes')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
  });

  it('should render search on large screens', () => {
    render(<Header isAuthenticated={false} />);

    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('should have correct link hrefs', () => {
    render(<Header isAuthenticated={false} />);

    expect(screen.getByText('ANITRACK').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Animes').closest('a')).toHaveAttribute('href', '/animes');
    expect(screen.getByText('Usuarios').closest('a')).toHaveAttribute('href', '/usuarios');
  });
});
