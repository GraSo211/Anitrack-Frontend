import { useSidebarStore } from '@/stores/sidebar';

describe('Sidebar Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { isOpen, toggle } = useSidebarStore.getState();
    if (isOpen) {
      toggle();
    }
  });

  it('should have initial state with isOpen as false', () => {
    const state = useSidebarStore.getState();
    expect(state.isOpen).toBe(false);
  });

  it('should toggle isOpen to true', () => {
    const { toggle } = useSidebarStore.getState();
    toggle();
    expect(useSidebarStore.getState().isOpen).toBe(true);
  });

  it('should toggle isOpen back to false', () => {
    const { toggle } = useSidebarStore.getState();
    toggle();
    toggle();
    expect(useSidebarStore.getState().isOpen).toBe(false);
  });

  it('should maintain independent state', () => {
    const { toggle } = useSidebarStore.getState();

    // Toggle multiple times
    toggle();
    toggle();
    toggle();

    expect(useSidebarStore.getState().isOpen).toBe(true);
  });
});
