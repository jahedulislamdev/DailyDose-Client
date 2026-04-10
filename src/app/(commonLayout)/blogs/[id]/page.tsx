import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import {
    ChevronRight,
    MoreHorizontal,
    BarChart3,
    CalendarDays,
} from "lucide-react";
import Link from "next/link";

//
export const dynamic = "auto";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

// if we select false then it will be show not found except for the generated static params.
export const dynamicParams = true; // true | false

// static page generation for the specified dynamic routes.
export async function generateStaticParams() {
    const { data } = await blogService.getBlogs();
    return data?.allPost
        ?.slice(0, 3)
        ?.map((post: BlogPost) => ({ id: post.id }));
}

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const response = await blogService.getBlogById(id);
    const blog = response?.data;

    if (!response?.success || !blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#0A0A0A]">
                <div className="text-center">
                    <p className="text-sm font-mono text-zinc-400 mb-4">
                        ERR: 404_NOT_FOUND
                    </p>
                    <Link
                        href="/"
                        className="text-sm font-semibold hover:underline"
                    >
                        Return to index
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 font-sans antialiased">
            {/* Navigation Header */}
            <nav className="sticky top-0 z-50 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-black/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <Link
                            href="/"
                            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            Archive
                        </Link>
                        <ChevronRight size={14} className="text-zinc-300" />
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[200px]">
                            {blog.title}
                        </span>
                    </div>
                    <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </nav>

            <article className="max-w-3xl mx-auto px-6 pt-20 pb-32">
                {/* Meta Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-indigo-600 w-1.5 h-1.5 rounded-full animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                            Engineering Log
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-800">
                            •
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                            ID: {blog.id.split("-")[0]}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 leading-[1.15]">
                        {blog.title}
                    </h1>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-zinc-200 dark:border-zinc-800/60">
                        <div>
                            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">
                                Published
                            </p>
                            <p className="text-xs font-medium flex items-center gap-1.5 italic">
                                <CalendarDays
                                    size={12}
                                    className="text-zinc-400"
                                />
                                {new Date(blog.createdAt).toLocaleDateString(
                                    "en-GB",
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">
                                Status
                            </p>
                            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 capitalize">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                {blog.status.toLowerCase()}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">
                                Engagement
                            </p>
                            <p className="text-xs font-medium flex items-center gap-1.5 uppercase font-mono tracking-tighter">
                                <BarChart3
                                    size={12}
                                    className="text-zinc-400"
                                />
                                {blog.views}{" "}
                                <span className="text-zinc-400">pts</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">
                                Author
                            </p>
                            <p className="text-xs font-medium truncate max-w-[100px] text-zinc-600 dark:text-zinc-400">
                                @{blog.authorId.substring(0, 8)}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Main Body */}
                <section className="relative">
                    {/* Abstract/Intro */}
                    <div className="absolute -left-12 top-0 h-full width: 1px bg-zinc-200 dark:bg-zinc-800 hidden xl:block" />

                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-300 font-medium mb-10 border-l-4 border-indigo-500 pl-6 italic">
                            {/* Shortened preview of content or a manual summary if you had one */}
                            {blog.content.substring(0, 150)}...
                        </p>

                        <div className="text-lg leading-[1.8] text-zinc-700 dark:text-zinc-300 space-y-6 whitespace-pre-wrap font-normal">
                            {blog.content}
                        </div>
                    </div>
                </section>

                {/* Footer Metadata */}
                <footer className="mt-24 pt-10 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 underline decoration-indigo-500 underline-offset-4">
                                Revision History
                            </p>
                            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                                Updated at:{" "}
                                {new Date(blog.upDatedAt).toLocaleString()}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            {blog.tags.length > 0 ? (
                                blog.tags.map((t: string) => (
                                    <span
                                        key={t}
                                        className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 text-[10px] font-bold rounded"
                                    >
                                        #{t}
                                    </span>
                                ))
                            ) : (
                                <span className="text-[10px] text-zinc-400 font-mono italic">
                                    no_tags_specified
                                </span>
                            )}
                        </div>
                    </div>
                </footer>
            </article>
        </main>
    );
};

export default BlogDetails;
