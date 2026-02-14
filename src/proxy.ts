import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { roles } from "./constants/roles";

export const proxy = async (req: NextRequest) => {
    // console.log("Proxy request:", req.url);

    let isAuthenticated = false;
    let isAdmin = false;
    const { data } = await userService.getSession();
    // console.log(data);
    const pathname = req.nextUrl.pathname;

    if (data) {
        isAuthenticated = true;
        isAdmin = data.user?.role === roles.admin;
    }

    // * user is not autherticatd at all
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }
    // * user is authenticated and Admin (admin can't visit user dashboard)
    if (isAdmin && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    }
    // * user is authenticated and User (user can't visit admin sdashboard)
    if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // console.log("Pathname Form Proxy:", pathname);
    return NextResponse.next();
};

export const config = {
    matcher: ["/dashboard", "/admin-dashboard"],
};
