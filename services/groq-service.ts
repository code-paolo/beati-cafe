import { cafeKnowledgeBase } from "./cafe-knowledge-base";

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqChatRequest {
  messages: GroqMessage[];
  model: string;
  temperature?: number;
  max_tokens?: number;
}

interface GroqChatResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export const groqService = {
  async sendMessage(messages: GroqMessage[]): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("Groq API key is not configured");
    }

    const requestBody: GroqChatRequest = {
      messages,
      model: GROQ_MODEL,
      temperature: 0.7,
      max_tokens: 1000,
    };

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`);
      }

      const data: GroqChatResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling Groq API:", error);
      throw error;
    }
  },

  createSystemPrompt(): GroqMessage {
    const kb = cafeKnowledgeBase;

    return {
      role: "system",
      content: `You are Bea, a friendly AI assistant for Beati Cafe - a modern, cozy cafe serving specialty coffee, tea, pastries, and light meals.

LOCATION & HOURS:
📍 ${kb.contact.address}
📞 ${kb.contact.phone}
✉️ ${kb.contact.email}
🕐 Mon-Fri: 7AM-8PM | Sat-Sun: 8AM-9PM

MENU HIGHLIGHTS:
☕ Coffee ($3.50-$7.50): Classic Espresso, Cappuccino, Americano, Flat White, Mocha, Caramel Latte
🧊 Frappes ($6.00-$7.00): Caramel, Mocha, Vanilla, Matcha, Cookies & Cream
🍵 Tea ($3.00-$6.75): Matcha Latte, Chamomile
🥐 Pastries ($3.00-$5.00): Croissant, Blueberry Muffin, Cinnamon Roll, Cookies, Banana Cake
🍽️ Food ($4.50-$9.50): Avocado Toast, Breakfast Sandwich, Chicken Poppers, Fries, Club Sandwich, Caesar Salad

DIETARY OPTIONS:
🌱 Vegan: All drinks with oat/almond/soy milk, Avocado Toast (no feta), Fries
🌾 Gluten-Free: All coffee & tea drinks
🥗 Vegetarian: Most items available

POPULAR COMBOS:
• Morning: Espresso + Croissant, Cappuccino + Blueberry Muffin
• Afternoon: Caramel Latte + Cinnamon Roll, Any Frappe
• Study/Work: Americano, Flat White, Matcha Latte

FEATURED ITEMS ⭐: Classic Espresso, Cappuccino, Caramel Frappe, Matcha Latte, Cinnamon Roll

QUICK FACTS:
• Free WiFi, comfy seating
• Fresh pastries baked daily
• Premium Arabica beans
• Catering available: ${kb.contact.email}

RESPONSE STYLE:
✓ Be warm, concise (2-3 sentences)
✓ Use specific items & prices
✓ Only answer Beati Cafe questions
✓ Politely redirect off-topic: "Would you like to know about our menu instead?"
✓ After 2-3 questions, ask: "Anything else I can help with?"
✓ Warm goodbyes: "Hope to see you soon! ☕"
`,
    };
  },
};

export type { GroqMessage };
