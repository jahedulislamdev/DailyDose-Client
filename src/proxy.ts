import { NextRequest, NextResponse } from "next/server";

export const proxy = (req: NextRequest) => {
    console.log("Proxy request:", req.url);
    return NextResponse.next();
};

export const config = {
    matcher: ["/dashboard"],
};
