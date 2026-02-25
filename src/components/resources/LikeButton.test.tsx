import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@/test/helpers/render";
import userEvent from "@testing-library/user-event";
import LikeButton from "./LikeButton";

describe("LikeButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it("renders the initial like count", () => {
    render(
      <LikeButton
        resourceId="res-1"
        initialLiked={false}
        initialCount={5}
        isAuthenticated={true}
      />
    );

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders the unliked heart symbol when not liked", () => {
    render(
      <LikeButton
        resourceId="res-1"
        initialLiked={false}
        initialCount={0}
        isAuthenticated={true}
      />
    );

    expect(screen.getByText("♡")).toBeInTheDocument();
  });

  it("renders the liked heart symbol when liked", () => {
    render(
      <LikeButton
        resourceId="res-1"
        initialLiked={true}
        initialCount={1}
        isAuthenticated={true}
      />
    );

    expect(screen.getByText("♥")).toBeInTheDocument();
  });

  it("applies optimistic like and updates count from server response", async () => {
    const user = userEvent.setup();
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ liked: true, count: 6 }),
    } as Response);

    render(
      <LikeButton
        resourceId="res-1"
        initialLiked={false}
        initialCount={5}
        isAuthenticated={true}
      />
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("6")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/resources/res-1/like",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("reverts the optimistic update when the server responds with an error", async () => {
    const user = userEvent.setup();
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Internal Server Error" }),
    } as Response);

    render(
      <LikeButton
        resourceId="res-1"
        initialLiked={false}
        initialCount={5}
        isAuthenticated={true}
      />
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  it("reverts the optimistic update on a network error", async () => {
    const user = userEvent.setup();
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Network error"));

    render(
      <LikeButton
        resourceId="res-1"
        initialLiked={false}
        initialCount={5}
        isAuthenticated={true}
      />
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  it("redirects to sign-in page when unauthenticated user clicks the button", async () => {
    const user = userEvent.setup();
    const assignSpy = vi.fn();
    Object.defineProperty(window, "location", {
      value: { href: "/" },
      writable: true,
    });

    render(
      <LikeButton
        resourceId="res-1"
        initialLiked={false}
        initialCount={5}
        isAuthenticated={false}
      />
    );

    await user.click(screen.getByRole("button"));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(window.location.href).toBe("/auth/signin");

    // restore
    Object.defineProperty(window, "location", {
      value: { href: "/" },
      writable: true,
    });
    assignSpy.mockRestore?.();
  });

  it("shows the correct tooltip for an unauthenticated user", () => {
    render(
      <LikeButton
        resourceId="res-1"
        initialLiked={false}
        initialCount={0}
        isAuthenticated={false}
      />
    );

    expect(screen.getByRole("button")).toHaveAttribute("title", "Sign in to like");
  });

  it("shows the 'Unlike' tooltip when the resource is already liked", () => {
    render(
      <LikeButton
        resourceId="res-1"
        initialLiked={true}
        initialCount={3}
        isAuthenticated={true}
      />
    );

    expect(screen.getByRole("button")).toHaveAttribute("title", "Unlike");
  });
});
