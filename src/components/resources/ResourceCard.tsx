import Link from "next/link";

interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  readTime: string | null;
  targetAudience: string[];
  slug: string;
  categorySlug: string;
  status: string;
  likeCount: number;
  commentCount: number;
}

export default function ResourceCard({
  title,
  description,
  type,
  readTime,
  targetAudience,
  slug,
  categorySlug,
  status,
  likeCount,
  commentCount,
}: ResourceCardProps) {
  const isComingSoon = status === "COMING_SOON";

  const card = (
    <div
      className={`group rounded-lg border border-gray-200 p-5 transition-colors ${
        isComingSoon
          ? "cursor-default opacity-60"
          : "hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      {/* Type badge + read time */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
          {type}
        </span>
        {readTime && (
          <span className="text-xs text-gray-400">{readTime}</span>
        )}
        {isComingSoon && (
          <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Coming Soon
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`mb-2 text-lg font-semibold text-gray-900 ${
          !isComingSoon ? "group-hover:text-blue-600" : ""
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="mb-3 text-sm text-gray-600 line-clamp-2">{description}</p>

      {/* Audience */}
      {targetAudience.length > 0 && (
        <p className="mb-3 text-xs text-gray-400">
          For: {targetAudience.join(", ")}
        </p>
      )}

      {/* Engagement stats */}
      {(likeCount > 0 || commentCount > 0) && (
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {likeCount > 0 && (
            <span>
              ♥ {likeCount} like{likeCount !== 1 ? "s" : ""}
            </span>
          )}
          {commentCount > 0 && (
            <span>
              💬 {commentCount} comment{commentCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (isComingSoon) {
    return card;
  }

  return (
    <Link href={`/${categorySlug}/${slug}`}>
      {card}
    </Link>
  );
}
