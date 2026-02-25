import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/utils", () => ({
  slugify: (text: string) => text.toLowerCase().replace(/\s+/g, "-"),
}));

const { PUT, DELETE } = await import("./route");

const makeParams = (id: string) => ({ params: Promise.resolve({ id }) });

describe("PUT /api/admin/categories/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates a category", async () => {
    const updated = { id: "cat-1", name: "New Name", slug: "new-name" };
    mockPrisma.category.update.mockResolvedValue(updated);

    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ name: "New Name" }),
    });
    const res = await PUT(req, makeParams("cat-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(updated);
    expect(mockPrisma.category.update).toHaveBeenCalledWith({
      where: { id: "cat-1" },
      data: { name: "New Name", slug: "new-name", description: null, displayOrder: 0 },
    });
  });
});

describe("DELETE /api/admin/categories/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes a category with no resources", async () => {
    mockPrisma.resource.count.mockResolvedValue(0);
    mockPrisma.category.delete.mockResolvedValue({ id: "cat-1" });

    const req = new Request("http://localhost", { method: "DELETE" });
    const res = await DELETE(req, makeParams("cat-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockPrisma.category.delete).toHaveBeenCalledWith({ where: { id: "cat-1" } });
  });

  it("returns 400 when category has resources", async () => {
    mockPrisma.resource.count.mockResolvedValue(3);

    const req = new Request("http://localhost", { method: "DELETE" });
    const res = await DELETE(req, makeParams("cat-1"));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toMatch(/3/);
    expect(mockPrisma.category.delete).not.toHaveBeenCalled();
  });
});
