import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import { ChatBotProvider } from "@/context/chatbot-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { LoginModal } from "@/components/login-modal";
import { SignupModal } from "@/components/signup-modal";
import { ChatBotButton } from "@/components/chat-bot-button";
import { ChatBotModal } from "@/components/chat-bot-modal";
import { ReportIssueModal } from "@/components/report-issue-modal";
import { AOSProvider } from "@/components/aos-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beati Cafe - Where Every Sip Tells a Story",
  description:
    "Experience the perfect blend of comfort and quality at Beati Cafe. From artisan coffee to freshly baked pastries, we craft every moment with care.",
  keywords: [
    "cafe",
    "coffee",
    "pastries",
    "restaurant",
    "San Francisco",
    "specialty coffee",
  ],
  authors: [{ name: "Beati Cafe" }],
  openGraph: {
    title: "Beati Cafe - Where Every Sip Tells a Story",
    description:
      "Experience the perfect blend of comfort and quality at Beati Cafe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <AOSProvider>
          <ToastProvider>
            <AuthProvider>
              <CartProvider>
                <ChatBotProvider>
                  <Navbar />
                  {children}
                  <Footer />
                  <CartDrawer />
                  <LoginModal />
                  <SignupModal />
                  <ChatBotButton />
                  <ChatBotModal />
                  <ReportIssueModal />
                </ChatBotProvider>
              </CartProvider>
            </AuthProvider>
          </ToastProvider>
        </AOSProvider>
      </body>
    </html>
  );
}
