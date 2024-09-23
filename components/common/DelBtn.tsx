"use client"; 

import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  eventId: string;
  onDelete: (eventId: string) => void;
  onNotificationAdd: (newNotification: Notification) => void;
};

const DeleteButton = ({ eventId, onDelete, onNotificationAdd }: DeleteButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/userEvent/${eventId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log(`Event with ID: ${eventId} deleted successfully.`); 
        onDelete(eventId);

        const notificationRes = await fetch(`/api/notification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Event Deleted",
            content: `Event with ID: ${eventId} was deleted.`,
            type: "event",
            isRead: false,
          }),
        });

        if (notificationRes.ok) {
          const newNotification = await notificationRes.json();
          onNotificationAdd(newNotification);  
        }
        router.refresh();
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button title="del" onClick={handleDelete} disabled={loading}>
      <FaRegTrashCan size={18} />
    </button>
  );
};

export default DeleteButton;
