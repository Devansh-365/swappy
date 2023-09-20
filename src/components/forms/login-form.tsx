"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email is required.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    }),
});

const AuthForm = ({ className, ...props }: AuthFormProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn("credentials", {
        email: values.email.toLowerCase(),
        password: values.password,
        redirect: false,
        callbackUrl,
      });

      router.refresh();
      router.push(`/`);

      toast.success("User logged in!");
    } catch (error) {
      console.log(error);
      toast.error("Your sign in request failed. Please try again.");
    }
  };

  return (
    <div
      className={cn("flex flex-col justify-center gap-3", className)}
      {...props}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading ? <Icons.spinner className="animate-spin mr-2" /> : null}
            Login
          </Button>
        </form>
      </Form>
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        type="button"
        onClick={async () => {
          setIsGoogleLoading(true);
          await signIn("google", {
            callbackUrl: "/",
          });
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="animate-spin mr-2" />
        ) : (
          <Icons.google className="mr-2" />
        )}
        Google
      </Button>
    </div>
  );
};

export default AuthForm;
