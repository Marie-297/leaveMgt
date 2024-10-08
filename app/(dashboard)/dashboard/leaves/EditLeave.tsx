"use client";

import DialogWrapper from "@/components/common/Dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { PiCaretUpDownBold } from "react-icons/pi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BsCheckLg } from "react-icons/bs";
import { leaveStatus } from "@/lib/data/dummy-data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leave } from "@prisma/client";

type EditLeaveProps = {
  id: string;
  days: number;
  type: string;
  year: string;
  email: string;
  user: string;
  startDate: Date;
};

const EditLeave = ({
  id,
  days,
  type,
  year,
  email,
  user,
  startDate,
}: EditLeaveProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    notes: z.string().max(500),

    status: z.enum(leaveStatus),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
      status: leaveStatus[0],
    },
  });

  async function editLeave(values: z.infer<typeof formSchema>) {
    try {
      const formValues = {
        ...values,
        // notes: values.notes,
        // status: values.status,
        id,
        days,
        type,
        year,
        email,
        user,
        startDate,
      };
      console.log("Form Values:", formValues);
      
      const res = await fetch(`/api/leave/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        toast.success("Edit Successful", { duration: 4000 });
        setOpen(false);
        router.refresh();
        toast.custom(`An email has been sent to ${user}`, { duration: 4000 });
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
      btnTitle="Edit"
      title="Edit Leave"
      isBtn={true}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(editLeave)} className="space-y-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Make a Decision</FormLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        " justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? leaveStatus.find((status) => status === field.value)
                        : "Select a decision"}
                      <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px] p-0 border border-gray-300 p-2 rounded-lg">
                    {leaveStatus.map((status, i) => (
                      <DropdownMenuItem
                        key={i}
                        onSelect={() => {
                          form.setValue("status", status);
                        }}
                        className="flex justify-between bg-white"
                      >
                        <BsCheckLg
                          className={cn(
                            "mr-2 h-4 w-4",
                            status === field.value
                             ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {status}
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
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Notes" {...field} />
                </FormControl>
                <FormDescription>
                  Add extra notes to support your decision.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit"disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}</Button>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default EditLeave;
