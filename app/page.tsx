"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SendIcon,
  FileChartLine,
  CalendarDays,
  TrendingUp,
  House,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";

import { sendMessageToChatbot } from "./actions/chat";

import { Ellipsis } from "lucide-react";
// {
//   sender: "bot",
//   message: "Hello, how can I assist you today?",
// },

export default function Home() {
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (prompt: string) => {
    const searchValue = prompt || inputValue.trim();
    console.log(searchValue);
    if (!searchValue) return;

    setIsLoading(true);
    const newMessages = [...messages, { sender: "user", message: searchValue }];
    setMessages(newMessages);

    setInputValue("");

    const { answer } = await sendMessageToChatbot(searchValue);

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
      handleSearch("");
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-white w-full mx-auto p-10">
      <div className="flex flex-col w-full overflow-y-auto mx-auto p-4 mt-7 space-y-4">
        {messages.length === 0 && (
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto py-8 px-4 sm:px-6">
              <div className="grid gap-6">
                <div className="rounded-lg bg-transparent p-6">
                  <h2 className="text-4xl font-bold">
                    Hello, how can I assist you today?
                  </h2>
                  <p className="text-lg mt-2 text-muted-foreground">
                    I&apos;m an AI assistant created by Acme to help you with a
                    variety of tasks. Please let me know how I can be of
                    assistance.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Card
                    onClick={() => {
                      handleSearch(
                        "Can you give me details about the company's leave policy?"
                      );
                    }}
                    className="flex flex-col items-start justify-center gap-2  bg-white rounded-lg p-4 text-center duration-75 hover:bg-cardhover"
                  >
                    <div className="bg-primary rounded-full p-2 mr-4">
                      <CalendarDays className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-left text-lg">Leave Policy</div>
                      <div className="text-left text-sm text-muted-foreground">
                        Can you give me details about the company&apos;s leave
                        policy?
                      </div>
                    </div>
                  </Card>

                  <Card
                    onClick={() => {
                      handleSearch(
                        "Can you explain the company's remote work policy?"
                      );
                    }}
                    className="flex flex-col items-start justify-center gap-2 bg-card rounded-lg p-4 text-center duration-75 bg-white hover:bg-cardhover"
                  >
                    <div className="bg-primary rounded-full p-2 mr-4 ">
                      <House className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-left text-lg">
                        Remote Work Policy
                      </div>
                      <div className="text-left text-sm text-muted-foreground">
                        Can you explain the company&apos;s remote work policy?
                      </div>
                    </div>
                  </Card>

                  <Card
                    onClick={() => {
                      handleSearch(
                        "What is the company's employee promotion policy?"
                      );
                    }}
                    className="flex flex-col items-start justify-center gap-2 bg-card duration-75 rounded-lg p-4 text-center bg-white hover:bg-cardhover"
                  >
                    <div className="bg-primary rounded-full p-2 mr-4">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-left text-lg">Promotion Policy</div>
                      <div className="text-left text-sm text-muted-foreground">
                        What is the company&apos;s employee promotion policy?
                      </div>
                    </div>
                  </Card>

                  <Card className="flex flex-col items-start justify-center gap-2 duration-75 bg-card rounded-lg p-4 text-center bg-white hover:bg-cardhover">
                    <div className="bg-primary rounded-full p-2 mr-4">
                      <FileChartLine className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-left text-lg">Summarize PDF</div>
                      <div className="text-left text-sm text-muted-foreground">
                        Get a concise summary of any PDF document.
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        )}

        {messages.map((message) => {
          return message.sender === "bot" ? (
            <>
              <div
                key={message.message}
                className="flex w-[60%] flex-col gap-2 mx-auto"
              >
                <div className="text-md font-medium text-muted-foreground">
                  Assistant
                </div>
                <div className="bg-primary text-white rounded-lg px-4 py-3 max-w-[75%] self-start">
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
                <div className="text-md font-medium text-muted-foreground text-right">
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
        <Button
          className="bg-submit"
          onClick={() => {
            handleSearch("");
          }}
          size="icon"
        >
          <SendIcon className="text-white w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}
