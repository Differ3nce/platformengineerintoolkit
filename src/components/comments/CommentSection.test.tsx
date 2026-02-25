import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@/test/helpers/render";
import userEvent from "@testing-library/user-event";
import CommentSection from "./CommentSection";

const mockComment = {
  id: "c-1",
  body: "This is a great resource!",
  createdAt: new Date("2024-03-15").toISOString(),
  user: { id: "user-1", name: "Alice", image: null },
};

describe("CommentSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("shows a loading state initially", () => {
    vi.mocked(global.fetch).mockReturnValueOnce(new Promise(() => {}));

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-1"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    expect(screen.getByText("Loading comments...")).toBeInTheDocument();
  });

  it("fetches and displays comments on mount", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockComment],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-2"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("This is a great resource!")).toBeInTheDocument();
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });
  });

  it("fetches comments from the correct API endpoint", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    render(
      <CommentSection
        resourceId="res-42"
        currentUserId={null}
        currentUserRole={null}
        isAuthenticated={false}
      />
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/resources/res-42/comments");
    });
  });

  it("shows an empty state message when there are no comments", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId={null}
        currentUserRole={null}
        isAuthenticated={false}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/No comments yet/)).toBeInTheDocument();
    });
  });

  it("shows the comment form when the user is authenticated", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-1"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Add a comment...")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Post Comment" })).toBeInTheDocument();
    });
  });

  it("shows a sign-in prompt instead of the form when unauthenticated", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId={null}
        currentUserRole={null}
        isAuthenticated={false}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
      expect(screen.queryByPlaceholderText("Add a comment...")).not.toBeInTheDocument();
    });
  });

  it("submits a new comment and prepends it to the list", async () => {
    const user = userEvent.setup();
    const newComment = {
      id: "c-new",
      body: "My new comment",
      createdAt: new Date().toISOString(),
      user: { id: "user-1", name: "Bob", image: null },
    };

    vi.mocked(global.fetch)
      .mockResolvedValueOnce({ ok: true, json: async () => [] } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => newComment } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-1"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() =>
      expect(screen.getByPlaceholderText("Add a comment...")).toBeInTheDocument()
    );

    await user.type(screen.getByPlaceholderText("Add a comment..."), "My new comment");
    await user.click(screen.getByRole("button", { name: "Post Comment" }));

    await waitFor(() => {
      expect(screen.getByText("My new comment")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/resources/res-1/comments",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ body: "My new comment" }),
      })
    );
  });

  it("clears the textarea after successful submission", async () => {
    const user = userEvent.setup();

    vi.mocked(global.fetch)
      .mockResolvedValueOnce({ ok: true, json: async () => [] } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: "c-new",
          body: "Hello",
          createdAt: new Date().toISOString(),
          user: { id: "user-1", name: "Bob", image: null },
        }),
      } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-1"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() =>
      expect(screen.getByPlaceholderText("Add a comment...")).toBeInTheDocument()
    );

    const textarea = screen.getByPlaceholderText("Add a comment...");
    await user.type(textarea, "Hello");
    await user.click(screen.getByRole("button", { name: "Post Comment" }));

    await waitFor(() => {
      expect(textarea).toHaveValue("");
    });
  });

  it("shows the Delete button for a comment the current user owns", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockComment],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-1"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    });
  });

  it("shows the Delete button for admin on any comment", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockComment],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="admin-user"
        currentUserRole="ADMIN"
        isAuthenticated={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    });
  });

  it("hides the Delete button for non-owner, non-admin users", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockComment],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-other"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "Delete" })).not.toBeInTheDocument();
    });
  });

  it("removes a comment from the list after successful deletion", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("confirm", vi.fn(() => true));

    vi.mocked(global.fetch)
      .mockResolvedValueOnce({ ok: true, json: async () => [mockComment] } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-1"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() =>
      expect(screen.getByText("This is a great resource!")).toBeInTheDocument()
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(screen.queryByText("This is a great resource!")).not.toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/resources/res-1/comments/c-1",
      expect.objectContaining({ method: "DELETE" })
    );
  });

  it("keeps the comment in the list when deletion is cancelled", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("confirm", vi.fn(() => false));

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockComment],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-1"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() =>
      expect(screen.getByText("This is a great resource!")).toBeInTheDocument()
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByText("This is a great resource!")).toBeInTheDocument();
    // Only one fetch call (the initial GET), no DELETE was fired
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("displays the user avatar initial when no image is provided", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockComment],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-2"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("A")).toBeInTheDocument(); // First char of "Alice"
    });
  });

  it("updates the comments heading with the current count", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockComment],
    } as Response);

    render(
      <CommentSection
        resourceId="res-1"
        currentUserId="user-2"
        currentUserRole="VISITOR"
        isAuthenticated={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Comments (1)")).toBeInTheDocument();
    });
  });
});
