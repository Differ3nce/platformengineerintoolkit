import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";
import { mockAuth, createMockSession } from "@/test/mocks/auth";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/auth", () => ({ auth: mockAuth }));

const { POST } = await import("./route");

describe("POST /api/submissions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a submission when authenticated with required fields", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    const created = {
      id: "sub-1",
      title: "My Tool",
      description: "A helpful tool",
      type: "Tool",
      body: null,
      externalUrl: null,
      submittedById: "test-user-id",
    };
    mockPrisma.submission.create.mockResolvedValue(created);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ title: "My Tool", description: "A helpful tool", type: "Tool" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual(created);
    expect(mockPrisma.submission.create).toHaveBeenCalledWith({
      data: {
        title: "My Tool",
        description: "A helpful tool",
        body: null,
        type: "Tool",
        externalUrl: null,
        submittedById: "test-user-id",
      },
    });
  });

  it("stores optional body and externalUrl when provided", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.submission.create.mockResolvedValue({ id: "sub-2" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "My Article",
        description: "Desc",
        type: "Article",
        body: "## Content",
        externalUrl: "https://example.com",
      }),
    });
    await POST(req);

    expect(mockPrisma.submission.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        body: "## Content",
        externalUrl: "https://example.com",
      }),
    });
  });

  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ title: "T", description: "D", type: "Tool" }),
    });
    const res = await POST(req);

    expect(res.status).toBe(401);
    expect(mockPrisma.submission.create).not.toHaveBeenCalled();
  });

  it("returns 400 when title is missing", async () => {
    mockAuth.mockResolvedValue(createMockSession());

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ description: "D", type: "Tool" }),
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(mockPrisma.submission.create).not.toHaveBeenCalled();
  });

  it("returns 400 when type is missing", async () => {
    mockAuth.mockResolvedValue(createMockSession());

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ title: "T", description: "D" }),
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});
