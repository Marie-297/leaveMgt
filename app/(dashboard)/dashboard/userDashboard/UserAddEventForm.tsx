"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PiCaretUpDownBold } from "react-icons/pi";
import { BsCheckLg } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { leaveTypes } from "@/lib/data/dummy-data";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import DialogWrapper from "@/components/common/Dialog";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// type Props = {
//   user: User;
// };

const EventForm = () => {
  const [open, setOpen] = useState(false);
  
  const router = useRouter()
  
  const formSchema = z.object({
    title: z
      .string({
        required_error: "Please add a Title.",
      })
      .max(500),

    description: z.string({
      required_error: "Please add a Description.",
    }),

    startDate: z.date({
      required_error: "A start date is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate.toISOString(),
      };

      const res = await fetch("/api/userEvent", {
        method: "POST",
        body: JSON.stringify(formattedValues),
      });
 
      if (res.ok) {
        toast.success("Event Added", { duration: 4000 });
       form.reset()
        router.refresh()
        setOpen(false)
      } else {
        const errorMessage = await res.text();

        toast.error(`An error occured ${errorMessage}`, { duration: 6000 });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An Unexpected error occured");
    }
  }

  return (
    <DialogWrapper
      btnTitle="Add Event"
      title="Create Your Event"
      descr="Make sure you enter the event details correctly."
      isBtn={true}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit) } className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>Add a title to the event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  Describe briefly the Event details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Date</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "  inline-flex justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <IoCalendarOutline className=" h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto p-0 z-10 border-sold border-[1px] bg-white" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default EventForm;
