"use server";

import { blogService, CreateBlog } from "@/services/blog.service";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
    return await blogService.getBlogs();
};
export const createBlog = async (blogData: CreateBlog) => {
    const res = await blogService.createBlog(blogData);
    updateTag("blogService");
    return res;
};
