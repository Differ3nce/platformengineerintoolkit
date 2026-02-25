import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/helpers/render";
import ResourceCard from "./ResourceCard";

const defaultProps = {
  title: "Platform Engineering Guide",
  description: "A comprehensive guide to platform engineering.",
  tags: [
    { id: "t1", name: "Kubernetes" },
    { id: "t2", name: "DevOps" },
  ],
  targetAudience: ["Beginner", "Intermediate"],
  slug: "platform-engineering-guide",
  categorySlug: "guides",
  status: "PUBLISHED",
  likeCount: 10,
  commentCount: 3,
};

describe("ResourceCard", () => {
  it("renders the resource title", () => {
    render(<ResourceCard {...defaultProps} />);
    expect(screen.getByText("Platform Engineering Guide")).toBeInTheDocument();
  });

  it("renders the resource description", () => {
    render(<ResourceCard {...defaultProps} />);
    expect(
      screen.getByText("A comprehensive guide to platform engineering.")
    ).toBeInTheDocument();
  });

  it("renders all tags", () => {
    render(<ResourceCard {...defaultProps} />);
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("DevOps")).toBeInTheDocument();
  });

  it("renders the target audience", () => {
    render(<ResourceCard {...defaultProps} />);
    expect(screen.getByText(/Beginner, Intermediate/)).toBeInTheDocument();
  });

  it("renders like count with correct pluralisation", () => {
    render(<ResourceCard {...defaultProps} likeCount={10} />);
    expect(screen.getByText(/10 likes/)).toBeInTheDocument();
  });

  it("renders singular 'like' when count is 1", () => {
    render(<ResourceCard {...defaultProps} likeCount={1} commentCount={0} />);
    expect(screen.getByText(/1 like[^s]/)).toBeInTheDocument();
  });

  it("renders comment count with correct pluralisation", () => {
    render(<ResourceCard {...defaultProps} />);
    expect(screen.getByText(/3 comments/)).toBeInTheDocument();
  });

  it("renders singular 'comment' when count is 1", () => {
    render(<ResourceCard {...defaultProps} likeCount={0} commentCount={1} />);
    expect(screen.getByText(/1 comment[^s]/)).toBeInTheDocument();
  });

  it("hides engagement stats when both counts are 0", () => {
    render(<ResourceCard {...defaultProps} likeCount={0} commentCount={0} />);
    expect(screen.queryByText(/like/)).not.toBeInTheDocument();
    expect(screen.queryByText(/comment/)).not.toBeInTheDocument();
  });

  it("wraps the card in a Link when status is not COMING_SOON", () => {
    render(<ResourceCard {...defaultProps} status="PUBLISHED" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/guides/platform-engineering-guide");
  });

  it("does not render a link when status is COMING_SOON", () => {
    render(<ResourceCard {...defaultProps} status="COMING_SOON" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("shows 'Coming Soon' badge when status is COMING_SOON", () => {
    render(<ResourceCard {...defaultProps} status="COMING_SOON" />);
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });

  it("does not show 'Coming Soon' badge when status is PUBLISHED", () => {
    render(<ResourceCard {...defaultProps} status="PUBLISHED" />);
    expect(screen.queryByText("Coming Soon")).not.toBeInTheDocument();
  });

  it("does not render target audience section when array is empty", () => {
    render(<ResourceCard {...defaultProps} targetAudience={[]} />);
    expect(screen.queryByText(/For:/)).not.toBeInTheDocument();
  });
});
