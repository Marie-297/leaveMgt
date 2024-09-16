// pages/events.tsx
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma"; // Adjust this path to your prisma setup
import UserEventsTable from "./UserEvent";
import { Events } from "@prisma/client";

type EventsPageProps = {
  events: Events[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || !session.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Fetch events associated with the logged-in user's email
  const events = await prisma.events.findMany({
    where: {
      id:  session.user.email
    },
  });

  return {
    props: {
      events,
    },
  };
};

const EventsPage = ({ events }: EventsPageProps) => {
  return (
    <div>
      <UserEventsTable events={events} />
    </div>
  );
};

export default EventsPage;
