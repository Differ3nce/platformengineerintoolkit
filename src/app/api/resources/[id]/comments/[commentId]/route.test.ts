import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";
import { mockAuth, createMockSession, createAdminSession } from "@/test/mocks/auth";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/auth", () => ({ auth: mockAuth }));

const { DELETE } = await import("./route");

const makeContext = (id: string, commentId: string) => ({
  params: Promise.resolve({ id, commentId }),
});

describe("DELETE /api/resources/[id]/comments/[commentId]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows comment owner to delete their comment", async () => {
    const session = createMockSession();
    mockAuth.mockResolvedValue(session);
    mockPrisma.comment.findUnique.mockResolvedValue({
      id: "c-1",
      userId: "test-user-id",
      body: "test",
    });
    mockPrisma.comment.delete.mockResolvedValue({ id: "c-1" });

    const res = await DELETE(
      new Request("http://localhost", { method: "DELETE" }),
      makeContext("res-1", "c-1")
    );
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockPrisma.comment.delete).toHaveBeenCalledWith({ where: { id: "c-1" } });
  });

  it("allows admin to delete any comment", async () => {
    mockAuth.mockResolvedValue(createAdminSession());
    mockPrisma.comment.findUnique.mockResolvedValue({
      id: "c-1",
      userId: "other-user-id",
      body: "test",
    });
    mockPrisma.comment.delete.mockResolvedValue({ id: "c-1" });

    const res = await DELETE(
      new Request("http://localhost", { method: "DELETE" }),
      makeContext("res-1", "c-1")
    );

    expect(res.status).toBe(200);
    expect(mockPrisma.comment.delete).toHaveBeenCalled();
  });

  it("returns 403 when user is not owner and not admin", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.comment.findUnique.mockResolvedValue({
      id: "c-1",
      userId: "other-user-id",
      body: "test",
    });

    const res = await DELETE(
      new Request("http://localhost", { method: "DELETE" }),
      makeContext("res-1", "c-1")
    );
    const data = await res.json();

    expect(res.status).toBe(403);
    expect(data).toEqual({ error: "Forbidden" });
    expect(mockPrisma.comment.delete).not.toHaveBeenCalled();
  });

  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const res = await DELETE(
      new Request("http://localhost", { method: "DELETE" }),
      makeContext("res-1", "c-1")
    );

    expect(res.status).toBe(401);
    expect(mockPrisma.comment.delete).not.toHaveBeenCalled();
  });

  it("returns 404 when comment does not exist", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.comment.findUnique.mockResolvedValue(null);

    const res = await DELETE(
      new Request("http://localhost", { method: "DELETE" }),
      makeContext("res-1", "no-such-comment")
    );
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data).toEqual({ error: "Comment not found" });
  });
});
