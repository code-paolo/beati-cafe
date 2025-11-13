'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface ChatBotContextType {
  isChatOpen: boolean;
  isReportOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  openReport: () => void;
  closeReport: () => void;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export function ChatBotProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
    setIsReportOpen(false);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const openReport = useCallback(() => {
    setIsReportOpen(true);
    setIsChatOpen(false);
  }, []);

  const closeReport = useCallback(() => {
    setIsReportOpen(false);
  }, []);

  return (
    <ChatBotContext.Provider
      value={{
        isChatOpen,
        isReportOpen,
        openChat,
        closeChat,
        openReport,
        closeReport,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
}

export function useChatBot() {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error('useChatBot must be used within a ChatBotProvider');
  }
  return context;
}




