# Services Directory

This directory contains service layers and utilities for the Beati Cafe application.

## 📁 Files

### `groq-service.ts`
Handles communication with the Groq API for AI chatbot functionality.

**Key Features:**
- Sends messages to Groq's Llama 3.3 70B model
- Creates system prompts with comprehensive cafe context
- Handles API errors gracefully
- Temperature: 0.7 (balanced between creativity and accuracy)
- Max tokens: 1000 per response

**Environment Variables Required:**
```env
NEXT_PUBLIC_GROQ_API_KEY=your_api_key_here
```

### `cafe-knowledge-base.ts`
Centralized knowledge base for the AI chatbot. **This is the single source of truth** for all cafe information used by Bea AI.

**Key Features:**
- Aggregates data from `app/data/products.ts`, `app/data/cafe-info.ts`, and `app/data/team.ts`
- Organized by categories: basics, contact, menu, team, features, dietary options, recommendations, price ranges, and FAQ
- Exports `generateAIContext()` function that formats data for AI consumption
- Fully typed and reusable

**Data Structure:**
```typescript
cafeKnowledgeBase = {
  basics: { name, tagline, story, mission },
  contact: { address, phone, email, hours },
  menu: { coffee, tea, pastries, food },
  featuredItems: [...],
  team: [...],
  features: { wifi, seating, atmosphere, ... },
  dietary: { vegan, glutenFree, vegetarian },
  recommendations: { morning, afternoon, studyWork, dessert },
  priceRanges: { coffee, tea, pastries, food, frappes },
  faq: { orderOnline, reservations, delivery, ... }
}
```

## 🔄 How It Works

1. **Data Source**: All product, cafe, and team data lives in `app/data/`
2. **Knowledge Base**: `cafe-knowledge-base.ts` imports and structures this data
3. **AI Context**: `generateAIContext()` creates a formatted string with all relevant info
4. **Groq Service**: Injects this context into the AI system prompt
5. **Chatbot**: Bea AI uses this context to answer customer questions accurately

## 🛠️ Updating Cafe Information

### To update menu items:
Edit `app/data/products.ts` - changes will automatically flow to the AI

### To update cafe details:
Edit `app/data/cafe-info.ts` - hours, address, phone, etc.

### To update team members:
Edit `app/data/team.ts`

### To update AI behavior or add FAQs:
Edit `services/cafe-knowledge-base.ts` - specifically the `features`, `dietary`, `recommendations`, or `faq` sections

## 📤 Exporting Knowledge Base

The knowledge base can be exported for use in other systems:

```typescript
import cafeKnowledgeBase, { generateAIContext } from '@/services/cafe-knowledge-base';

// Get structured data
const data = cafeKnowledgeBase;

// Get formatted AI context
const context = generateAIContext();
```

## 🧪 Testing Recommendations

When testing the AI chatbot, try these queries:
- "What are your most popular drinks?"
- "Do you have vegan options?"
- "What time do you open?"
- "Where are you located?"
- "What's good for studying?"
- "Tell me about your team"
- "What's your price range?"
- "Do you offer catering?"

## 🔐 Security Notes

- **Never commit `.env.local`** to version control
- The Groq API key must have `NEXT_PUBLIC_` prefix to work in the browser
- API calls are rate-limited by Groq (check your plan limits)
- Consider implementing request throttling for production

## 📝 Future Improvements

- [ ] Add caching layer for AI responses to common questions
- [ ] Implement conversation memory/history
- [ ] Add analytics to track popular questions
- [ ] Support for multiple languages
- [ ] Integration with order system (when backend is ready)
- [ ] Add seasonal menu updates to knowledge base


