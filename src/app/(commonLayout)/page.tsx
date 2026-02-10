import { userService } from "@/services/user.service";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"; // shadcn component
import { User, ShieldCheck, ArrowRight } from "lucide-react"; // Fancy icons
import Link from "next/link";

export default async function Home() {
    const { data } = await userService.getSession();
    const user = data?.user;

    return (
        <main className="relative min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden">
            {/* Fancy Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />

            <div className="relative w-full max-w-md">
                {/* The "Fancy" Card */}
                <div className="relative group rounded-3xl border bg-card/50 backdrop-blur-xl p-1 shadow-2xl transition-all duration-500 hover:shadow-primary/5">
                    <div className="bg-card rounded-[calc(1.5rem-1px)] p-8">
                        <div className="flex flex-col items-center text-center space-y-6">
                            {/* Animated Icon Header */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative h-16 w-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
                                    <User className="h-8 w-8 text-primary" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    Welcome back
                                </h1>
                                {/* {user?.email && (
                                    <Badge variant="secondary" className="font-mono px-3 py-1">
                                        <ShieldCheck className="h-3 w-3 mr-1 text-primary" />
                                        Verified Member
                                    </Badge>
                                )} */}
                            </div>

                            <div className="w-full py-6 px-4 rounded-2xl bg-muted/50 border border-border/50">
                                {user?.email ? (
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                            Current Session
                                        </p>
                                        <p className="text-base font-medium truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">
                                        You are currently exploring as a{" "}
                                        <span className="text-foreground font-medium">
                                            Guest
                                        </span>
                                        .
                                    </p>
                                )}
                            </div>

                            <div className="w-full pt-2">
                                {user?.email ? (
                                    <Button className="w-full h-12 rounded-xl shadow-lg shadow-primary/20 transition-transform active:scale-95">
                                        Go to Dashboard
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        asChild
                                        className="w-full h-12 rounded-xl shadow-lg shadow-primary/20"
                                    >
                                        <Link href="/login">Get Started</Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom detail */}
                <p className="mt-8 text-center text-xs text-muted-foreground font-medium tracking-widest uppercase opacity-50">
                    Powered by your-app-name
                </p>
            </div>
        </main>
    );
}
