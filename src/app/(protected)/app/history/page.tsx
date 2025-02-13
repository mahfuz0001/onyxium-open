"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

type Message = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export default function History() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) console.error("Error fetching messages:", error);
      else setMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-5 md:w-1/2 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Message History</h2>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <p className="text-lg">No messages found.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="p-4 bg-white rounded-lg shadow-md mb-4"
            >
              <p className="text-sm text-gray-700">{message.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(message.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
