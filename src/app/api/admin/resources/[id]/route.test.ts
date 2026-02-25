import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/utils", () => ({
  slugify: (text: string) => text.toLowerCase().replace(/\s+/g, "-"),
}));

const { PUT, DELETE } = await import("./route");

const makeParams = (id: string) => ({ params: Promise.resolve({ id }) });

describe("PUT /api/admin/resources/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates a resource and returns it", async () => {
    const updated = {
      id: "res-1",
      title: "Updated Title",
      slug: "updated-title",
      category: {},
      tags: [],
      authors: [],
    };
    mockPrisma.resource.update.mockResolvedValue(updated);

    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ title: "Updated Title", description: "D", categoryId: "c1" }),
    });
    const res = await PUT(req, makeParams("res-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(updated);
    expect(mockPrisma.resource.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "res-1" },
        data: expect.objectContaining({ title: "Updated Title", slug: "updated-title" }),
      })
    );
  });

  it("resets tags and authors to the provided sets", async () => {
    mockPrisma.resource.update.mockResolvedValue({ id: "res-1" });

    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({
        title: "T",
        description: "D",
        categoryId: "c1",
        tagIds: ["tag-1"],
        authorIds: ["author-1"],
      }),
    });
    await PUT(req, makeParams("res-1"));

    expect(mockPrisma.resource.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          tags: { set: [{ id: "tag-1" }] },
          authors: { set: [{ id: "author-1" }] },
        }),
      })
    );
  });
});

describe("DELETE /api/admin/resources/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes a resource and returns success", async () => {
    mockPrisma.resource.delete.mockResolvedValue({ id: "res-1" });

    const req = new Request("http://localhost", { method: "DELETE" });
    const res = await DELETE(req, makeParams("res-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockPrisma.resource.delete).toHaveBeenCalledWith({ where: { id: "res-1" } });
  });
});
