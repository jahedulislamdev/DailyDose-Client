"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export function SigninForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    //* form schema
    const formSchema = z.object({
        email: z.email({ message: "Valid email is required" }),
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
            password: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Logging In..");
            try {
                const { data, error } = await authClient.signIn.email(value);
                if (error) {
                    toast.error(error.message, { id: toastId });
                    return;
                }
                toast.success("Login Successfully!", { id: toastId });
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
            <Card className="border-muted/50 shadow-2xl backdrop-blur-sm overflow-hidden">
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
                            Login
                        </span>
                    </div>
                </div>
                <CardContent className="px-8">
                    <form
                        id="signinForm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        <div className="grid gap-4">
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
                                Login
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
                                Login with Google
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="bg-muted/20 border-t border-muted/50 py-6 justify-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-primary font-medium hover:text-primary/80 transition-colors underline-offset-4"
                        >
                            Create New
                        </Link>
                    </p>
                </CardFooter>
            </Card>

            <p className="px-6 text-center text-[11px] leading-relaxed text-muted-foreground/70">
                By clicking continue, you agree to our
                <a
                    href="#"
                    className="hover:text-primary underline underline-offset-2 transition-colors"
                >
                    Terms of Service
                </a>
                and
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

// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import {
//     Field,
//     FieldDescription,
//     FieldGroup,
//     FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";

// export function Signin({ className, ...props }: React.ComponentProps<"div">) {
//     const handleLoginWithGoogle = async () => {
//         await authClient.signIn.social({
//             provider: "google",
//             callbackURL: "http://localhost:3000",
//         });
//     };
//     const session = authClient.useSession();
//     console.log(session);

//     return (
//         <div className={cn("flex flex-col gap-6", className)} {...props}>
//             <Card className="border-none shadow-lg sm:border sm:shadow-sm">
//                 <CardHeader className="space-y-1 text-center">
//                     <CardTitle className="text-2xl font-bold tracking-tight">
//                         Welcome back
//                     </CardTitle>
//                     <CardDescription>
//                         Enter your credentials to access your account
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form
//                         onSubmit={(e) => e.preventDefault()}
//                         className="grid gap-4"
//                     >
//                         {/* Social Login Section */}
//                         <Button
//                             onClick={() => handleLoginWithGoogle()}
//                             variant="outline"
//                             type="button"
//                             className="w-full"
//                         >
//                             Continue with Google
//                         </Button>

//                         <div className="relative my-2">
//                             <div className="absolute inset-0 flex items-center">
//                                 <span className="w-full border-t" />
//                             </div>
//                             <div className="relative flex justify-center text-xs uppercase">
//                                 <span className="bg-background px-2 text-muted-foreground">
//                                     Or continue with email
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Form Fields */}
//                         <div className="grid gap-4">
//                             <Field className="grid gap-2">
//                                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="name@example.com"
//                                     required
//                                     className="h-10"
//                                 />
//                             </Field>
//                             <div className="grid gap-2">
//                                 <div className="flex items-center justify-between">
//                                     <FieldLabel htmlFor="password">
//                                         Password
//                                     </FieldLabel>
//                                     <a
//                                         href="#"
//                                         className="text-xs text-primary hover:underline underline-offset-4"
//                                     >
//                                         Forgot password?
//                                     </a>
//                                 </div>
//                                 <Input
//                                     id="password"
//                                     type="password"
//                                     required
//                                     className="h-10"
//                                 />
//                             </div>
//                             <Button type="submit" className="w-full h-10 mt-2">
//                                 Sign In
//                             </Button>
//                         </div>

//                         <p className="text-center text-sm text-muted-foreground mt-2">
//                             Don&apos;t have an account?{" "}
//                             <Link
//                                 href="/signup"
//                                 className="font-medium text-primary hover:underline underline-offset-4"
//                             >
//                                 Create an account
//                             </Link>
//                         </p>
//                     </form>
//                 </CardContent>
//             </Card>

//             <p className="px-8 text-center text-xs text-muted-foreground">
//                 By clicking continue, you agree to our{" "}
//                 <a
//                     href="/terms"
//                     className="underline underline-offset-4 hover:text-primary"
//                 >
//                     Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a
//                     href="/privacy"
//                     className="underline underline-offset-4 hover:text-primary"
//                 >
//                     Privacy Policy
//                 </a>
//                 .
//             </p>
//         </div>
//     );
// }
