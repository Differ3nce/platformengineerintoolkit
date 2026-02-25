import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/helpers/render";
import userEvent from "@testing-library/user-event";
import SubmissionForm from "./SubmissionForm";

describe("SubmissionForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  describe("when unauthenticated", () => {
    it("shows sign in prompt instead of form", () => {
      render(<SubmissionForm isAuthenticated={false} />);
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
      expect(screen.queryByRole("form")).not.toBeInTheDocument();
    });

    it("renders a sign in link", () => {
      render(<SubmissionForm isAuthenticated={false} />);
      const link = screen.getByRole("link", { name: /sign in/i });
      expect(link).toHaveAttribute("href", "/auth/signin");
    });
  });

  describe("when authenticated", () => {
    it("renders all form fields", () => {
      render(<SubmissionForm isAuthenticated={true} />);
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/short description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/detailed content/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/external url/i)).toBeInTheDocument();
    });

    it("renders the submit button", () => {
      render(<SubmissionForm isAuthenticated={true} />);
      expect(
        screen.getByRole("button", { name: /submit resource for review/i })
      ).toBeInTheDocument();
    });

    it("shows validation error when required fields are missing", async () => {
      render(<SubmissionForm isAuthenticated={true} />);
      fireEvent.submit(screen.getByRole("button", { name: /submit resource/i }).closest("form")!);
      await waitFor(() => {
        expect(
          screen.getByText(/title, type, and description are required/i)
        ).toBeInTheDocument();
      });
    });

    it("does not call fetch when required fields are missing", async () => {
      render(<SubmissionForm isAuthenticated={true} />);
      fireEvent.submit(screen.getByRole("button", { name: /submit resource/i }).closest("form")!);
      await waitFor(() => {
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });

    it("submits the form and shows success message on ok response", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      });

      render(<SubmissionForm isAuthenticated={true} />);

      await userEvent.type(screen.getByLabelText(/title/i), "My Resource");
      await userEvent.selectOptions(screen.getByLabelText(/type/i), "Article");
      await userEvent.type(
        screen.getByLabelText(/short description/i),
        "A great resource."
      );

      fireEvent.submit(screen.getByRole("button", { name: /submit resource/i }).closest("form")!);

      await waitFor(() => {
        expect(
          screen.getByText(/thank you for your submission/i)
        ).toBeInTheDocument();
      });
    });

    it("posts to /api/submissions with correct payload", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      });

      render(<SubmissionForm isAuthenticated={true} />);

      await userEvent.type(screen.getByLabelText(/title/i), "My Resource");
      await userEvent.selectOptions(screen.getByLabelText(/type/i), "Tool");
      await userEvent.type(
        screen.getByLabelText(/short description/i),
        "A useful tool."
      );

      fireEvent.submit(screen.getByRole("button", { name: /submit resource/i }).closest("form")!);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/submissions",
          expect.objectContaining({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: "My Resource",
              type: "Tool",
              description: "A useful tool.",
              body: null,
              externalUrl: null,
            }),
          })
        );
      });
    });

    it("shows error message from server on failed response", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Submission failed." }),
      });

      render(<SubmissionForm isAuthenticated={true} />);

      await userEvent.type(screen.getByLabelText(/title/i), "My Resource");
      await userEvent.selectOptions(screen.getByLabelText(/type/i), "Article");
      await userEvent.type(
        screen.getByLabelText(/short description/i),
        "A great resource."
      );

      fireEvent.submit(screen.getByRole("button", { name: /submit resource/i }).closest("form")!);

      await waitFor(() => {
        expect(screen.getByText("Submission failed.")).toBeInTheDocument();
      });
    });

    it("shows network error message on fetch failure", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error("Network error")
      );

      render(<SubmissionForm isAuthenticated={true} />);

      await userEvent.type(screen.getByLabelText(/title/i), "My Resource");
      await userEvent.selectOptions(screen.getByLabelText(/type/i), "Article");
      await userEvent.type(
        screen.getByLabelText(/short description/i),
        "A great resource."
      );

      fireEvent.submit(screen.getByRole("button", { name: /submit resource/i }).closest("form")!);

      await waitFor(() => {
        expect(
          screen.getByText(/network error. please try again/i)
        ).toBeInTheDocument();
      });
    });

    it("disables the submit button while submitting", async () => {
      let resolveFetch: () => void;
      (global.fetch as ReturnType<typeof vi.fn>).mockReturnValueOnce(
        new Promise((resolve) => {
          resolveFetch = () => resolve({ ok: true });
        })
      );

      render(<SubmissionForm isAuthenticated={true} />);

      await userEvent.type(screen.getByLabelText(/title/i), "My Resource");
      await userEvent.selectOptions(screen.getByLabelText(/type/i), "Article");
      await userEvent.type(
        screen.getByLabelText(/short description/i),
        "A great resource."
      );

      fireEvent.submit(screen.getByRole("button", { name: /submit resource/i }).closest("form")!);

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /submitting/i })).toBeDisabled();
      });

      resolveFetch!();
    });

    it("allows submitting another resource after success", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
      });

      render(<SubmissionForm isAuthenticated={true} />);

      await userEvent.type(screen.getByLabelText(/title/i), "My Resource");
      await userEvent.selectOptions(screen.getByLabelText(/type/i), "Article");
      await userEvent.type(
        screen.getByLabelText(/short description/i),
        "A great resource."
      );

      fireEvent.submit(screen.getByRole("button", { name: /submit resource/i }).closest("form")!);

      await waitFor(() => {
        expect(screen.getByText(/submit another resource/i)).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText(/submit another resource/i));

      expect(
        screen.getByRole("button", { name: /submit resource for review/i })
      ).toBeInTheDocument();
    });
  });
});
