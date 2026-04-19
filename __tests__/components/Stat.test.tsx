import { render, screen } from '@testing-library/react';
import Stat from '@/components/user/Stat';

describe('Stat Component', () => {
  it('should render label and value', () => {
    render(<Stat label="Completados" value={42} />);

    expect(screen.getByText('Completados')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should render with zero value', () => {
    render(<Stat label="Viendo" value={0} />);

    expect(screen.getByText('Viendo')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should render with large numbers', () => {
    render(<Stat label="Episodios" value={9999} />);

    expect(screen.getByText('9999')).toBeInTheDocument();
  });

  it('should apply clickable styles when clickable prop is true', () => {
    const { container } = render(<Stat label="Test" value={10} clickable />);

    // Check if the element has hover styles applied
    expect(container.firstChild).toHaveClass('hover:bg-white/10');
    expect(container.firstChild).toHaveClass('cursor-pointer');
  });

  it('should not have clickable styles when clickable is false', () => {
    const { container } = render(<Stat label="Test" value={10} clickable={false} />);

    expect(container.firstChild).not.toHaveClass('cursor-pointer');
  });
});
