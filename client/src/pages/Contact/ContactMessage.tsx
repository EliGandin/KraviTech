import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { contactSchema } from "@/schemas/contactSchema.ts";
import { contactResolver } from "@/resolvers/contactResolver.ts";
import { usePostContactMessage } from "@/hooks/admin/usePostContactMessage.ts";

const ContactMessage = () => {
  const form = useForm<z.infer<typeof contactSchema>>(contactResolver);
  const { mutate } = usePostContactMessage();

  function onSubmit(data: z.infer<typeof contactSchema>) {
    mutate(data);
  }

  return (
    <Card className="shadow-lg">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader>
          <CardTitle>Send Us a Message</CardTitle>
          <CardDescription>
            Fill out the form below and we`&apos;`ll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <Input id="name" placeholder="Enter your name" {...field} />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Controller
              name="phone_number"
              control={form.control}
              render={({ field }) => (
                <Input placeholder="054545445" {...field} />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Title</Label>
            <Controller
              name="title"
              control={form.control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="Enter the title of your message"
                  {...field}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Controller
              name="message"
              control={form.control}
              render={({ field }) => (
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={4}
                  {...field}
                />
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContactMessage;
