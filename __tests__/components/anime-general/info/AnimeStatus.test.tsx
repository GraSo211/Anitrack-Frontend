import { render, screen } from '@testing-library/react';
import AnimeStatus from '@/components/anime-general/info/AnimeStatus';

describe('AnimeStatus Component', () => {
  it('should render "En Emision" for RELEASING status', () => {
    render(<AnimeStatus status="RELEASING" />);

    expect(screen.getByText('En Emision')).toBeInTheDocument();
    expect(screen.getByText('En Emision')).toHaveClass('bg-blue-500/20');
  });

  it('should render "Finalizado" for FINISHED status', () => {
    render(<AnimeStatus status="FINISHED" />);

    expect(screen.getByText('Finalizado')).toBeInTheDocument();
    expect(screen.getByText('Finalizado')).toHaveClass('bg-green-500/20');
  });

  it('should render "No Emitido" for NOT_YET_RELEASED status', () => {
    render(<AnimeStatus status="NOT_YET_RELEASED" />);

    expect(screen.getByText('No Emitido')).toBeInTheDocument();
    expect(screen.getByText('No Emitido')).toHaveClass('bg-yellow-500/20');
  });

  it('should render "Cancelado" for CANCELLED status', () => {
    render(<AnimeStatus status="CANCELLED" />);

    expect(screen.getByText('Cancelado')).toBeInTheDocument();
    expect(screen.getByText('Cancelado')).toHaveClass('bg-gray-700/20');
  });

  it('should render "En Hiatus" for HIATUS status', () => {
    render(<AnimeStatus status="HIATUS" />);

    expect(screen.getByText('En Hiatus')).toBeInTheDocument();
    expect(screen.getByText('En Hiatus')).toHaveClass('bg-red-500/20');
  });

  it('should return nothing for unknown status', () => {
    const { container } = render(<AnimeStatus status="UNKNOWN" />);

    expect(container.firstChild).toBeNull();
  });

  it('should have rounded border style', () => {
    render(<AnimeStatus status="FINISHED" />);

    const element = screen.getByText('Finalizado');
    expect(element).toHaveClass('rounded-full');
    expect(element).toHaveClass('border');
  });
});
