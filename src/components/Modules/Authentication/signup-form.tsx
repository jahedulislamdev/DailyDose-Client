"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    //* form schema
    const formSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.email({ message: "Invalid email address" }),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });

    //* Login with google handler
    const handleLoginWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000",
        });
    };
    //* tanstack form implementation with shadcn
    const form = useForm({
        defaultValues: {
            email: "",
            name: "",
            password: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating User..");
            try {
                const { data, error } = await authClient.signUp.email(value);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }
                toast.success("User Created Successfully!", { id: toastId });
            } catch (err) {
                toast.error("Something went wrong, Please try again.", {
                    id: toastId,
                });
            }
        },
    });
    return (
        <div
            className={cn(
                "flex flex-col gap-8 w-full max-w-md mx-auto ",
                className,
            )}
            {...props}
        >
            <Card className="border-muted/50 shadow-2xl   backdrop-blur-sm overflow-hidden">
                <div className="flex flex-col items-center gap-4 py-6">
                    {/* Brand Identity */}
                    <div className="flex items-center gap-2.5 transition-opacity hover:opacity-80 cursor-default">
                        <div className="relative">
                            {/* Subtle glow effect behind the logo */}
                            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
                            <img
                                src="https://i.pinimg.com/736x/0f/f1/aa/0ff1aaf838df1a77c702071b5eb2eedf.jpg"
                                alt="DailyDose Logo"
                                className="relative w-9 h-9 rounded-xl object-cover shadow-sm border border-muted/20"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Create Your Account
                        </span>
                    </div>
                </div>
                <CardContent className="px-8">
                    <form
                        id="signupForm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        <div className="grid gap-4">
                            {/* Name Field */}
                            <form.Field
                                name="name"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <div className="space-y-1.5">
                                            <FieldLabel
                                                className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80"
                                                htmlFor={field.name}
                                            >
                                                Full Name
                                            </FieldLabel>
                                            <Input
                                                placeholder="John Doe"
                                                id={field.name}
                                                className={cn(
                                                    "h-10 bg-background/50 transition-all focus:ring-2 focus:ring-primary/20",
                                                    isInvalid &&
                                                        "border-destructive focus:ring-destructive/20",
                                                )}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </div>
                                    );
                                }}
                            />

                            {/* Email Field */}
                            <form.Field
                                name="email"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <div className="space-y-1.5">
                                            <FieldLabel
                                                className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80"
                                                htmlFor={field.name}
                                            >
                                                Email Address
                                            </FieldLabel>
                                            <Input
                                                type="email"
                                                placeholder="name@example.com"
                                                id={field.name}
                                                className={cn(
                                                    "h-10 bg-background/50 transition-all focus:ring-2 focus:ring-primary/20",
                                                    isInvalid &&
                                                        "border-destructive focus:ring-destructive/20",
                                                )}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </div>
                                    );
                                }}
                            />

                            {/* Password Field */}
                            <form.Field
                                name="password"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <div className="space-y-1.5">
                                            <FieldLabel
                                                className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80"
                                                htmlFor={field.name}
                                            >
                                                Password
                                            </FieldLabel>
                                            <Input
                                                type="password"
                                                id={field.name}
                                                placeholder="••••••••"
                                                className={cn(
                                                    "h-10 bg-background/50 transition-all focus:ring-2 focus:ring-primary/20",
                                                    isInvalid &&
                                                        "border-destructive focus:ring-destructive/20",
                                                )}
                                                value={field.state.value}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </div>
                                    );
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-4 pt-4">
                            <Button
                                className="w-full h-11 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
                                type="submit"
                            >
                                Create
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-muted/60" />
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase">
                                    <span className="bg-card px-3 text-muted-foreground tracking-widest font-medium">
                                        Or
                                    </span>
                                </div>
                            </div>

                            <Button
                                onClick={() => handleLoginWithGoogle()}
                                variant="outline"
                                type="button"
                                className="w-full h-11 bg-background/50 hover:bg-muted/50 transition-colors border-muted-foreground/20"
                            >
                                <FcGoogle className="mr-2 h-4 w-4" />
                                Continue with Google
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="bg-muted/20 border-t border-muted/50 py-6 justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="text-primary font-medium hover:text-primary/80 transition-colors underline-offset-4"
                        >
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>

            <p className="px-6 text-center text-[11px] leading-relaxed text-muted-foreground/70">
                By clicking continue, you agree to our{" "}
                <a
                    href="#"
                    className="hover:text-primary underline underline-offset-2 transition-colors"
                >
                    Terms of Service
                </a>{" "}
                and{" "}
                <a
                    href="#"
                    className="hover:text-primary underline underline-offset-2 transition-colors"
                >
                    Privacy Policy
                </a>
                .
            </p>
        </div>
    );
}
