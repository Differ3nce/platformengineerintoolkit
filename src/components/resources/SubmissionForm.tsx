"use client";

import { useState } from "react";

interface SubmissionFormProps {
  isAuthenticated: boolean;
}

export default function SubmissionForm({
  isAuthenticated,
}: SubmissionFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [externalLinks, setExternalLinks] = useState([{ label: "", url: "" }]);
  const [contactInfo, setContactInfo] = useState("");

  function addLink() {
    setExternalLinks([...externalLinks, { label: "", url: "" }]);
  }
  function removeLink(i: number) {
    setExternalLinks(externalLinks.filter((_, idx) => idx !== i));
  }
  function updateLink(i: number, field: "label" | "url", value: string) {
    const updated = [...externalLinks];
    updated[i] = { ...updated[i], [field]: value };
    setExternalLinks(updated);
  }
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
            setDescription("");
            setBody("");
            setExternalLinks([{ label: "", url: "" }]);
            setContactInfo("");
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

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          body: body.trim() || null,
          externalLinks: externalLinks.filter((l) => l.label && l.url),
          contactInfo: contactInfo.trim() || null,
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
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Links to the external resources{" "}
          <span className="font-normal text-gray-400">(optional)</span>
        </label>
        {externalLinks.map((link, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input
              type="text"
              value={link.label}
              onChange={(e) => updateLink(i, "label", e.target.value)}
              placeholder="Label"
              className="w-1/3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateLink(i, "url", e.target.value)}
              placeholder="https://..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            {externalLinks.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink(i)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addLink}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          + Add link
        </button>
      </div>

      <div>
        <label
          htmlFor="sub-contact"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Contact information{" "}
          <span className="font-normal text-gray-400">(optional, only visible to admins)</span>
        </label>
        <input
          id="sub-contact"
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          placeholder="e.g. email address, LinkedIn, or any other way to reach you"
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
