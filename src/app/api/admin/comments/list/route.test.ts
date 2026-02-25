import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

const { GET } = await import("./route");

describe("GET /api/admin/comments/list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all comments ordered by createdAt desc", async () => {
    const mockComments = [
      {
        id: "c-1",
        body: "Great resource!",
        createdAt: new Date("2024-02-01"),
        user: { name: "Alice", email: "alice@example.com" },
        resource: {
          title: "Platform Engineering Guide",
          slug: "platform-engineering-guide",
          category: { slug: "guides" },
        },
      },
      {
        id: "c-2",
        body: "Very helpful.",
        createdAt: new Date("2024-01-15"),
        user: { name: "Bob", email: "bob@example.com" },
        resource: {
          title: "Team Topologies",
          slug: "team-topologies",
          category: { slug: "books" },
        },
      },
    ];

    mockPrisma.comment.findMany.mockResolvedValue(mockComments);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(JSON.parse(JSON.stringify(mockComments)));
    expect(mockPrisma.comment.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        resource: {
          select: {
            title: true,
            slug: true,
            category: { select: { slug: true } },
          },
        },
      },
    });
  });

  it("returns an empty array when there are no comments", async () => {
    mockPrisma.comment.findMany.mockResolvedValue([]);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual([]);
  });
});
