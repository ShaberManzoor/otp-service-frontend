import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { generateOTP } from "@/app/services/otpService";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  type: z.enum(["numeric", "alphanumeric", "alphabet"]),
  organization: z.string().min(1, "Organization name is required"),
  subject: z.string().min(1, "Subject is required"),
});

export function ProfileForm({
  setGenerated,
  setEmail,
}: {
  setGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      type: "numeric",
      organization: "",
      subject: "",
    },
  });

  // 2. Define a submit handler.
  const handleGenerateOTP = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const result = await generateOTP(values);
      toast({
        description: "OTP has been sent to your email!",
      });
      setEmail(values.email);
      setGenerated(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to generate OTP.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleGenerateOTP)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@mail.com"
                  {...field}
                  className="focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-900 text-gray-100">
                  <SelectItem value="numeric" className=" hover:bg-gray-950">
                    Numeric
                  </SelectItem>
                  <SelectItem
                    value="alphanumeric"
                    className=" hover:bg-gray-950"
                  >
                    Alphanumeric
                  </SelectItem>
                  <SelectItem value="alphabet" className=" hover:bg-gray-950">
                    Alphabet
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisation</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Organization"
                  {...field}
                  className="focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Subject"
                  {...field}
                  className="focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500"
          disabled={loading}
        >
          Generate OTP
        </Button>
      </form>
    </Form>
  );
}
