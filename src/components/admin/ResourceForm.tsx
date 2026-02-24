"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Author {
  id: string;
  name: string | null;
}

interface ExternalLink {
  label: string;
  url: string;
  description?: string;
}

interface ResourceFormProps {
  categories: Category[];
  tags: Tag[];
  authors: Author[];
  initialData?: {
    id: string;
    title: string;
    description: string;
    body: string;
    status: string;
    targetAudience: string[];
    thumbnailUrl: string | null;
    externalLinks: ExternalLink[];
    categoryId: string;
    tagIds: string[];
    authorIds: string[];
  };
}

export default function ResourceForm({
  categories,
  tags,
  authors,
  initialData,
}: ResourceFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [bodyContent, setBodyContent] = useState(initialData?.body ?? "");
  const [status, setStatus] = useState(initialData?.status ?? "DRAFT");
  const [audienceInput, setAudienceInput] = useState(
    initialData?.targetAudience.join(", ") ?? ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnailUrl ?? "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? "");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    initialData?.tagIds ?? []
  );
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>(
    initialData?.authorIds ?? []
  );
  const [externalLinks, setExternalLinks] = useState<ExternalLink[]>(
    initialData?.externalLinks ?? [{ label: "", url: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function toggleTag(tagId: string) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  }

  function toggleAuthor(authorId: string) {
    setSelectedAuthorIds((prev) =>
      prev.includes(authorId)
        ? prev.filter((id) => id !== authorId)
        : [...prev, authorId]
    );
  }

  function addExternalLink() {
    setExternalLinks([...externalLinks, { label: "", url: "", description: "" }]);
  }

  function removeExternalLink(index: number) {
    setExternalLinks(externalLinks.filter((_, i) => i !== index));
  }

  function updateExternalLink(
    index: number,
    field: "label" | "url" | "description",
    value: string
  ) {
    const updated = [...externalLinks];
    updated[index] = { ...updated[index], [field]: value };
    setExternalLinks(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const targetAudience = audienceInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const filteredLinks = externalLinks.filter((l) => l.label && l.url);

    const payload = {
      title,
      description,
      bodyContent,
      status,
      targetAudience,
      thumbnailUrl: thumbnailUrl || null,
      externalLinks: filteredLinks,
      categoryId,
      tagIds: selectedTagIds,
      authorIds: selectedAuthorIds,
    };

    try {
      const url = isEditing
        ? `/api/admin/resources/${initialData.id}`
        : "/api/admin/resources";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save resource");
      }

      router.push("/admin/resources");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!initialData || !confirm("Are you sure you want to delete this resource?")) return;

    try {
      const res = await fetch(`/api/admin/resources/${initialData.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/admin/resources");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Description (short) */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Short Description * (shown on cards)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={2}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Body (markdown) */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Body (Markdown)
        </label>
        <textarea
          value={bodyContent}
          onChange={(e) => setBodyContent(e.target.value)}
          rows={16}
          placeholder="Write your content in Markdown..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-400">
          Supports Markdown: headings, bold, lists, links, etc.
        </p>
      </div>

      {/* Status */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="COMING_SOON">Coming Soon</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Authors */}
      {authors.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Authors
          </label>
          <div className="flex flex-wrap gap-2">
            {authors.map((author) => (
              <button
                key={author.id}
                type="button"
                onClick={() => toggleAuthor(author.id)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  selectedAuthorIds.includes(author.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {author.name ?? author.id}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Target Audience */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Target Audience (comma-separated)
        </label>
        <input
          type="text"
          value={audienceInput}
          onChange={(e) => setAudienceInput(e.target.value)}
          placeholder="e.g. Platform Engineers, Product Managers, Architects"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  selectedTagIds.includes(tag.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Thumbnail URL */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Thumbnail URL
        </label>
        <input
          type="url"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Resources / External Links */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Resources (External Links)
        </label>
        {externalLinks.map((link, index) => (
          <div key={index} className="mb-3 rounded-md border border-gray-200 p-3">
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateExternalLink(index, "label", e.target.value)}
                placeholder="Label"
                className="w-1/3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateExternalLink(index, "url", e.target.value)}
                placeholder="https://..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeExternalLink(index)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={link.description ?? ""}
              onChange={(e) => updateExternalLink(index, "description", e.target.value)}
              placeholder="Optional description (e.g. 'Article by NN Group')"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addExternalLink}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          + Add link
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Update Resource" : "Create Resource"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/resources")}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto text-sm text-red-500 hover:text-red-700"
          >
            Delete Resource
          </button>
        )}
      </div>
    </form>
  );
}
