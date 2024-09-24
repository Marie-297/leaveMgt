"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Events } from "@prisma/client";
import EventForm from "./UserAddEventForm";
import DeleteButton from "@/components/common/DelBtn";
import { useState, useCallback } from "react";
import { User } from "@prisma/client";
import { format } from "date-fns";

type UserProps = {
  events: Events[]
  user: User;
};

const UserEventsTable = ({ events: initialEvents, user }: UserProps) => {
  
  const [events, setEvents] = useState<Events[]>(initialEvents); 

  const handleDelete = (eventId: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };
  const handleEventAdded = useCallback((newEvent: Events) => {
    console.log("New event added:", newEvent);
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }, []);
  
  return (
    <div className="  rounded-lg shadow-md px-6  max-h-[50vh] overflow-y-auto bg-white dark:bg-black">
      <div className="py-5 px-10 sticky top-0 z-10 shadow-md bg-white  dark:bg-slate-900 flex justify-between items-center">
          <h2 className="text-2xl text-center font-bold tracking-tight">
           My Event List
          </h2>
          <div>
            <EventForm onEventAdded={handleEventAdded} />
          </div>
        </div>

      <div className="relative overflow-x-auto  "> 
      
     
      <Table>
        <TableHeader className="whitespace-nowrap">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead className="">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="whitespace-nowrap">
          {events.filter((event) => event.userEmail  === user.email).map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{format(new Date(event.startDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="">
                <DeleteButton eventId={event.id} onDelete={handleDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default UserEventsTable;
