import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
      <h2 className="mb-4 text-xl text-gray-600">Page not found</h2>
      <p className="mb-8 text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
      >
        Go Home
      </Link>
    </div>
  );
}
