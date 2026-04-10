import CreateBlogPage from "@/components/user/createBlog/createBlogFromBrowser";
import CreateBlogFromServer from "@/components/user/createBlog/createBlogFromServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

const page = async () => {
    const { data } = await blogService.getBlogs({}, { cache: "no-store" });

    return (
        <div className="flex gap-x-5">
            <div className="flex-1">
                <CreateBlogPage />
                {/* <CreateBlogFromServer /> */}
            </div>
            {/* <div>
                {data.allPost.length > 0 &&
                    data.allPost.map((b: BlogPost) => (
                        <p key={b.id}>{b.title}</p>
                    ))}
                )
            </div> */}
        </div>
    );
};

export default page;
