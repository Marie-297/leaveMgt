import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function getEventsData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  try {
    const eventsData = await prisma.events.findMany({});

    return [...eventsData];
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Error fetching user info");
  }
}
export const getUserEvents = async (userEmail: string) => {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) return [];

  try {
    const userEventData = await prisma.events.findMany({
      where: {
        userEmail:loggedInUser.email, 
      },
    });
    return userEventData; // Return the filtered events
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw new Error("Error fetching user events");
  }
}