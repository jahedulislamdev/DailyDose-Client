import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-6 text-center text-white">
            <h1 className="text-8xl font-extrabold tracking-tight text-slate-300">
                404
            </h1>

            <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

            <p className="mt-2 max-w-md text-slate-400">
                Sorry, the page you’re looking for doesn’t exist or may have
                been moved.
            </p>

            <Link
                href="/"
                className="mt-6 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
            >
                ← Back to Home
            </Link>
        </div>
    );
}
