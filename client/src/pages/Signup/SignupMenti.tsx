import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import Swal from "sweetalert2";

import { mentiSignup } from "@/services/signupServices";

const MentiSignupFormSchema = z
  .object({
    fullName: z.string({ required_error: "Full name is required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmPassword: z.string().optional(),
    phoneNumber: z.string(),
    goals: z.string(),
    education: z.string().optional(),
    experience: z.string().optional(),
    comments: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignupMenti = () => {
  //   const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["signupMenti"],
    mutationFn: mentiSignup,
    onSuccess: () => {
      Swal.fire({
        title:
          "Your signup has been registered is now pending moderator activation",
        icon: "success",
      });
      //   navigate(`/login`); //TODO: FIX ROUTES
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const form = useForm<z.infer<typeof MentiSignupFormSchema>>({
    resolver: zodResolver(MentiSignupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  function onSubmit(data: z.infer<typeof MentiSignupFormSchema>) {
    console.log(data);
    mutate(data);
  }

  return (
    <Card className="mx-auto mt-6 w-1/2">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label>Full name</Label>
            <Controller
              name="fullName"
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
                <Textarea placeholder="What you need help with" {...field} />
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
          <Link to="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupMenti;
