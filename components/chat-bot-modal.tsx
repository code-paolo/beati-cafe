"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Loader2, X, Minimize2 } from "lucide-react";
import { useChatBot } from "@/context/chatbot-context";
import { groqService, GroqMessage } from "@/services/groq-service";
import { Card } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What are your most popular drinks?",
  "Do you have vegan or gluten-free options?",
  "What are your hours and location?",
  "What's good for studying or working?",
  "Tell me about your featured items",
  "What are your price ranges?",
];

export function ChatBotModal() {
  const { isChatOpen, closeChat } = useChatBot();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Bea, your friendly assistant at Beati Cafe. How can I help you today? ☕",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowQuickQuestions(false);

    try {
      const groqMessages: GroqMessage[] = [
        groqService.createSystemPrompt(),
        ...messages.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        {
          role: "user" as const,
          content: textToSend,
        },
      ];

      const response = await groqService.sendMessage(groqMessages);

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again or contact our team directly at hello@beaticafe.com.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  const handleClose = () => {
    closeChat();
    // Reset conversation after a delay
    setTimeout(() => {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I'm Bea, your friendly assistant at Beati Cafe. How can I help you today? ☕",
          timestamp: new Date(),
        },
      ]);
      setShowQuickQuestions(true);
      setIsMinimized(false);
    }, 300);
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[99998] w-[380px] max-w-[calc(100vw-3rem)]">
      <Card className="shadow-2xl border-amber-200 overflow-hidden bg-white flex flex-col animate-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Bea AI</div>
              <div className="text-white/80 text-xs">Online now</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => setIsMinimized(!isMinimized)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Body - Collapsible */}
        {!isMinimized && (
          <>
            {/* Messages */}
            <div
              ref={scrollRef}
              className="h-[400px] overflow-y-auto px-4 py-4 space-y-3 bg-gray-50"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white"
                        : "bg-white text-gray-900 shadow-sm border border-gray-200"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl px-3 py-2 shadow-sm border border-gray-200">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                  </div>
                </div>
              )}

              {/* Quick Questions */}
              {showQuickQuestions && messages.length === 1 && !isLoading && (
                <div className="pt-2">
                  <p className="text-xs text-gray-500 mb-2 px-1">
                    Quick questions:
                  </p>
                  <div className="space-y-2">
                    {QUICK_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="w-full text-left px-3 py-2 rounded-lg bg-white border border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-all text-xs text-gray-700 shadow-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="px-3 py-3 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 h-9 text-sm border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  size="sm"
                  className="h-9 w-9 p-0 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
