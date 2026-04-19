import '@testing-library/jest-dom';

// Mock de Next.js
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    has: jest.fn(),
    getAll: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    toString: jest.fn(),
    forEach: jest.fn(),
  }),
  usePathname: () => '',
}));

// Mock de next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
  headers: jest.fn(() => ({
    get: jest.fn(),
    has: jest.fn(),
    entries: jest.fn(),
    keys: jest.fn(),
    values: jest.fn(),
    forEach: jest.fn(),
  })),
}));

// Mock de environment variables
process.env.BACKEND_URL = 'http://localhost:8080';
process.env.NEXT_PUBLIC_BACKEND_URL = 'http://localhost:8080';

// Suprimir warnings de console en tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
