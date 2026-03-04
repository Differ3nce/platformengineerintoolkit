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
      description: "",
      body: null,
      externalLinks: [],
      submittedById: "test-user-id",
    };
    mockPrisma.submission.create.mockResolvedValue(created);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ title: "My Tool" }),
    });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toEqual(created);
    expect(mockPrisma.submission.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: "My Tool",
        body: null,
        externalLinks: [],
      }),
    });
  });

  it("stores optional body when provided", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.submission.create.mockResolvedValue({ id: "sub-2" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ title: "My Article", body: "## Content" }),
    });
    await POST(req);

    expect(mockPrisma.submission.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ body: "## Content" }),
    });
  });

  it("stores externalLinks when provided", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.submission.create.mockResolvedValue({ id: "sub-3" });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "My Article",
        externalLinks: [{ url: "https://example.com" }],
      }),
    });
    await POST(req);

    expect(mockPrisma.submission.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        externalLinks: [{ url: "https://example.com" }],
      }),
    });
  });

  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ title: "T" }),
    });
    const res = await POST(req);

    expect(res.status).toBe(401);
    expect(mockPrisma.submission.create).not.toHaveBeenCalled();
  });

  it("returns 400 when title is missing", async () => {
    mockAuth.mockResolvedValue(createMockSession());

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ body: "Some content" }),
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(mockPrisma.submission.create).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid URL in external links", async () => {
    mockAuth.mockResolvedValue(createMockSession());

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({
        title: "T",
        externalLinks: [{ url: "javascript:alert(1)" }],
      }),
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
  });
});
