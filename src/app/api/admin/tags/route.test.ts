import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/utils", () => ({
  slugify: (text: string) => text.toLowerCase().replace(/\s+/g, "-"),
}));

const { POST } = await import("./route");

describe("POST /api/admin/tags", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a tag and auto-generates slug", async () => {
    const created = { id: "tag-1", name: "Kubernetes", slug: "kubernetes" };
    mockPrisma.tag.create.mockResolvedValue(created);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ name: "Kubernetes" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual(created);
    expect(mockPrisma.tag.create).toHaveBeenCalledWith({
      data: { name: "Kubernetes", slug: "kubernetes" },
    });
  });
});
