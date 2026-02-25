import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockPrisma } from "@/test/mocks/prisma";
import { mockAuth, createMockSession } from "@/test/mocks/auth";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/auth", () => ({ auth: mockAuth }));
vi.mock("@/lib/utils", () => ({
  slugify: (text: string) => text.toLowerCase().replace(/\s+/g, "-"),
}));

const { PUT } = await import("./route");

const makeParams = (id: string) => ({ params: Promise.resolve({ id }) });

describe("PUT /api/admin/submissions/[id]/review", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("approves a submission and creates a draft resource when categoryId provided", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    const updatedSubmission = {
      id: "sub-1",
      title: "Great Tool",
      description: "A great tool",
      body: null,
      externalUrl: null,
      status: "APPROVED",
    };
    mockPrisma.submission.update.mockResolvedValue(updatedSubmission);
    mockPrisma.resource.create.mockResolvedValue({ id: "res-new" });

    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ action: "approve", categoryId: "cat-1" }),
    });
    const res = await PUT(req, makeParams("sub-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(updatedSubmission);
    expect(mockPrisma.submission.update).toHaveBeenCalledWith({
      where: { id: "sub-1" },
      data: expect.objectContaining({ status: "APPROVED" }),
    });
    expect(mockPrisma.resource.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          title: "Great Tool",
          slug: "great-tool",
          status: "DRAFT",
          categoryId: "cat-1",
        }),
      })
    );
  });

  it("approves a submission but does not create resource when no categoryId", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    mockPrisma.submission.update.mockResolvedValue({ id: "sub-1", status: "APPROVED" });

    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ action: "approve" }),
    });
    await PUT(req, makeParams("sub-1"));

    expect(mockPrisma.resource.create).not.toHaveBeenCalled();
  });

  it("rejects a submission", async () => {
    mockAuth.mockResolvedValue(createMockSession());
    const updated = { id: "sub-1", status: "REJECTED", reviewNote: "Not relevant" };
    mockPrisma.submission.update.mockResolvedValue(updated);

    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ action: "reject", reviewNote: "Not relevant" }),
    });
    const res = await PUT(req, makeParams("sub-1"));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(updated);
    expect(mockPrisma.submission.update).toHaveBeenCalledWith({
      where: { id: "sub-1" },
      data: expect.objectContaining({ status: "REJECTED", reviewNote: "Not relevant" }),
    });
    expect(mockPrisma.resource.create).not.toHaveBeenCalled();
  });

  it("returns 400 for an invalid action", async () => {
    mockAuth.mockResolvedValue(createMockSession());

    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ action: "publish" }),
    });
    const res = await PUT(req, makeParams("sub-1"));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data).toEqual({ error: "Invalid action" });
  });
});
