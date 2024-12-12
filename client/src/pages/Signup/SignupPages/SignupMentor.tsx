import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { useState } from "react";

import { MentorSignupFormSchema } from "@/schemas/signup/MentorSignupFormSchema.ts";
import { mentorSignupResolver } from "@/resolvers/signup/mentorSignupResolver.ts";
import { useMentorSignup } from "@/hooks/users/useMentorSignup.ts";
import { mentorSignupMapper } from "@/utils/mappers/signup/mentorSignupMapper.ts";

const fieldOptions = [
  {
    value: "DATA",
    label: "Data",
  },
  {
    value: "HARDWARE",
    label: "Hardware",
  },
  {
    value: "SOFTWARE",
    label: "Software",
  },
];

const experienceOptions = [
  {
    value: "HIGH",
    label: "5+ years",
  },
  {
    value: "MID",
    label: "3-5 years",
  },
  {
    value: "LOW",
    label: "1-3 years",
  },
];

const SignupMentor = () => {
  const [fieldMenuOpen, setFieldMenuOpen] = useState<boolean>(false);
  const [experienceMenuOpen, setExperienceMenuOpen] = useState<boolean>(false);
  const [fieldValue, setFieldValue] = useState<string>("");
  const [experienceValue, setExperienceValue] = useState<string>("");
  const { mutate } = useMentorSignup();

  const form =
    useForm<z.infer<typeof MentorSignupFormSchema>>(mentorSignupResolver);

  function onSubmit(data: z.infer<typeof MentorSignupFormSchema>) {
    mutate(mentorSignupMapper(data));
  }

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Mentor Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div>
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
            <div>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Position</Label>
              <Controller
                name="position"
                control={form.control}
                render={({ field }) => (
                  <Input placeholder="Full Stack Developer" {...field} />
                )}
              />
            </div>

            <div>
              <Label>Company</Label>
              <Controller
                name="company"
                control={form.control}
                render={({ field }) => <Input placeholder="Apple" {...field} />}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Field</Label>
              <Controller
                name="field"
                control={form.control}
                render={({ field }) => (
                  <Popover open={fieldMenuOpen} onOpenChange={setFieldMenuOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={fieldMenuOpen}
                        className="justify-between"
                      >
                        {fieldValue
                          ? fieldOptions.find((el) => el.value === fieldValue)
                              ?.label
                          : "Select field"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search for field" />
                        <CommandEmpty>No field found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {fieldOptions.map((el) => (
                              <CommandItem
                                key={el.value}
                                value={el.value}
                                onSelect={(currentValue) => {
                                  field.onChange(
                                    currentValue === fieldValue
                                      ? ""
                                      : currentValue,
                                  );
                                  setFieldValue(el.value);
                                  setFieldMenuOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    fieldValue === el.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {el.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            <div className="grid gap-2">
              <Label>Experience</Label>
              <Controller
                name="experience"
                control={form.control}
                render={({ field }) => (
                  <Popover
                    open={experienceMenuOpen}
                    onOpenChange={setExperienceMenuOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={experienceMenuOpen}
                        className="justify-between"
                      >
                        {experienceValue
                          ? experienceOptions.find(
                              (el) => el.value === experienceValue,
                            )?.label
                          : "Specify Experience"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandGroup>
                          <CommandList>
                            {experienceOptions.map((el) => (
                              <CommandItem
                                key={el.value}
                                value={el.value}
                                onSelect={(currentValue) => {
                                  field.onChange(
                                    currentValue === experienceValue
                                      ? ""
                                      : currentValue,
                                  );
                                  setExperienceValue(el.value);
                                  setExperienceMenuOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    experienceValue === el.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {el.label}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
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

export default SignupMentor;
