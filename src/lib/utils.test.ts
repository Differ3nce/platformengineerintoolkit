import { describe, it, expect } from "vitest";
import { slugify, formatDate } from "./utils";

describe("slugify", () => {
  it("converts text to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("multiple   spaces")).toBe("multiple-spaces");
  });

  it("replaces underscores with hyphens", () => {
    expect(slugify("hello_world")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("hello@world!")).toBe("helloworld");
  });

  it("removes leading and trailing hyphens after trimming", () => {
    expect(slugify("  hello world  ")).toBe("hello-world");
  });

  it("collapses multiple hyphens into one", () => {
    expect(slugify("hello---world")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles string with only special characters", () => {
    expect(slugify("!!!")).toBe("");
  });

  it("handles real-world resource title", () => {
    expect(slugify("React.js & TypeScript: A Guide!")).toBe(
      "reactjs-typescript-a-guide"
    );
  });

  it("handles already-lowercase hyphenated string unchanged", () => {
    expect(slugify("platform-engineering")).toBe("platform-engineering");
  });
});

describe("formatDate", () => {
  it("formats a date in en-US long format", () => {
    // Use UTC to avoid timezone-dependent failures
    const date = new Date("2024-03-15T12:00:00Z");
    const result = formatDate(date);
    expect(result).toMatch(/March/);
    expect(result).toMatch(/2024/);
  });

  it("formats January correctly", () => {
    const date = new Date("2024-01-01T12:00:00Z");
    const result = formatDate(date);
    expect(result).toMatch(/January/);
    expect(result).toMatch(/2024/);
  });

  it("formats December correctly", () => {
    const date = new Date("2024-12-31T12:00:00Z");
    const result = formatDate(date);
    expect(result).toMatch(/December/);
    expect(result).toMatch(/2024/);
  });

  it("returns a non-empty string", () => {
    const result = formatDate(new Date());
    expect(result.length).toBeGreaterThan(0);
  });
});
