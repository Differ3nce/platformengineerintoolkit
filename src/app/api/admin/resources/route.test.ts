import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/utils", () => ({
  slugify: (text: string) => text.toLowerCase().replace(/\s+/g, "-"),
}));

const { POST } = await import("./route");

describe("POST /api/admin/resources", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a resource with required fields", async () => {
    const created = {
      id: "res-1",
      title: "My Resource",
      slug: "my-resource",
      description: "A desc",
      body: "",
      status: "DRAFT",
      category: { id: "cat-1", name: "Tools" },
      tags: [],
      authors: [],
    };
    mockPrisma.resource.create.mockResolvedValue(created);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "My Resource",
        description: "A desc",
        categoryId: "cat-1",
      }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual(created);
    expect(mockPrisma.resource.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          title: "My Resource",
          slug: "my-resource",
          categoryId: "cat-1",
          status: "DRAFT",
        }),
      })
    );
  });

  it("defaults status to DRAFT when not provided", async () => {
    mockPrisma.resource.create.mockResolvedValue({ id: "res-1" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ title: "T", description: "D", categoryId: "c1" }),
    });
    await POST(req);

    expect(mockPrisma.resource.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: "DRAFT" }),
      })
    );
  });

  it("uses provided status when given", async () => {
    mockPrisma.resource.create.mockResolvedValue({ id: "res-1" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "T",
        description: "D",
        categoryId: "c1",
        status: "PUBLISHED",
      }),
    });
    await POST(req);

    expect(mockPrisma.resource.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: "PUBLISHED" }),
      })
    );
  });

  it("connects tags when tagIds are provided", async () => {
    mockPrisma.resource.create.mockResolvedValue({ id: "res-1" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "T",
        description: "D",
        categoryId: "c1",
        tagIds: ["tag-1", "tag-2"],
      }),
    });
    await POST(req);

    expect(mockPrisma.resource.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          tags: { connect: [{ id: "tag-1" }, { id: "tag-2" }] },
        }),
      })
    );
  });
});
