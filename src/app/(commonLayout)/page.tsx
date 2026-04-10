import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
    const blogs = await blogService.getBlogs({}, { cache: "no-store" });
    const postData = blogs?.data?.allPost || [];

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 px-12">
            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[100px]" />
            </div>

            <section className="mx-auto max-w-7xl px-6 py-24">
                {/* Blog Content */}
                {postData.length === 0 ? (
                    <div className="py-20 text-center font-mono text-zinc-400">
                        [ ERROR: NO_POSTS_RETURNED ]
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 overflow-hidden rounded-2xl">
                        {postData.map((b: BlogPost, index: number) => {
                            const isLarge = index === 0; // First post is the "Hero"
                            return (
                                <Link
                                    href={`/blogs/${b.id}`}
                                    key={b.id}
                                    className={`group relative bg-white dark:bg-[#0a0a0a] p-8 md:p-12 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 
                                    ${isLarge ? "md:col-span-8" : "md:col-span-4"}`}
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-8">
                                            <span className="text-[10px] font-mono text-zinc-400">
                                                ID: 00{index + 1}
                                            </span>

                                            <ArrowUpRight
                                                href={`/blogs/${b.id}`}
                                                className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1"
                                            />
                                        </div>

                                        <div
                                            className={`font-bold tracking-tight mb-4 group-hover:text-indigo-500 transition-colors
                                            ${isLarge ? "text-4xl md:text-5xl" : "text-2xl"}`}
                                        >
                                            {b.title}
                                        </div>

                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-10">
                                            {b.content}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                                                    Posted
                                                </span>
                                                <span className="text-xs font-mono">
                                                    {b.createdAt
                                                        ? new Date(
                                                              b.createdAt,
                                                          ).toLocaleString()
                                                        : ""}
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
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}
