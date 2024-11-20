import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import { MentiSignupFormSchema } from "@/schemas/MentiSignupFormSchema.ts";
import { mentiSignupResolver } from "@/resolvers/mentiSignupResolver.ts";
import { useMentiSignup } from "@/hooks/users/useMentiSignup.ts";
import { mentiSignupMapper } from "@/utils/mappers/mentiSignupMapper.ts";

const SignupMenti = () => {
  const { mutate } = useMentiSignup();
  const form =
    useForm<z.infer<typeof MentiSignupFormSchema>>(mentiSignupResolver);

  function onSubmit(data: z.infer<typeof MentiSignupFormSchema>) {
    mutate(mentiSignupMapper(data));
  }

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Menti Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label>Full name</Label>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <Input placeholder="Israel Israeli" {...field} />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="m@example.com" {...field} />
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label>Phone Number</Label>
              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="054545445" {...field} />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Password</Label>
              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <Input type="password" placeholder="Password" {...field} />
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <Label>Education</Label>
            <Controller
              name="education"
              control={form.control}
              render={({ field }) => (
                <Input placeholder="Tel Aviv University" {...field} />
              )}
            />
          </div>

          <div>
            <Label>Experience</Label>
            <Controller
              name="experience"
              control={form.control}
              render={({ field }) => (
                <Textarea placeholder="What is your experience" {...field} />
              )}
            />
            <p className="ml-2">any experience, what so ever</p>
          </div>

          <div>
            <Label>Goals</Label>
            <Controller
              name="goals"
              control={form.control}
              render={({ field }) => (
                <Textarea placeholder="What you need help with" {...field} />
              )}
            />
            <p className="ml-2">Could be resume build, networking...</p>
          </div>

          <div>
            <Label>Comments</Label>
            <Controller
              name="comments"
              control={form.control}
              render={({ field }) => (
                <Textarea
                  placeholder="Anything we need to know about you?"
                  {...field}
                />
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupMenti;
