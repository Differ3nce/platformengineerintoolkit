import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

const { GET } = await import("./route");

describe("GET /api/admin/tags/list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns tags ordered by name", async () => {
    const tags = [
      { id: "tag-1", name: "Docker", slug: "docker", _count: { resources: 5 } },
      { id: "tag-2", name: "Kubernetes", slug: "kubernetes", _count: { resources: 8 } },
    ];
    mockPrisma.tag.findMany.mockResolvedValue(tags);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(tags);
    expect(mockPrisma.tag.findMany).toHaveBeenCalledWith({
      orderBy: { name: "asc" },
      include: { _count: { select: { resources: true } } },
    });
  });
});
