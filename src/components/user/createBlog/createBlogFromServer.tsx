import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateBlogFromServer() {
    const API_URL = env.API_URL;
    //  console.log(API_URL);

    const cookieStore = await cookies();
    //  console.log(cookieStore);
    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    const createBlog = async (formdata: FormData) => {
        "use server";
        const title = formdata.get("title") as string;
        const content = formdata.get("content") as string;
        const tags = formdata.get("tags") as string;
        const blogData = {
            title,
            content,
            tags: tags
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t !== ""),
        };
        console.log(JSON.stringify(blogData));

        const res = await fetch(`${API_URL}/api/v1/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieHeader,
            },
            // credentials: "include",
            body: JSON.stringify(blogData),
        });
        if (res.status === 201) {
            redirect("/dashboard/create-blog?success=true");
        }
        console.log(res);
    };
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Create Page</CardTitle>
                    <CardDescription>
                        You can create your blog posts here
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="createBlog" action={createBlog}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Title</FieldLabel>
                                <Input type="text" name="title" />
                            </Field>
                            <Field>
                                <FieldLabel>Content</FieldLabel>
                                <Textarea
                                    name="content"
                                    placeholder="Write your blog content here..."
                                />
                            </Field>
                            <Field>
                                <FieldLabel>Tags</FieldLabel>
                                <Input type="text" name="tags" />
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button form="createBlog" className="w-full py-5">
                        Create Blog
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
