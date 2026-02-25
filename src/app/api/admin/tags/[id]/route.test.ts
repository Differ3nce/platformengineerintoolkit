import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/utils", () => ({
  slugify: (text: string) => text.toLowerCase().replace(/\s+/g, "-"),
}));

const { PUT, DELETE } = await import("./route");

const makeParams = (id: string) => ({ params: Promise.resolve({ id }) });

describe("PUT /api/admin/tags/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates a tag", async () => {
    const updated = { id: "tag-1", name: "Docker", slug: "docker" };
    mockPrisma.tag.update.mockResolvedValue(updated);

    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ name: "Docker" }),
    });
    const res = await PUT(req, makeParams("tag-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(updated);
    expect(mockPrisma.tag.update).toHaveBeenCalledWith({
      where: { id: "tag-1" },
      data: { name: "Docker", slug: "docker" },
    });
  });
});

describe("DELETE /api/admin/tags/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes a tag and returns success", async () => {
    mockPrisma.tag.delete.mockResolvedValue({ id: "tag-1" });

    const req = new Request("http://localhost", { method: "DELETE" });
    const res = await DELETE(req, makeParams("tag-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockPrisma.tag.delete).toHaveBeenCalledWith({ where: { id: "tag-1" } });
  });
});
