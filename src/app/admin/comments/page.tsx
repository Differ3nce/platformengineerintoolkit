"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Comment {
  id: string;
  body: string;
  createdAt: string;
  user: { name: string | null; email: string };
  resource: { title: string; slug: string; category: { slug: string } };
}

export default function AdminCommentsPage() {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const res = await fetch("/api/admin/comments/list");
    const data = await res.json();
    setComments(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this comment?")) return;
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    fetchComments();
    router.refresh();
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Comments</h1>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start justify-between rounded-lg border border-gray-200 p-4"
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-900">
                    {comment.user.name ?? comment.user.email}
                  </span>
                  <span className="text-gray-400">on</span>
                  <a
                    href={`/${comment.resource.category.slug}/${comment.resource.slug}`}
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                  >
                    {comment.resource.title}
                  </a>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.body}</p>
              </div>
              <button
                onClick={() => handleDelete(comment.id)}
                className="ml-4 shrink-0 text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
