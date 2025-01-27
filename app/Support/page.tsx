"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


const SupportPage = () => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      setEmail(session.user.email); // Set email from session
    }
  }, [status, session]);
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending message:", message, "From email:", email);
    setIsSending(true);
    setFeedback("");
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, email }),
      });
      if (response.ok) {
        setFeedback("Your message has been sent. We'll get back to you soon!");
        setMessage("");
        setEmail("");
      } else {
        setFeedback("There was an issue sending your message. Please try again.");
      }
    } catch (error) {
      setFeedback("An error occurred. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6">
      <div className="p-6 max-w-lg mx-auto h-full flex justify-center align-center flex-col">
        <h1 className="text-4xl lg:text-4xl font-bold mb-4 text-center">Leave Support</h1>
        <p className="mb-6">
          If you have questions or need assistance with your leave, please reach out to us below.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue here..."
            className="border border-gray-300 p-3 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-slate-950 text-white py-2 px-4 rounded-md hover:bg-slate-400 hover:text-slate-950 hover:font-semibold"
            disabled={isSending}
          >
          {isSending ? "Sending..." : "Submit Support Request"}
          </button>
        </form>
        {feedback && (
          <div className="mt-4 text-center text-lg">
            <p className="text-red-950">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default SupportPage;
