"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { SendIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { sendMessageToChatbot } from "./actions/chat";

import { Ellipsis } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      message: "Hello, how can I assist you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!inputValue.trim()) {
      return;
    }
    setIsLoading(true);
    const newMessages = [...messages, { sender: "user", message: inputValue }];
    setMessages(newMessages);

    setInputValue("");

    const { answer } = await sendMessageToChatbot(inputValue);

    setMessages([
      ...newMessages,
      { sender: "bot", message: answer.toString() },
    ]);
    setIsLoading(false);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen w-full mx-auto p-10">
      <div className="flex flex-col w-full overflow-y-auto mx-auto p-4 space-y-4">
        {messages.map((message) => {
          return message.sender === "bot" ? (
            <>
              <div
                key={message.message}
                className="flex w-[60%] flex-col gap-2 mx-auto"
              >
                <div className="text-sm font-medium text-muted-foreground">
                  Assistant
                </div>
                <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 max-w-[75%] self-start">
                  {message.message}
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                key={message.message}
                className="flex w-[60%] flex-col gap-2 mx-auto"
              >
                <div className="text-sm font-medium text-muted-foreground text-right">
                  You
                </div>
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-3 max-w-[75%] self-end">
                  {message.message}
                </div>
              </div>
            </>
          );
        })}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="flex w-[60%] flex-col gap-2 mx-auto">
            <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 max-w-[75%] self-start">
              <Ellipsis color="white" className="h-6 w-6" />
            </div>
          </div>
        )}
      </div>
      <div className="flex w-[60%] items-center space-x-2 mx-auto">
        <Input
          id="message"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 h-10 px-4"
          autoComplete="off"
        />
        <Button onClick={handleSearch} size="icon">
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}
