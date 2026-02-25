import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

const { DELETE } = await import("./route");

const makeParams = (id: string) => ({ params: Promise.resolve({ id }) });

describe("DELETE /api/admin/comments/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes any comment and returns success", async () => {
    mockPrisma.comment.delete.mockResolvedValue({ id: "c-1" });

    const req = new Request("http://localhost", { method: "DELETE" });
    const res = await DELETE(req, makeParams("c-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockPrisma.comment.delete).toHaveBeenCalledWith({ where: { id: "c-1" } });
  });
});
