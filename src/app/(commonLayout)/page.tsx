import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default async function Home() {
    const session = await authClient.getSession();

    const posts = [
        {
            id: 1,
            title: "Architecting Scalable Systems",
            tag: "Engineering",
            color: "from-blue-500 to-cyan-400",
        },
        {
            id: 2,
            title: "The Art of Micro-Interactions",
            tag: "Design",
            color: "from-purple-500 to-pink-400",
        },
        {
            id: 3,
            title: "Edge Computing Explained",
            tag: "Infrastructure",
            color: "from-orange-500 to-amber-400",
        },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
            {/* 1. Fancy Background Elements */}
            <div className="absolute top-0 -z-10 h-full w-full">
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/10 blur-[100px]" />
            </div>

            <main className="relative mx-auto max-w-5xl px-6 py-24">
                {/* 2. Hero Section with Gradient Text */}
                <header className="mb-24 space-y-6">
                    <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-400 backdrop-blur-sm">
                        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
                        Available for new projects
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
                        Design.{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-white to-fuchsia-400 bg-clip-text text-transparent">
                            Code.
                        </span>{" "}
                        Ship.
                    </h1>
                    <p className="max-w-2xl text-lg text-zinc-400 md:text-xl leading-relaxed">
                        A curated collection of thoughts on building digital
                        products in 2026. Welcome back,{" "}
                        <span className="text-white font-medium">
                            {session?.user?.name || "Guest"}
                        </span>
                        .
                    </p>
                </header>

                {/* 3. Featured Grid */}
                <section>
                    <div className="mb-12 flex items-end justify-between">
                        <h2 className="text-2xl font-bold">
                            Featured Insights
                        </h2>
                        <Link
                            href="/posts"
                            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            View all posts →
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="group relative"
                            >
                                {/* Card Glow Effect */}
                                <div
                                    className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${post.color} opacity-20 blur transition duration-500 group-hover:opacity-60`}
                                />

                                <article className="relative h-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-1">
                                    <span
                                        className={`mb-4 inline-block rounded-md bg-gradient-to-r ${post.color} px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black`}
                                    >
                                        {post.tag}
                                    </span>
                                    <h3 className="text-xl font-bold leading-snug text-white group-hover:text-indigo-200 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                                        Deep dive into the strategies used by
                                        world-class teams to deliver impact at
                                        scale.
                                    </p>
                                    <div className="mt-6 flex items-center text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                        Read Story
                                        <svg
                                            className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 4. Fancy Footer Newsletter */}
                <footer className="mt-32 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-12 text-center">
                    <h3 className="text-2xl font-bold mb-2">
                        Join the inner circle
                    </h3>
                    <p className="text-zinc-500 mb-8">
                        Get notified about my latest experiments and articles.
                    </p>
                    <div className="mx-auto flex max-w-md gap-2">
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="rounded-lg bg-white px-6 py-2 text-sm font-bold text-black hover:bg-zinc-200 transition-colors">
                            Join
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}
