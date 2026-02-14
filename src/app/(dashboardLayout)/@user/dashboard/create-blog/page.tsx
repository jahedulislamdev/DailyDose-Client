import React from "react";
import { ArrowLeft, Eye, Globe, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const CreateBlog = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans antialiased text-zinc-900 dark:text-zinc-100">
            {/* Utility Nav */}
            <nav className="border-b px-6 py-3 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 border-l pl-4">
                        <span className="text-sm font-medium">
                            Draft in Workspace
                        </span>
                        <Badge
                            variant="secondary"
                            className="font-normal text-[10px] uppercase tracking-wider"
                        >
                            Saved
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="text-zinc-500">
                        <Eye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                    <Separator orientation="vertical" className="h-4" />
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-300 dark:border-zinc-700"
                    >
                        Save Draft
                    </Button>
                    <Button
                        size="sm"
                        className="bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
                    >
                        <Globe className="mr-2 h-4 w-4" /> Publish
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </nav>

            <main className="max-w-[850px] mx-auto pt-16 px-8">
                {/* Meta Info */}
                <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-full max-w-[200px]">
                            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5 block">
                                Category
                            </label>
                            <select className="w-full bg-transparent border-none text-sm font-medium focus:ring-0 p-0 cursor-pointer text-zinc-600 dark:text-zinc-400">
                                <option>Engineering</option>
                                <option>Product Updates</option>
                                <option>Company News</option>
                            </select>
                        </div>
                        <div className="w-full max-w-[200px]">
                            <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5 block">
                                Tags
                            </label>
                            <Input
                                className="h-auto p-0 border-none bg-transparent text-sm focus-visible:ring-0 placeholder:text-zinc-300 shadow-none"
                                placeholder="React, Tailwind..."
                            />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Post Title"
                            className="w-full text-5xl font-bold tracking-tight border-none bg-transparent focus:outline-none placeholder:text-zinc-200 dark:placeholder:text-zinc-800"
                        />

                        <Textarea
                            placeholder="Start writing..."
                            className="w-full min-h-[500px] text-xl leading-relaxed border-none bg-transparent focus-visible:ring-0 resize-none p-0 placeholder:text-zinc-300 dark:placeholder:text-zinc-800"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateBlog;
