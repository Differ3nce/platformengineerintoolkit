import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

const { GET } = await import("./route");

describe("GET /api/admin/submissions/list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all submissions with submitter and reviewer info", async () => {
    const submissions = [
      {
        id: "sub-1",
        title: "Cool Tool",
        status: "PENDING",
        submittedBy: { name: "Alice", email: "alice@example.com" },
        reviewedBy: null,
      },
    ];
    mockPrisma.submission.findMany.mockResolvedValue(submissions);

    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(submissions);
    expect(mockPrisma.submission.findMany).toHaveBeenCalledWith({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      include: {
        submittedBy: { select: { name: true, email: true } },
        reviewedBy: { select: { name: true } },
      },
    });
  });
});
