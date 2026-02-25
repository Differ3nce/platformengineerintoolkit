import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/utils", () => ({
  slugify: (text: string) => text.toLowerCase().replace(/\s+/g, "-"),
}));

const { POST } = await import("./route");

describe("POST /api/admin/categories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a category and auto-generates slug from name", async () => {
    const created = {
      id: "cat-1",
      name: "Platform Tools",
      slug: "platform-tools",
      description: null,
      displayOrder: 0,
    };
    mockPrisma.category.create.mockResolvedValue(created);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "Platform Tools" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual(created);
    expect(mockPrisma.category.create).toHaveBeenCalledWith({
      data: {
        name: "Platform Tools",
        slug: "platform-tools",
        description: null,
        displayOrder: 0,
      },
    });
  });

  it("stores description when provided", async () => {
    mockPrisma.category.create.mockResolvedValue({ id: "cat-2" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "Tools", description: "Useful tools" }),
    });
    await POST(req);

    expect(mockPrisma.category.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ description: "Useful tools" }),
    });
  });

  it("uses provided displayOrder", async () => {
    mockPrisma.category.create.mockResolvedValue({ id: "cat-3" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "Z Category", displayOrder: 5 }),
    });
    await POST(req);

    expect(mockPrisma.category.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ displayOrder: 5 }),
    });
  });
});
