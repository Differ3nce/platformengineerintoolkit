import Link from "next/link";
import { auth, signIn, signOut } from "@/lib/auth";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  const session = await auth();

  const navLinks = (
    <>
      <Link
        href="/get-involved"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
      >
        Get Involved
      </Link>
      <Link
        href="/about"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
      >
        About
      </Link>
    </>
  );

  const authSection = session?.user ? (
    <div className="flex items-center gap-3">
      {session.user.role === "ADMIN" && (
        <Link
          href="/admin"
          className="text-sm font-medium text-primary transition-colors hover:text-accent"
        >
          Admin
        </Link>
      )}
      <div className="flex items-center gap-2">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name ?? "User"}
            className="h-7 w-7 rounded-full border border-border"
          />
        )}
        <span className="text-sm text-muted-foreground">
          {session.user.name}
        </span>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          type="submit"
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          Sign out
        </button>
      </form>
    </div>
  ) : (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Sign in
      </button>
    </form>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-primary transition-colors hover:text-accent"
          >
            🎢 Platform Engineering Toolkit
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks}
            {authSection}
          </div>

          {/* Mobile nav */}
          <MobileMenu>
            <div className="flex flex-col gap-4 p-4">
              {navLinks}
              {authSection}
            </div>
          </MobileMenu>
        </nav>
      </div>
    </header>
  );
}
