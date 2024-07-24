import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Chatwindow() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/chat")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.chat) {
          const questionsFromData = data.chat.map((q, index) => ({
            id: index + 1,
            text: q.question,
          }));
          setQuestions(data.questions);

          // Add initial message from bot
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              sender: "bot",
              text: "Hello! How can I help you today?",
            },
          ]);
        } else {
          console.error("Data structure error: 'chat' array not found in response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newUserMessage = {
        id: messages.length + 1,
        sender: "user",
        text: inputValue,
      };
      setMessages([...messages, newUserMessage]);
      setInputValue("");

      // Check if user's message matches any question
      const matchedQuestion = questions.find((q) =>
        q.question.toLowerCase().includes(inputValue.toLowerCase())
      );

      // Respond with matched answer or default message
      if (matchedQuestion) {
        const botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: matchedQuestion.answer,
        };
        setMessages([...messages, botResponse]);
      } else {
        const botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "Sorry, I couldn't find an answer to your question.",
        };
        setMessages([...messages, botResponse]);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-4 ${
              message.sender === "user" ? "justify-end" : ""
            }`}
          >
            <Avatar className="w-8 h-8 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                {message.sender.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div
              className={`rounded-lg p-3 max-w-[75%] ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p>{message.text}</p>
              {/* Render options and links if present */}
              {message.options && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.options.map((option) => (
                    <Link
                      key={option.id}
                      href="#"
                      className="bg-muted text-muted-foreground rounded-lg px-3 py-1 hover:bg-muted/80 transition-colors"
                      prefetch={false}
                    >
                      {option.text}
                    </Link>
                  ))}
                </div>
              )}
              {message.links && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.links.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      className="bg-muted text-muted-foreground rounded-lg px-3 py-1 hover:bg-muted/80 transition-colors"
                      prefetch={false}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-background p-4">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full max-w-full rounded-lg border border-muted p-3 pr-16 resize-none h-16 "
            // Adjusted width of the search bar
          />
          <Button
            type="submit"
            size="icon"
            className="absolute top-1/2 right-3 -translate-y-1/2"
            onClick={handleSendMessage}
          >
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
