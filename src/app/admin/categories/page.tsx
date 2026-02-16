"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
  _count: { resources: number };
}

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const res = await fetch("/api/admin/categories/list");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description ?? "");
    setDisplayOrder(cat.displayOrder);
    setError("");
  }

  function startNew() {
    setEditingId("new");
    setName("");
    setDescription("");
    setDisplayOrder(categories.length);
    setError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setName("");
    setDescription("");
    setDisplayOrder(0);
    setError("");
  }

  async function handleSave() {
    setError("");
    const isNew = editingId === "new";
    const url = isNew
      ? "/api/admin/categories"
      : `/api/admin/categories/${editingId}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, displayOrder }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save");
      return;
    }

    cancelEdit();
    fetchCategories();
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete");
      return;
    }
    fetchCategories();
    router.refresh();
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={startNew}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          + New Category
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
          >
            {editingId === cat.id ? (
              <div className="flex flex-1 items-center gap-3">
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                  className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                  placeholder="#"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-1 text-sm"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-1 text-sm"
                  placeholder="Description"
                />
                <button
                  onClick={handleSave}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div>
                  <span className="mr-3 text-xs text-gray-400">
                    #{cat.displayOrder}
                  </span>
                  <span className="font-medium text-gray-900">{cat.name}</span>
                  {cat.description && (
                    <span className="ml-2 text-sm text-gray-500">
                      — {cat.description}
                    </span>
                  )}
                  <span className="ml-3 text-xs text-gray-400">
                    ({cat._count.resources} resources)
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(cat)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {editingId === "new" && (
          <div className="flex items-center gap-3 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-4">
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
              placeholder="#"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm"
              placeholder="Category name"
              autoFocus
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-1 text-sm"
              placeholder="Description (optional)"
            />
            <button
              onClick={handleSave}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
