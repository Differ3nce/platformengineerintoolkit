"use client";

import { useState } from "react";

const RESOURCE_TYPES = [
  "Article",
  "Tool",
  "Framework",
  "Canvas",
  "Video",
  "Workshop",
  "Book/Guide",
  "Maturity Model",
  "Case Study",
  "Other",
];

interface SubmissionFormProps {
  isAuthenticated: boolean;
}

export default function SubmissionForm({
  isAuthenticated,
}: SubmissionFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p className="text-gray-600">
          <a
            href="/auth/signin"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign in
          </a>{" "}
          to submit a resource.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <div className="mb-3 text-3xl">🎉</div>
        <h3 className="mb-2 text-lg font-semibold text-green-800">
          Thank you for your submission!
        </h3>
        <p className="text-sm text-green-700">
          Our team will review your resource and get back to you. Submissions
          are typically reviewed within a few days.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setTitle("");
            setType("");
            setDescription("");
            setBody("");
            setExternalUrl("");
          }}
          className="mt-4 text-sm text-green-600 hover:text-green-800"
        >
          Submit another resource
        </button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError("");

    if (!title.trim() || !type || !description.trim()) {
      setError("Title, type, and description are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          type,
          description: description.trim(),
          body: body.trim() || null,
          externalUrl: externalUrl.trim() || null,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-gray-200 bg-white p-6"
    >
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="sub-title"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Title *
        </label>
        <input
          id="sub-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Platform Team Communication Guide"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label
          htmlFor="sub-type"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Type *
        </label>
        <select
          id="sub-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          required
        >
          <option value="">Select type...</option>
          {RESOURCE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="sub-description"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Short Description *
        </label>
        <textarea
          id="sub-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A brief summary of the resource (shown on cards)"
          rows={2}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label
          htmlFor="sub-body"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Detailed Content{" "}
          <span className="font-normal text-gray-400">(optional, Markdown)</span>
        </label>
        <textarea
          id="sub-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Provide detailed content in Markdown format..."
          rows={6}
          className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <div>
        <label
          htmlFor="sub-url"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          External URL{" "}
          <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          id="sub-url"
          type="url"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          placeholder="https://example.com/resource"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Resource for Review"}
      </button>

      <p className="text-xs text-gray-400">
        Submissions are reviewed by our team before being added to the toolkit.
      </p>
    </form>
  );
}
