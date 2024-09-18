"use client"; 

import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  eventId: string;
  onDelete: (eventId: string) => void;
};

const DeleteButton = ({ eventId, onDelete }: DeleteButtonProps) => {
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
