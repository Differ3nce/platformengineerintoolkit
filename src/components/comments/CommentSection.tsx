"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  body: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface CommentSectionProps {
  resourceId: string;
  currentUserId: string | null;
  currentUserRole: string | null;
  isAuthenticated: boolean;
}

export default function CommentSection({
  resourceId,
  currentUserId,
  currentUserRole,
  isAuthenticated,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/resources/${resourceId}/comments`)
      .then((r) => r.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      });
  }, [resourceId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/resources/${resourceId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newComment.trim() }),
      });

      if (res.ok) {
        const comment = await res.json();
        setComments((prev) => [comment, ...prev]);
        setNewComment("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(commentId: string) {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    const res = await fetch(
      `/api/resources/${resourceId}/comments/${commentId}`,
      { method: "DELETE" }
    );

    if (res.ok) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    }
  }

  function canDelete(comment: Comment) {
    return currentUserId === comment.user.id || currentUserRole === "ADMIN";
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Comments ({comments.length})
      </h2>

      {/* Add comment form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">
            <a href="/auth/signin" className="text-blue-600 hover:text-blue-800">
              Sign in
            </a>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      {/* Comment list */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              {comment.user.image ? (
                <img
                  src={comment.user.image}
                  alt={comment.user.name ?? "User"}
                  className="h-8 w-8 flex-shrink-0 rounded-full"
                />
              ) : (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                  {(comment.user.name ?? "U").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {comment.user.name ?? "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(comment.createdAt)}
                  </span>
                  {canDelete(comment) && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-xs text-gray-400 hover:text-red-500"
                      title="Delete comment"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
