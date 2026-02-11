export default async function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="mx-auto max-w-6xl px-6 py-16 text-center">
                <h2 className="text-4xl font-bold leading-tight">
                    Thoughts, stories & ideas
                </h2>

                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Read articles about web development, design, productivity,
                    and real-world experiences.
                </p>
            </section>

            {/* Blog Grid */}
            <section className="mx-auto max-w-6xl px-6 pb-20">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((post) => (
                        <article
                            key={post}
                            className="rounded-xl border border-border bg-card p-6 transition hover:shadow-md"
                        >
                            <span className="text-xs font-medium text-primary">
                                Technology
                            </span>

                            <h3 className="mt-2 text-lg font-semibold">
                                How modern web apps are built
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                                A practical guide to building scalable and
                                maintainable web applications using modern
                                tools.
                            </p>

                            <div className="mt-4 text-sm text-muted-foreground">
                                Jan 10, 2026 · 5 min read
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border">
                <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Modern Blog. All rights
                    reserved.
                </div>
            </footer>
        </main>
    );
}
