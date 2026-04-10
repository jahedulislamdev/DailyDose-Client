"use client";
import { getBlogs } from "@/actions/blog.actions";
import { useEffect, useState } from "react";

export default function AboutPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState<null | string>(null);
    console.log({ data, error });

    useEffect(() => {
        (async () => {
            const { data, error } = await getBlogs();
            setData(data);
            setError(error);
        })();
    }, []);
    return <div>This is the about page</div>;
}
