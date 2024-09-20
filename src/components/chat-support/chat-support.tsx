"use client";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/lib/providers/socket-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";

interface Message {
  message: string;
  sender: string;
}

export default function ChatRoom({ roomId }: { roomId: string }) {
  const { socket } = useSocket();
  const { user } = useSupabaseUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Join the chat room and fetch chat history when the component is mounted
  useEffect(() => {
    if (socket && roomId) {
      console.log(`🔗 [Socket client side] Connecting to room: ${roomId}`);
      socket.emit("join-room", roomId);

      // Fetch chat history (last 50 messages or more from Redis)
      socket.on("chat-history", (chatHistory: Message[]) => {
        console.log(`📜 [Chat History client side] Received ${chatHistory.length} messages`);
        setMessages(chatHistory);
      });

      // Listen for new messages
      socket.on("receive-message", (message: string, sender: string | undefined) => {
        console.log(`📩 [New Message client side] Received from ${sender}: ${message}`);
        setMessages((prevMessages) => [
          ...prevMessages,
          { message, sender: sender || "Unknown" },
        ]);
      });
    }

    // Cleanup when component unmounts
    return () => {
      if (socket) {
        console.log("🔌 [Socket] Disconnecting from room");
        socket.off("receive-message");
        socket.off("chat-history");
      }
    };
  }, [socket, roomId]);

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    console.log(`✉️ [Sending Message from client side] ${input} from ${user.email} to room ${roomId}`);

    // Send message to the server
    socket.emit("send-message", input, roomId, user.email);

    console.log("📤 [Message Sent from client side] Emitting message to room");

    // Update local message state
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: input, sender: user.email || "Unknown" },
    ]);
    setInput("");
    setIsGenerating(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    console.log("✏️ [Input Changed] ", e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("⏎ [Enter Pressed] Submitting message");
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <ExpandableChat size="md" position="bottom-right">
      <ExpandableChatHeader className="bg-muted/60 flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Chat Room</h1>
        <p>Chat with other collaborators in this workspace</p>
        <div className="flex gap-2 items-center pt-2">
          <Button variant="secondary" onClick={() => setMessages([])}>
            New Chat
          </Button>
          <Button variant="secondary">See FAQ</Button>
        </div>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList className="bg-muted/25" ref={messagesRef}>
          {/* Initial message */}
          <ChatBubble variant="received">
            <ChatBubbleAvatar src="" fallback="👋" />
            <ChatBubbleMessage>
              Welcome to the chat room! Start sending messages to collaborate.
            </ChatBubbleMessage>
          </ChatBubble>

          {/* Chat messages */}
          {messages &&
            messages.map((message, index) => (
              <ChatBubble
                key={index}
                variant={message.sender === user?.email ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  src=""
                  fallback={message.sender === user?.email ? "👨🏽" : "👤"}
                />
                <ChatBubbleMessage
                  variant={message.sender === user?.email ? "sent" : "received"}
                >
                  {message.message}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

          {/* Loading indicator */}
          {isGenerating && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar src="" fallback="💬" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter className="bg-muted/25">
        <form ref={formRef} className="flex relative gap-2" onSubmit={handleSubmit}>
          <ChatInput
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            className="min-h-12 bg-background shadow-none"
          />
          <Button
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            type="submit"
            size="icon"
            disabled={!input}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
