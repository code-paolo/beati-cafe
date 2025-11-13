"use client";

import { useState } from "react";
import { MessageCircle, X, Bot, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useChatBot } from "@/context/chatbot-context";

export function ChatBotButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openChat, openReport } = useChatBot();

  const handleChatClick = () => {
    openChat();
    setIsMenuOpen(false);
  };

  const handleReportClick = () => {
    openReport();
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-3">
      {/* Options Menu */}
      {isMenuOpen && (
        <Card className="p-2 shadow-2xl border-amber-200 bg-white/95 backdrop-blur-sm animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex flex-col gap-2 min-w-[200px]">
            <Button
              onClick={handleChatClick}
              className="w-full justify-start gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
            >
              <Bot className="w-5 h-5" />
              Chat with Bea AI
            </Button>
            <Button
              onClick={handleReportClick}
              variant="outline"
              className="w-full justify-start gap-3 border-amber-300 hover:bg-amber-50 text-gray-700"
            >
              <AlertCircle className="w-5 h-5" />
              Report an Issue
            </Button>
          </div>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
          isMenuOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
        }`}
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </Button>
    </div>
  );
}




