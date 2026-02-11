import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Add New User",
                url: "/dashboard/add-new-user",
            },
            {
                title: "Ban User",
                url: "/dashboard/ban-user",
            },
        ],
    },
];
