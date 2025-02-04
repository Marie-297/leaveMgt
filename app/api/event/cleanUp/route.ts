import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  try {
    const today = new Date();

    const deletedEvents = await prisma.events.deleteMany({
      where: {
        startDate: { lt: today },
      },
    });

    return NextResponse.json(
      { message: "Expired events deleted", count: deletedEvents.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting expired events:", error);
    return NextResponse.json(
      { error: "Failed to delete expired events" },
      { status: 500 }
    );
  }
}
