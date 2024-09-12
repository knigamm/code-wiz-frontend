"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginform } from "../lib/utils";

import { loginaction } from "../actions/login";
import { Loader2Icon } from "lucide-react";

type loginFormType = z.infer<typeof loginform>;

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<loginFormType>({ resolver: zodResolver(loginform) });

  const processForm: SubmitHandler<loginFormType> = async (data) => {
    const formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    await loginaction(formdata);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <form onSubmit={handleSubmit(processForm)}>
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Enter your email and password to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  {...register("email")}
                  required
                />
                {errors?.email?.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {`${errors?.email?.message}`}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              {errors?.password?.message && (
                <div className="text-red-500 text-xs mt-1">
                  {`${errors?.password?.message}`}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full flex gap-4 text-white"
              >
                {isSubmitting && (
                  <Loader2Icon className="animate-spin h-5 w-5" />
                )}
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};
export default LoginForm;
