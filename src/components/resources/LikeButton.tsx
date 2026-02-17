"use client";

import { useState, useTransition } from "react";

interface LikeButtonProps {
  resourceId: string;
  initialLiked: boolean;
  initialCount: number;
  isAuthenticated: boolean;
}

export default function LikeButton({
  resourceId,
  initialLiked,
  initialCount,
  isAuthenticated,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!isAuthenticated) {
      window.location.href = "/auth/signin";
      return;
    }

    // Optimistic update
    const newLiked = !liked;
    setLiked(newLiked);
    setCount((prev) => (newLiked ? prev + 1 : prev - 1));

    startTransition(async () => {
      try {
        const res = await fetch(`/api/resources/${resourceId}/like`, {
          method: "POST",
        });

        if (res.ok) {
          const data = await res.json();
          setLiked(data.liked);
          setCount(data.count);
        } else {
          // Revert optimistic update
          setLiked(!newLiked);
          setCount((prev) => (newLiked ? prev - 1 : prev + 1));
        }
      } catch {
        // Revert optimistic update
        setLiked(!newLiked);
        setCount((prev) => (newLiked ? prev - 1 : prev + 1));
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
        liked
          ? "border-red-200 bg-red-50 text-red-600"
          : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-red-500"
      } ${isPending ? "opacity-50" : ""}`}
      title={isAuthenticated ? (liked ? "Unlike" : "Like") : "Sign in to like"}
    >
      <span className="text-base">{liked ? "♥" : "♡"}</span>
      <span>{count}</span>
    </button>
  );
}
