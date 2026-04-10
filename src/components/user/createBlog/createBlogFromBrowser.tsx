"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Type, Hash, Send, Eye, PenLine } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import { createBlog } from "@/actions/blog.actions";
import { Textarea } from "@/components/ui/textarea";

const blogSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(200, "Title must be less than 200 characters"),
    content: z
        .string()
        .min(1, "Content is required")
        .max(5000, "Content must be less than 5000 characters"),
    tags: z.string(),
});
export default function CreateBlogPage() {
    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            tags: "",
        },
        validators: {
            onSubmit: blogSchema,
        },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Publishing your Blog...");
            const blogData = {
                title: value.title,
                content: value.content,
                tags: value.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t !== ""),
            };
            try {
                const res = await createBlog(blogData);
                console.log(res);

                if (res.data.success === false) {
                    return toast.error(
                        res.data.message || "Failed to publish blog",
                        { id: toastId },
                    );
                } else {
                    toast.success("Blog published successfully!", {
                        id: toastId,
                    });
                    form.reset();
                }
            } catch (err: any) {
                toast.error(err.message, { id: toastId });
            }
        },
    });
    const [isPreview, setIsPreview] = useState(false);

    return (
        <div className="min-h-screen p-6 md:p-12 font-">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-amber-50/5 px-3 py-5 rounded-2xl">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Draft a new story
                        </h1>
                        <p className="text-muted-foreground">
                            Share your thoughts with the world.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 p-1 rounded-lg border shadow-sm">
                        <Button
                            variant={!isPreview ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setIsPreview(false)}
                        >
                            <PenLine className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <Button
                            variant={isPreview ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setIsPreview(true)}
                        >
                            <Eye className="w-4 h-4 mr-2" /> Preview
                        </Button>
                    </div>
                </div>

                {!isPreview ? (
                    <Card className="border-none shadow-xl">
                        <CardContent className="pt-6">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    form.handleSubmit();
                                }}
                                className="space-y-6"
                            >
                                <FieldGroup>
                                    {/*Blog title */}
                                    <form.Field
                                        name="title"
                                        children={(field) => {
                                            const invalid =
                                                field.state.meta.isTouched &&
                                                !field.state.meta.isValid;
                                            return (
                                                <Field>
                                                    <FieldLabel>
                                                        Title
                                                    </FieldLabel>
                                                    <Input
                                                        type="text"
                                                        id={field.name}
                                                        name={field.name}
                                                        value={
                                                            field.state.value
                                                        }
                                                        onChange={(e) => {
                                                            field.handleChange(
                                                                e.target.value,
                                                            );
                                                        }}
                                                        placeholder="Enter blog title..."
                                                    ></Input>
                                                    {invalid && (
                                                        <FieldError
                                                            errors={
                                                                field.state.meta
                                                                    .errors
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            );
                                        }}
                                    ></form.Field>
                                    {/*Blog Content */}
                                    <form.Field
                                        name="content"
                                        children={(field) => {
                                            const invalid =
                                                field.state.meta.isTouched &&
                                                !field.state.meta.isValid;
                                            return (
                                                <Field>
                                                    <FieldLabel>
                                                        Content
                                                    </FieldLabel>
                                                    <Textarea
                                                        id={field.name}
                                                        name={field.name}
                                                        value={
                                                            field.state.value
                                                        }
                                                        onChange={(e) => {
                                                            field.handleChange(
                                                                e.target.value,
                                                            );
                                                        }}
                                                        placeholder="Enter blog content..."
                                                    />
                                                    {invalid && (
                                                        <FieldError
                                                            errors={
                                                                field.state.meta
                                                                    .errors
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            );
                                        }}
                                    ></form.Field>
                                    {/*Blog Tags */}
                                    <form.Field
                                        name="tags"
                                        children={(field) => {
                                            const invalid =
                                                field.state.meta.isTouched &&
                                                !field.state.meta.isValid;
                                            return (
                                                <Field>
                                                    <FieldLabel>
                                                        Blog Tags (comma
                                                        separated)
                                                    </FieldLabel>
                                                    <Input
                                                        type="text"
                                                        id={field.name}
                                                        name={field.name}
                                                        value={
                                                            field.state.value
                                                        }
                                                        onChange={(e) => {
                                                            field.handleChange(
                                                                e.target.value,
                                                            );
                                                        }}
                                                        placeholder="Enter blog tags (e.g: technology, programming) "
                                                    ></Input>
                                                    {invalid && (
                                                        <FieldError
                                                            errors={
                                                                field.state.meta
                                                                    .errors
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            );
                                        }}
                                    ></form.Field>
                                </FieldGroup>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="px-7"
                                    >
                                        <Send className="size-5 " /> Publish
                                        Post
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    /* Simple Preview Mode */
                    <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-8 rounded-xl border shadow-sm">
                        <h1 className="text-4xl font-extrabold">
                            {form.getFieldValue("title") || "Untitled Post"}
                        </h1>
                        <hr className="my-8" />
                        <div className="whitespace-pre-wrap">
                            {form.getFieldValue("content") ||
                                "Post content will appear here..."}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
