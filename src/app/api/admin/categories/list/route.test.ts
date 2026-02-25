import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

const { GET } = await import("./route");

describe("GET /api/admin/categories/list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns categories ordered by displayOrder", async () => {
    const categories = [
      { id: "cat-1", name: "Alpha", displayOrder: 1, _count: { resources: 3 } },
      { id: "cat-2", name: "Beta", displayOrder: 2, _count: { resources: 0 } },
    ];
    mockPrisma.category.findMany.mockResolvedValue(categories);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(categories);
    expect(mockPrisma.category.findMany).toHaveBeenCalledWith({
      orderBy: { displayOrder: "asc" },
      include: { _count: { select: { resources: true } } },
    });
  });

  it("returns empty array when no categories exist", async () => {
    mockPrisma.category.findMany.mockResolvedValue([]);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual([]);
  });
});
