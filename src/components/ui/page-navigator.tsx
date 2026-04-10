"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationMeta {
    limit: number;
    page: number;
    totalPage: number;
    totalPost: number;
}

export function PageNavigator({ meta }: { meta: PaginationMeta }) {
    const { limit: pageSize, page: currentPage, totalPage, totalPost } = meta;
    const searchParams = useSearchParams();
    const router = useRouter();

    const navigateToPage = (page: number) => {
        if (page < 1 || page > totalPage) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalPost);

    // Logic to generate page numbers with ellipses
    const getPageNumbers = () => {
        const pages = [];
        const showMax = 3; // Number of pages to show around current page

        if (totalPage <= 5) {
            for (let i = 1; i <= totalPage; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > showMax) pages.push("ellipsis");

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPage - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (currentPage < totalPage - (showMax - 1)) pages.push("ellipsis");
            if (!pages.includes(totalPage)) pages.push(totalPage);
        }
        return pages;
    };

    return (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            {/* Result Count Section */}
            <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">{start}</span> to{" "}
                <span className="font-medium text-foreground">{end}</span> of{" "}
                <span className="font-medium text-foreground">{totalPost}</span>{" "}
                results
            </div>

            <Pagination className="w-auto mx-0">
                <PaginationContent className="gap-1">
                    {/* Previous Button */}
                    <PaginationItem>
                        <PaginationPrevious
                            className={`h-9 px-3 transition-all hover:bg-secondary ${
                                currentPage <= 1
                                    ? "pointer-events-none opacity-40"
                                    : "cursor-pointer"
                            }`}
                            onClick={() => navigateToPage(currentPage - 1)}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {getPageNumbers().map((p, idx) => (
                        <PaginationItem key={idx}>
                            {p === "ellipsis" ? (
                                <PaginationEllipsis className="text-muted-foreground" />
                            ) : (
                                <PaginationLink
                                    className={`h-9 w-9 cursor-pointer transition-all ${
                                        currentPage === p
                                    }`}
                                    isActive={currentPage === p}
                                    onClick={() => navigateToPage(p as number)}
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* Next Button */}
                    <PaginationItem>
                        <PaginationNext
                            className={`h-9 px-3 transition-all hover:bg-secondary ${
                                currentPage >= totalPage
                                    ? "pointer-events-none opacity-40"
                                    : "cursor-pointer"
                            }`}
                            onClick={() => navigateToPage(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
