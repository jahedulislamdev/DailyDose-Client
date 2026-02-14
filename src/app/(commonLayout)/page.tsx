import { blogService } from "@/services/blog.service";
import { ArrowUpRight } from "lucide-react";

export default async function Home() {
    // 1. Data Fetching (Server-side)
    const blogs = await blogService.getBlogs(
        {
            isFeatured: false,
            search: " ",
        },
        { cache: "no-store" },
    );
    const postData = blogs?.data?.allPost || [];

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 px-12">
            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[100px]" />
            </div>

            <section className="mx-auto max-w-7xl px-6 py-24">
                {/* Header Section */}
                <header className="relative mb-20 overflow-hidden">
                    {/* Large background watermark - non-selectable for aesthetics */}
                    <div className="absolute -top-10 -left-10 text-[12rem] font-black text-zinc-400/5 select-none pointer-events-none tracking-tighter">
                        JOURNAL
                    </div>

                    <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="w-12 h-[2px] bg-indigo-500 rounded-full" />
                                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400">
                                    Edition 2026
                                </p>
                            </div>

                            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] transition-all">
                                INSIGHTS
                                <span className="text-indigo-600">.</span>
                                <br />
                                <span className="text-2xl md:text-4xl font-light tracking-widest text-zinc-400 uppercase mt-2 block">
                                    Digital Curator
                                </span>
                            </h1>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-4 border-l-2 md:border-l-0 md:border-r-2 border-indigo-500 pl-6 md:pl-0 md:pr-6 py-2">
                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                                    Database Status
                                </p>
                                <p className="text-sm font-mono font-medium flex items-center gap-2 md:justify-end">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    {postData?.length} entries_found
                                </p>
                            </div>

                            <p className="max-width: 240px text-xs md:text-right text-zinc-500 leading-relaxed italic">
                                A collection of technical research,
                                architectural patterns, and creative
                                engineering.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Blog Content */}
                {postData.length === 0 ? (
                    <div className="py-20 text-center font-mono text-zinc-400">
                        [ ERROR: NO_POSTS_RETURNED ]
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 overflow-hidden rounded-2xl">
                        {postData.map((b: any, index: number) => {
                            const isLarge = index === 0; // First post is the "Hero"
                            return (
                                <article
                                    key={b.id}
                                    className={`group relative bg-white dark:bg-[#0a0a0a] p-8 md:p-12 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 
                                    ${isLarge ? "md:col-span-8" : "md:col-span-4"}`}
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-8">
                                            <span className="text-[10px] font-mono text-zinc-400">
                                                ID: 00{index + 1}
                                            </span>
                                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
                                        </div>

                                        <h2
                                            className={`font-bold tracking-tight mb-4 group-hover:text-indigo-500 transition-colors
                                            ${isLarge ? "text-4xl md:text-5xl" : "text-2xl"}`}
                                        >
                                            {b.title}
                                        </h2>

                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-10">
                                            {b.content}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                                                    Posted
                                                </span>
                                                <span className="text-xs font-mono">
                                                    {new Date(
                                                        b.date,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                                                    Traffic
                                                </span>
                                                <span className="text-xs font-mono">
                                                    {b.views} views
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Simple Minimal Footer */}
            <footer className="mx-auto max-w-7xl px-6 py-12 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                <span>© 2026 ARCHIVE_SYSTEM</span>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-indigo-500">
                        Twitter
                    </a>
                    <a href="#" className="hover:text-indigo-500">
                        RSS
                    </a>
                </div>
            </footer>
        </main>
    );
}
