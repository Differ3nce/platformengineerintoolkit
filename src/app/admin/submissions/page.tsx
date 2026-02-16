"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Submission {
  id: string;
  title: string;
  description: string;
  body: string | null;
  type: string;
  externalUrl: string | null;
  status: string;
  reviewNote: string | null;
  createdAt: string;
  submittedBy: { name: string | null; email: string };
  reviewedBy: { name: string | null } | null;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminSubmissionsPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/submissions/list").then((r) => r.json()),
      fetch("/api/admin/categories/list").then((r) => r.json()),
    ]).then(([subs, cats]) => {
      setSubmissions(subs);
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  async function handleReview(id: string, action: "approve" | "reject") {
    if (action === "approve" && !categoryId) {
      alert("Please select a category for the new resource");
      return;
    }

    const res = await fetch(`/api/admin/submissions/${id}/review`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, reviewNote, categoryId }),
    });

    if (res.ok) {
      setReviewingId(null);
      setReviewNote("");
      setCategoryId("");
      const updated = await fetch("/api/admin/submissions/list").then((r) =>
        r.json()
      );
      setSubmissions(updated);
      router.refresh();
    }
  }

  const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Submissions</h1>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="rounded-lg border border-gray-200 p-5"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {sub.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {sub.type} &middot; Submitted by{" "}
                    {sub.submittedBy.name ?? sub.submittedBy.email} &middot;{" "}
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-medium ${
                    statusColor[sub.status] ?? "bg-gray-100"
                  }`}
                >
                  {sub.status}
                </span>
              </div>

              <p className="mb-2 text-sm text-gray-700">{sub.description}</p>

              {sub.body && (
                <details className="mb-2">
                  <summary className="cursor-pointer text-sm text-blue-600">
                    Show full content
                  </summary>
                  <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded bg-gray-50 p-3 text-xs text-gray-700">
                    {sub.body}
                  </pre>
                </details>
              )}

              {sub.externalUrl && (
                <p className="mb-2 text-sm">
                  <span className="text-gray-500">Link: </span>
                  <a
                    href={sub.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {sub.externalUrl}
                  </a>
                </p>
              )}

              {sub.reviewNote && (
                <p className="mb-2 text-sm text-gray-500">
                  Review note: {sub.reviewNote}
                </p>
              )}

              {sub.status === "PENDING" && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  {reviewingId === sub.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-500">
                          Category (for approved resource)
                        </label>
                        <select
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                          className="rounded-md border border-gray-300 px-3 py-1 text-sm"
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-500">
                          Review note (optional)
                        </label>
                        <input
                          type="text"
                          value={reviewNote}
                          onChange={(e) => setReviewNote(e.target.value)}
                          placeholder="Add a note..."
                          className="w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReview(sub.id, "approve")}
                          className="rounded-md bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReview(sub.id, "reject")}
                          className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => setReviewingId(null)}
                          className="text-sm text-gray-400 hover:text-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReviewingId(sub.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Review
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
