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
      className={`group rounded-lg border border-border bg-card p-6 shadow-card transition-all duration-300 ${
        isComingSoon
          ? "cursor-default opacity-60"
          : "hover:shadow-lg hover:-translate-y-1 hover:bg-card-hover"
      }`}
    >
      {/* Type badge + read time */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {type}
        </span>
        {readTime && (
          <span className="text-xs text-muted-foreground">{readTime}</span>
        )}
        {isComingSoon && (
          <span className="inline-block rounded bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent-foreground">
            Coming Soon
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`mb-2 text-lg font-semibold text-card-foreground ${
          !isComingSoon ? "group-hover:text-primary" : ""
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{description}</p>

      {/* Audience */}
      {targetAudience.length > 0 && (
        <p className="mb-3 text-xs text-muted-foreground">
          For: {targetAudience.join(", ")}
        </p>
      )}

      {/* Engagement stats */}
      {(likeCount > 0 || commentCount > 0) && (
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
