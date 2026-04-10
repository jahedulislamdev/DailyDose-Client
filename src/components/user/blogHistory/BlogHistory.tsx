import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";
import { Star, Eye } from "lucide-react"; // Optional: adds a nice touch

const BlogHistory = ({ posts }: { posts: BlogPost[] }) => {
    return (
        <div className="rounded-md border bg-card overflow-auto w-244">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-25 font-bold">ID</TableHead>
                        <TableHead className="max-w-75">Title</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead className="text-right">Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="h-24 text-center text-muted-foreground w-full font-medium"
                            >
                                No posts found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        posts.map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-muted/40 transition-colors"
                            >
                                <TableCell className="font-mono text-xs text-muted-foreground">
                                    #{(item.id as string).split("-")[0]}
                                </TableCell>
                                <TableCell className="font-medium text-foreground">
                                    {item.title}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Eye className="h-4 w-4" />
                                        {item.views.toLocaleString()}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {item.isFeatured ? (
                                        <Badge
                                            variant="secondary"
                                            className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 gap-1"
                                        >
                                            <Star className="h-3 w-3 fill-current" />
                                            Featured
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="text-muted-foreground"
                                        >
                                            Standard
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className=" ">
                                        {item.tags?.map((t) => (
                                            <Badge
                                                key={t}
                                                variant="outline"
                                                className="text-[10px] font-normal uppercase tracking-wider"
                                            >
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.createdAt ? (
                                        <div className="flex flex-col">
                                            <span className="text-foreground">
                                                {new Intl.DateTimeFormat(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    },
                                                ).format(
                                                    new Date(item.createdAt),
                                                )}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                                                {new Intl.DateTimeFormat(
                                                    "en-US",
                                                    {
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    },
                                                ).format(
                                                    new Date(item.createdAt),
                                                )}
                                            </span>
                                        </div>
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="text-muted-foreground font-normal"
                                        >
                                            Draft
                                        </Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default BlogHistory;
