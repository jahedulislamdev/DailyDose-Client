import { env } from "@/env";

const app_url = env.API_URL;
interface BlogService {
    cache?: RequestCache;
    revalidate?: number;
}
interface GetBlogParams {
    isFeatured: boolean;
    search: string;
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
            const res = await fetch(url.toString(), config);
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    return data;
                }
            }
        } catch (err) {
            return { data: null, err: "Failed to Fetch Blogs" };
        }
    },
};
