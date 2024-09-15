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
// import { toast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { useState } from "react";

type Props = {
  user: User;
};

const RequestForm = ({ user }: Props) => {
  
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    notes: z.string().max(500),

    leave: z.string({
      required_error: "Please select a leave Type.",
    }),

    startDate: z.date({
      required_error: "A start date is required.",
    }),
    endDate: z.date({
      required_error: "An end date is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    }, 
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        user,
      };

      const res = await fetch("/api/leave", {
        method: "POST",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("Leave Submitted", { duration: 4000 });
        setOpen(false)
        form.reset()
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
      btnTitle="Apply for Leave"
      title="Submit your Leave Application"
      descr="Make sure you select the right dates for leave."
      isBtn={true}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="leave"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <DropdownMenuLabel>Leave Type</DropdownMenuLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between w-full",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? leaveTypes.find((leave) => leave.value === field.value)?.label
                        : "Select a leave"}
                      <PiCaretUpDownBold className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-[200px] bg-white/90 backdrop-blur-md border border-transparent shadow-lg rounded-lg p-2 transition-all duration-300">
                    {leaveTypes.map((leave) => (
                      <DropdownMenuItem
                        key={leave.label}
                        onSelect={() => form.setValue("leave", leave.label)}
                        className="flex justify-between mb-2"
                      >
                        <BsCheckLg
                          className={cn(
                            "mr-2 h-4 w-4",
                            leave.value === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {leave.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
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
                        <IoCalendarOutline className=" h-4 w-4" />
                      </Button>
                    </FormControl>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto p-0 bg-white z-10 border-solid border-[1px]" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>{  const today = new Date();
                        const currentYear = today.getFullYear();
                        return date < today || date.getFullYear() > currentYear;}}
                      initialFocus
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
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
                  <DropdownMenuContent className="w-auto p-0 bg-white z-10 border-solid border-[1px]" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => date < new Date()}
                      initialFocus
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Notes" {...field} />
                </FormControl>
                <FormDescription>
                  Add extra notes to support your request.
                </FormDescription>
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

export default RequestForm;
