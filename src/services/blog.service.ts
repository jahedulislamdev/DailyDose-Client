import { env } from "@/env";

const app_url = env.API_URL;
interface BlogService {
    cache?: RequestCache;
    revalidate?: number;
}
interface GetBlogParams {
    isFeatured?: boolean;
    search?: string;
    page?: string;
    limit?: string;
}
export interface CreateBlog {
    title: string;
    content: string;
    tags: string[];
}
export const blogService = {
    getBlogs: async (params?: GetBlogParams, options?: BlogService) => {
        try {
            const url = new URL(`${app_url}/api/v1/posts`);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value);
                    }
                });
            }
            const config: RequestInit = {};
            if (options?.cache) {
                config.cache = options.cache;
            }
            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }
            config.next = { ...config.next, tags: ["blogservice"] };
            const res = await fetch(url.toString(), config);
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    return data;
                }
            }
        } catch (err) {
            return { err: err };
        }
    },
    getBlogById: async (id: string) => {
        try {
            const res = await fetch(`${app_url}/api/v1/posts/${id}`);
            const data = res.json();
            return data;
        } catch (err) {
            return { data: null, error: err };
        }
    },
    createBlog: async (BlogData: CreateBlog) => {
        try {
            const res = await fetch(`${app_url}/api/v1/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json ",
                },
                body: JSON.stringify(BlogData),
            });
            const data = await res.json();
            if (data.error) {
                return {
                    data: null,
                    error: { message: data.error || "post creation failed" },
                };
            }
            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: err };
        }
    },
};
