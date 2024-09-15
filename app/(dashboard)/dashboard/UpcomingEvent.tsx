import React from "react";
import EventPopOver from "./EventPop";
import { Events } from "@prisma/client";
import ShowEvent from "./ShowEvent";

type UpcomingEventProps = {
  events: Events[];
};

export default function UpcomingEvent({ events }: UpcomingEventProps) {
  return (
    <div className="p-4 max-h-[74vh] overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Upcoming Events</h1>
      {events.length > 0 ? (
        <div className="space-y-4 w-full">
          {events.map((event, index) => (
            <>
              <div className=" flex flex-col w-full p-2  text-xs">
                <ShowEvent key={index} event={event} date={new Date(event.startDate)} />
              </div>
            </>
          ))}
        </div>
      ) : (
        <h3 className="text-lg">No Upcoming Events</h3>
      )}
    </div>
  );
}
