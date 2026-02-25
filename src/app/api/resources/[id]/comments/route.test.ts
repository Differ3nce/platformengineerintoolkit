import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";
import { mockAuth, createMockSession } from "@/test/mocks/auth";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/auth", () => ({ auth: mockAuth }));

const { GET, POST } = await import("./route");

const makeContext = (id: string) => ({
  params: Promise.resolve({ id }),
});

describe("GET /api/resources/[id]/comments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns comments for a resource", async () => {
    const mockComments = [
      {
        id: "comment-1",
        body: "Great resource!",
        createdAt: new Date().toISOString(),
        user: { id: "user-1", name: "Alice", image: null },
      },
    ];
    mockPrisma.comment.findMany.mockResolvedValue(mockComments);

    const res = await GET(new Request("http://localhost"), makeContext("res-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(mockComments);
    expect(mockPrisma.comment.findMany).toHaveBeenCalledWith({
      where: { resourceId: "res-1" },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, name: true, image: true } } },
    });
  });

  it("returns empty array when no comments", async () => {
    mockPrisma.comment.findMany.mockResolvedValue([]);

    const res = await GET(new Request("http://localhost"), makeContext("res-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual([]);
  });
});

describe("POST /api/resources/[id]/comments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a comment when authenticated and resource exists", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.resource.findUnique.mockResolvedValue({ id: "res-1" });
    const created = {
      id: "c-new",
      body: "Nice article",
      createdAt: new Date().toISOString(),
      user: { id: "test-user-id", name: "Test User", image: null },
    };
    mockPrisma.comment.create.mockResolvedValue(created);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ body: "Nice article" }),
    });
    const res = await POST(req, makeContext("res-1"));
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual(created);
    expect(mockPrisma.comment.create).toHaveBeenCalledWith({
      data: { body: "Nice article", userId: "test-user-id", resourceId: "res-1" },
      include: { user: { select: { id: true, name: true, image: true } } },
    });
  });

  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ body: "Hello" }),
    });
    const res = await POST(req, makeContext("res-1"));
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data).toEqual({ error: "Unauthorized" });
    expect(mockPrisma.comment.create).not.toHaveBeenCalled();
  });

  it("returns 400 when body is missing", async () => {
    mockAuth.mockResolvedValue(createMockSession());

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ body: "" }),
    });
    const res = await POST(req, makeContext("res-1"));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data).toHaveProperty("error");
    expect(mockPrisma.comment.create).not.toHaveBeenCalled();
  });

  it("returns 400 when body is whitespace only", async () => {
    mockAuth.mockResolvedValue(createMockSession());

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ body: "   " }),
    });
    const res = await POST(req, makeContext("res-1"));

    expect(res.status).toBe(400);
  });

  it("returns 404 when resource does not exist", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.resource.findUnique.mockResolvedValue(null);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ body: "A comment" }),
    });
    const res = await POST(req, makeContext("non-existent"));
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data).toEqual({ error: "Resource not found" });
  });
});
