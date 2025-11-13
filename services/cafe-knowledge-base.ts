import { products } from "@/app/data/products";
import { cafeInfo } from "@/app/data/cafe-info";
import { teamMembers } from "@/app/data/team";

/**
 * Cafe Knowledge Base - Centralized data for AI chatbot
 * This file aggregates all cafe information for easy AI consumption
 */

export const cafeKnowledgeBase = {
  // Basic Information
  basics: {
    name: cafeInfo.name,
    tagline: cafeInfo.tagline,
    story: cafeInfo.story,
    mission: cafeInfo.mission,
  },

  // Contact & Location
  contact: {
    address: cafeInfo.address,
    phone: cafeInfo.phone,
    email: cafeInfo.email,
    hours: {
      weekdays: cafeInfo.hours.weekdays,
      weekends: cafeInfo.hours.weekends,
    },
  },

  // Menu Categories with Products
  menu: {
    coffee: products
      .filter((p) => p.category === "coffee")
      .map((p) => ({
        name: p.name,
        description: p.description,
        price: p.price,
        featured: p.featured || false,
      })),
    tea: products
      .filter((p) => p.category === "tea")
      .map((p) => ({
        name: p.name,
        description: p.description,
        price: p.price,
        featured: p.featured || false,
      })),
    pastries: products
      .filter((p) => p.category === "pastry")
      .map((p) => ({
        name: p.name,
        description: p.description,
        price: p.price,
        featured: p.featured || false,
      })),
    food: products
      .filter((p) => p.category === "food")
      .map((p) => ({
        name: p.name,
        description: p.description,
        price: p.price,
        featured: p.featured || false,
      })),
  },

  // Featured Items
  featuredItems: products
    .filter((p) => p.featured)
    .map((p) => ({
      name: p.name,
      category: p.category,
      description: p.description,
      price: p.price,
    })),

  // Team Members
  team: teamMembers.map((t) => ({
    name: t.name,
    role: t.role,
    bio: t.bio,
  })),

  // Special Features & Policies
  features: {
    wifi: "Free high-speed WiFi available for all customers",
    seating: "Comfortable seating for individuals and groups",
    atmosphere: "Modern, cozy, and welcoming environment",
    specialty: "Specialty coffee made from premium Arabica beans",
    baking: "Fresh pastries baked daily on-site",
    sustainability: "Sourcing beans from sustainable farms worldwide",
  },

  // Dietary Options
  dietary: {
    vegan: [
      "Most coffee drinks can be made with oat, almond, or soy milk",
      "Avocado Toast (request without feta)",
      "French Fries",
      "Caesar Salad (request without parmesan)",
    ],
    glutenFree: [
      "All coffee and tea drinks are gluten-free",
      "Ask staff about gluten-free pastry options (availability varies)",
    ],
    vegetarian: [
      "Avocado Toast",
      "Caesar Salad",
      "French Fries",
      "Croissant",
      "All muffins and pastries",
    ],
  },

  // Popular Recommendations by Occasion
  recommendations: {
    morning: [
      "Classic Espresso with a Croissant",
      "Cappuccino with a Blueberry Muffin",
      "Breakfast Sandwich with Americano",
    ],
    afternoon: [
      "Caramel Latte with a Cinnamon Roll",
      "Matcha Latte with Avocado Toast",
      "Any Frappe for a refreshing pick-me-up",
    ],
    studyWork: [
      "Americano or Flat White - perfect for focus",
      "Matcha Latte - sustained energy without jitters",
      "Club Sandwich for a filling meal",
    ],
    dessert: [
      "Mocha with Chocolate Chip Cookies",
      "Irish Coffee with Banana Cake",
      "Any Frappe with a Cinnamon Roll",
    ],
  },

  // Price Ranges
  priceRanges: {
    coffee: "$3.50 - $7.50",
    tea: "$3.00 - $6.75",
    pastries: "$3.00 - $5.00",
    food: "$4.50 - $9.50",
    frappes: "$6.00 - $7.00",
  },

  // Frequently Asked Questions
  faq: {
    orderOnline:
      "Currently, orders are in-person only. Online ordering coming soon!",
    reservations: "No reservations needed. First come, first served seating.",
    delivery:
      "We don't offer delivery at the moment, but you can place to-go orders.",
    catering: "Yes! Contact us at hello@beaticafe.com for catering inquiries.",
    giftCards: "Gift cards available for purchase at the cafe.",
    parking: "Street parking available. Public parking garage 2 blocks away.",
    events:
      "We host community events monthly. Check our social media for updates.",
    allergies:
      "Please inform our staff of any allergies. We'll accommodate when possible.",
  },
};

/**
 * Generate a formatted context string for AI consumption
 */
export function generateAIContext(): string {
  const kb = cafeKnowledgeBase;

  return `
# BEATI CAFE KNOWLEDGE BASE

## About Us
Name: ${kb.basics.name}
Tagline: ${kb.basics.tagline}
Story: ${kb.basics.story}
Mission: ${kb.basics.mission}

## Contact & Hours
Address: ${kb.contact.address}
Phone: ${kb.contact.phone}
Email: ${kb.contact.email}
Hours: 
- ${kb.contact.hours.weekdays}
- ${kb.contact.hours.weekends}

## Our Menu

### Coffee ($${kb.priceRanges.coffee})
${kb.menu.coffee
  .map(
    (item) =>
      `- ${item.name}${item.featured ? " ⭐ FEATURED" : ""} ($${item.price}): ${
        item.description
      }`
  )
  .join("\n")}

### Tea ($${kb.priceRanges.tea})
${kb.menu.tea
  .map(
    (item) =>
      `- ${item.name}${item.featured ? " ⭐ FEATURED" : ""} ($${item.price}): ${
        item.description
      }`
  )
  .join("\n")}

### Pastries ($${kb.priceRanges.pastries})
${kb.menu.pastries
  .map(
    (item) =>
      `- ${item.name}${item.featured ? " ⭐ FEATURED" : ""} ($${item.price}): ${
        item.description
      }`
  )
  .join("\n")}

### Food ($${kb.priceRanges.food})
${kb.menu.food
  .map(
    (item) =>
      `- ${item.name}${item.featured ? " ⭐ FEATURED" : ""} ($${item.price}): ${
        item.description
      }`
  )
  .join("\n")}

## Our Team
${kb.team
  .map((member) => `- ${member.name}, ${member.role}: ${member.bio}`)
  .join("\n")}

## Special Features
${Object.entries(kb.features)
  .map(([key, value]) => `- ${value}`)
  .join("\n")}

## Dietary Options
Vegan Options:
${kb.dietary.vegan.map((item) => `  - ${item}`).join("\n")}

Gluten-Free Options:
${kb.dietary.glutenFree.map((item) => `  - ${item}`).join("\n")}

Vegetarian Options:
${kb.dietary.vegetarian.map((item) => `  - ${item}`).join("\n")}

## Popular Recommendations
Morning: ${kb.recommendations.morning.join(", ")}
Afternoon: ${kb.recommendations.afternoon.join(", ")}
For Study/Work: ${kb.recommendations.studyWork.join(", ")}
Dessert: ${kb.recommendations.dessert.join(", ")}

## FAQ
${Object.entries(kb.faq)
  .map(([key, value]) => {
    const question = key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLowerCase();
    return `Q: ${question}?\nA: ${value}`;
  })
  .join("\n\n")}
`;
}

/**
 * Export knowledge base for external use
 */
export { cafeKnowledgeBase as default };

