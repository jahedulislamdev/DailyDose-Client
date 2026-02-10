import { env } from "@/env";
import { cookies } from "next/headers";
const auth_api_url = env.AUTH_URL;

export const userService = {
    getSession: async () => {
        try {
            const cookieStore = await cookies();
            // console.log(cookieStore.toString());
            const res = await fetch(`${auth_api_url}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const session = await res.json();
            // console.log(session);
            return { data: session, error: null };
        } catch (err) {
            console.log(err);
            return {
                data: null,
                error: { message: "Failed to retrieve session" },
            };
        }
    },
};
