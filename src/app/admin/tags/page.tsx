"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Tag {
  id: string;
  name: string;
  slug: string;
  _count: { resources: number };
}

export default function AdminTagsPage() {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  async function fetchTags() {
    const res = await fetch("/api/admin/tags/list");
    const data = await res.json();
    setTags(data);
    setLoading(false);
  }

  function startEdit(tag: Tag) {
    setEditingId(tag.id);
    setName(tag.name);
    setError("");
  }

  function startNew() {
    setEditingId("new");
    setName("");
    setError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setName("");
    setError("");
  }

  async function handleSave() {
    setError("");
    const isNew = editingId === "new";
    const url = isNew ? "/api/admin/tags" : `/api/admin/tags/${editingId}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save");
      return;
    }

    cancelEdit();
    fetchTags();
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this tag?")) return;
    await fetch(`/api/admin/tags/${id}`, { method: "DELETE" });
    fetchTags();
    router.refresh();
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
        <button
          onClick={startNew}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          + New Tag
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) =>
          editingId === tag.id ? (
            <div
              key={tag.id}
              className="flex items-center gap-2 rounded-full border-2 border-blue-300 bg-blue-50 px-3 py-1"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-32 rounded border border-gray-300 px-2 py-0.5 text-sm"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div
              key={tag.id}
              className="group flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1"
            >
              <span className="text-sm text-gray-700">{tag.name}</span>
              <span className="text-xs text-gray-400">
                ({tag._count.resources})
              </span>
              <button
                onClick={() => startEdit(tag)}
                className="hidden text-xs text-blue-600 hover:text-blue-800 group-hover:inline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tag.id)}
                className="hidden text-xs text-red-500 hover:text-red-700 group-hover:inline"
              >
                ×
              </button>
            </div>
          )
        )}

        {editingId === "new" && (
          <div className="flex items-center gap-2 rounded-full border-2 border-dashed border-blue-300 bg-blue-50 px-3 py-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tag name"
              className="w-32 rounded border border-gray-300 px-2 py-0.5 text-sm"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
