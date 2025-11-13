# 🤖 Beati Cafe AI Chatbot Setup

## Overview
The AI Chatbot feature includes:
- **Bea AI**: A friendly AI assistant powered by Groq's Llama 3.3 70B model
- **Report an Issue**: A form for users to report problems

## 🚀 Quick Setup

### 1. Get Your Groq API Key
1. Visit [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign up for a free account (if you don't have one)
3. Create a new API key
4. Copy the key

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```

### 3. Restart Your Development Server
```bash
npm run dev
```

## 🎯 Features

### Floating Button
- Located at the bottom-right corner of every page
- Click to reveal two options:
  - **Chat with Bea AI**: Opens the AI chatbot
  - **Report an Issue**: Opens the issue reporting form

### Chat with Bea AI
- **Facebook-style chat box** on the bottom-right corner
- Real-time conversation with AI assistant
- **6 Quick Question buttons** for instant help:
  - "What are your most popular coffee drinks?"
  - "Do you have any vegan or gluten-free options?"
  - "What time does the cafe open and close?"
  - "Where is Beati Cafe located?"
  - "What makes your coffee special?"
  - "Do you offer catering services?"
- Specialized knowledge about Beati Cafe:
  - Menu items and prices
  - Cafe location and hours
  - Product recommendations
  - General cafe information
- Natural conversation flow with warm, friendly responses
- **Minimize/maximize** the chat box without closing the conversation
- **Cannot be closed by clicking outside** - only via the X button
- Automatically suggests closing after 2-3 questions

### Report an Issue
- Form validation using Zod + react-hook-form
- Issue types:
  - Website Bug
  - Payment Issue
  - Product Information Error
  - User Account Problem
  - Other
- Success toast notification on submission
- **Cannot be closed by clicking outside** - only via Cancel or after successful submission

## 📁 Files Created

### Services
- `services/groq-service.ts`: Groq API integration

### Context
- `context/chatbot-context.tsx`: State management for modals

### Components
- `components/chat-bot-button.tsx`: Floating action button
- `components/chat-bot-modal.tsx`: AI chat interface
- `components/report-issue-modal.tsx`: Issue reporting form

## 🎨 Styling
- Matches Beati Cafe's warm, modern aesthetic
- Amber and orange gradient buttons
- Smooth animations and transitions
- Responsive design for mobile and desktop

## 🔧 Customization

### Update AI Personality
Edit the system prompt in `services/groq-service.ts`:

```typescript
createSystemPrompt(): GroqMessage {
  return {
    role: "system",
    content: `You are Bea, a helpful...`
  };
}
```

### Change AI Model
In `services/groq-service.ts`, update:

```typescript
const GROQ_MODEL = "llama-3.3-70b-versatile"; // Change to other Groq models
```

### Adjust AI Temperature
In the `sendMessage` function:

```typescript
temperature: 0.7, // 0.0 = deterministic, 1.0 = creative
```

## 🌟 Usage Tips

1. **Free Tier**: Groq offers generous free tier limits
2. **Response Time**: Typically 1-3 seconds per message
3. **Context Memory**: The chat maintains conversation history during the session
4. **Session Reset**: Conversation resets when modal is closed

## 🚨 Troubleshooting

### "Groq API key is not configured" Error
- Make sure `.env.local` exists with your API key
- Restart your dev server after adding the key
- Verify the key starts with `NEXT_PUBLIC_`

### Slow Responses
- Check your internet connection
- Verify Groq API status
- Consider using a faster model (though less capable)

### API Rate Limits
- Free tier: ~30 requests per minute
- Implement caching if needed
- Consider upgrading for production use

## 📝 Notes

- The Report Issue form currently simulates submission (no backend)
- In production, connect the form to your backend API
- Consider adding message rate limiting for production
- Store chat history in database for better context (optional)

---

**Need Help?** Contact the Beati Cafe development team! ☕



