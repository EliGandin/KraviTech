import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

import { useLogin } from "@/hooks/users/useLogin.ts";
import { LoginSchema } from "@/schemas/LoginSchema.ts";
import { loginResolver } from "@/resolvers/loginResolver.ts";

const Login = () => {
  const { mutate } = useLogin();

  const form = useForm<z.infer<typeof LoginSchema>>(loginResolver);

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    mutate(data);
  }

  return (
    <Card className="mx-auto mt-6 max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Input id="email" placeholder="m@example.com" {...field} />
              )}
            />

            {form.formState.errors.email && (
              <p className="text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Controller
              name="password"
              control={form.control}
              render={({ field }) => (
                <Input placeholder="Password" type="password" {...field} />
              )}
            />

            {form.formState.errors.password && (
              <p className="text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>

          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
