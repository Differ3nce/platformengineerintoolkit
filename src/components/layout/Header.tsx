import Link from "next/link";
import { auth, signIn, signOut } from "@/lib/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-gray-900">
          Platform Engineering Toolkit
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/get-involved"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Get Involved
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            About
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-3">
              {session.user.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    className="h-7 w-7 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700">
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
                  className="text-sm text-gray-500 hover:text-gray-700"
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
                className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
              >
                Sign in
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
