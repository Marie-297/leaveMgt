// pages/events.tsx
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma"; // Adjust this path to your prisma setup
import UserEventsTable from "./UserEvent";
import { Events, User } from "@prisma/client";
import { getCurrentUser } from "@/lib/session";

type EventsPageProps = {
  events: Events[];
  user: User;
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
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // Fetch events associated with the logged-in user's email
  const events = await prisma.events.findMany({
    where: {
      id:  session.user.email
    },
  });

  return {
    props: {
      events,
      user,
    },
  };
};

const EventsPage = ({ events, user }: EventsPageProps) => {
  return (
    <div>
      <UserEventsTable events={events} user={user} />
    </div>
  );
};

export default EventsPage;
