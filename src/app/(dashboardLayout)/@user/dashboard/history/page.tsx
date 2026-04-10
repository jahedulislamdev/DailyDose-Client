import { PageNavigator } from "@/components/ui/page-navigator";
import BlogHistory from "@/components/user/blogHistory/BlogHistory";
import { blogService } from "@/services/blog.service";

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string; limit: string }>;
}) => {
    const { page, limit } = await searchParams;
    const { data } = await blogService.getBlogs({ page, limit });
    const blogs = data?.allPost;
    const meta = data?.pagination || {
        limit: 10,
        page: 1,
        totalPage: 0,
        totalPost: 0,
    };

    return (
        <div>
            <BlogHistory posts={blogs} />
            <PageNavigator meta={meta} />
        </div>
    );
};

export default page;
