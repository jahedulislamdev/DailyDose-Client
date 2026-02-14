import { Plus, Edit2, Archive, Clock, Calendar } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const YourBlogs = () => {
    const myPosts = [
        {
            id: 1,
            title: "The Art of the Perfect Prompt",
            excerpt:
                "Mastering the nuance of AI communication to get the best possible results every time.",
            date: "Feb 11, 2026",
            category: "AI & Tech",
            readTime: "5 min",
            status: "published",
        },
        {
            id: 2,
            title: "Building Scalable React Apps",
            excerpt:
                "Why folder structure matters more than you think in 2026.",
            date: "Feb 09, 2026",
            category: "Development",
            readTime: "8 min",
            status: "draft",
        },
    ];

    return (
        <div className="min-h-screen bg-background p-8 lg:p-12">
            <div className="max-w-6xl mx-auto">
                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myPosts.map((post) => (
                        <Card
                            key={post.id}
                            className="group flex flex-col justify-between hover:border-primary/50 transition-colors duration-300 shadow-sm"
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start mb-4">
                                    <Badge
                                        variant={
                                            post.status === "published"
                                                ? "default"
                                                : "secondary"
                                        }
                                        className="capitalize"
                                    >
                                        {post.status}
                                    </Badge>
                                    <div className="flex text-muted-foreground text-xs gap-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />{" "}
                                            {post.date}
                                        </span>
                                    </div>
                                </div>
                                <CardTitle className="leading-snug group-hover:text-primary transition-colors">
                                    {post.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 mt-2">
                                    {post.excerpt}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <Clock className="h-3 w-3" />{" "}
                                    {post.readTime} read
                                    <span className="mx-1">•</span>
                                    <span className="font-medium text-foreground">
                                        {post.category}
                                    </span>
                                </div>
                            </CardContent>

                            <CardFooter className="gap-2 border-t pt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full flex items-center gap-2"
                                >
                                    <Edit2 className="h-3 w-3" /> Edit
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YourBlogs;
