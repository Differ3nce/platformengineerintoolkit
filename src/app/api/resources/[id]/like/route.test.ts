import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";
import { mockAuth, createMockSession } from "@/test/mocks/auth";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/auth", () => ({ auth: mockAuth }));

const { POST } = await import("./route");

const makeContext = (id: string) => ({
  params: Promise.resolve({ id }),
});

describe("POST /api/resources/[id]/like", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a like when user has not liked the resource yet", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.resource.findUnique.mockResolvedValue({ id: "res-1" });
    mockPrisma.like.findUnique.mockResolvedValue(null);
    mockPrisma.like.create.mockResolvedValue({ id: "like-1" });
    mockPrisma.like.count.mockResolvedValue(5);

    const res = await POST(
      new Request("http://localhost", { method: "POST" }),
      makeContext("res-1")
    );
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ liked: true, count: 5 });
    expect(mockPrisma.like.create).toHaveBeenCalledWith({
      data: { userId: "test-user-id", resourceId: "res-1" },
    });
  });

  it("removes a like when user has already liked the resource", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.resource.findUnique.mockResolvedValue({ id: "res-1" });
    mockPrisma.like.findUnique.mockResolvedValue({ id: "like-1" });
    mockPrisma.like.delete.mockResolvedValue({ id: "like-1" });
    mockPrisma.like.count.mockResolvedValue(3);

    const res = await POST(
      new Request("http://localhost", { method: "POST" }),
      makeContext("res-1")
    );
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ liked: false, count: 3 });
    expect(mockPrisma.like.delete).toHaveBeenCalledWith({
      where: { id: "like-1" },
    });
  });

  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const res = await POST(
      new Request("http://localhost", { method: "POST" }),
      makeContext("res-1")
    );
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data).toEqual({ error: "Unauthorized" });
    expect(mockPrisma.like.create).not.toHaveBeenCalled();
  });

  it("returns 404 when resource does not exist", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.resource.findUnique.mockResolvedValue(null);

    const res = await POST(
      new Request("http://localhost", { method: "POST" }),
      makeContext("non-existent")
    );
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data).toEqual({ error: "Resource not found" });
    expect(mockPrisma.like.create).not.toHaveBeenCalled();
  });

  it("checks like using composite key for the current user and resource", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.resource.findUnique.mockResolvedValue({ id: "res-1" });
    mockPrisma.like.findUnique.mockResolvedValue(null);
    mockPrisma.like.create.mockResolvedValue({ id: "like-new" });
    mockPrisma.like.count.mockResolvedValue(1);

    await POST(
      new Request("http://localhost", { method: "POST" }),
      makeContext("res-1")
    );

    expect(mockPrisma.like.findUnique).toHaveBeenCalledWith({
      where: {
        userId_resourceId: { userId: "test-user-id", resourceId: "res-1" },
      },
    });
  });
});
