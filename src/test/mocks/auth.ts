import { vi } from "vitest";

export interface MockUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: string;
}

export interface MockSession {
  user: MockUser;
  expires: string;
}

export const createMockSession = (overrides?: Partial<MockSession>): MockSession => ({
  user: {
    id: "test-user-id",
    email: "test@example.com",
    name: "Test User",
    image: null,
    role: "VISITOR",
    ...overrides?.user,
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  ...overrides,
});

export const createAdminSession = (): MockSession =>
  createMockSession({
    user: {
      id: "admin-user-id",
      email: "admin@example.com",
      name: "Admin User",
      image: null,
      role: "ADMIN",
    },
  });

export const mockAuth = vi.fn();
