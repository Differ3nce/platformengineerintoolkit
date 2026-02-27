import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-center text-sm text-muted-foreground">
          Platform Engineering Toolkit &mdash; Proven practices to shape the
          people and organizational side of platform engineering.
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            Privacy Notice
          </Link>
        </p>
      </div>
    </footer>
  );
}
