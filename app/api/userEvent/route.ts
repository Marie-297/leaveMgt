import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type SubmittedEvent = {
  title: string;
  description: string;
  startDate: string;
};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "USER") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedEvent = await req.json();

    const { title, description, startDate, } = body;
    const newEvent = await prisma.events.create({
      data: {
        startDate,
        title,
        description,
        userEmail: loggedInUser.email,
      },
    });

    return NextResponse.json(newEvent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
