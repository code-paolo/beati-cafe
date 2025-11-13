# Beati Cafe - Frontend MVP

A modern, responsive, visually appealing single-page web application for Beati Cafe built with Next.js, React, TypeScript, shadcn/ui, and TailwindCSS.

## 🎯 Features

- **Modern Design**: Cozy, minimal cafe aesthetic with warm colors and smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Single Page Application**: Smooth scroll navigation between sections
- **Interactive UI**: Category filtering, contact form with toast notifications
- **Google Maps Integration**: Embedded map showing cafe location

## 📋 Sections

1. **Hero** - Welcome section with cafe branding and call-to-action buttons
2. **Catalog/Menu** - Product showcase with category filtering (Coffee, Tea, Pastries, Food)
3. **About** - Cafe story, mission, and team member profiles
4. **Contact** - Contact form and Google Maps integration
5. **Footer** - Quick links and contact information

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**

```bash
cd beati-cafe
```

2. **Install dependencies** (if not already installed)

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your Google Maps API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**To get a Google Maps API Key:**
- Visit [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
- Create a new project or select existing one
- Enable "Maps Embed API"
- Create credentials (API Key)
- Copy the API key to your `.env.local` file

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
beati-cafe/
├── app/
│   ├── components/         # React components
│   │   ├── navbar.tsx      # Navigation bar
│   │   ├── hero.tsx        # Hero section
│   │   ├── catalog.tsx     # Product catalog with filters
│   │   ├── product-card.tsx # Individual product card
│   │   ├── about.tsx       # About section
│   │   ├── contact.tsx     # Contact form & map
│   │   └── footer.tsx      # Footer
│   ├── data/              # Mock data
│   │   ├── products.ts     # Product catalog data
│   │   ├── team.ts         # Team member data
│   │   └── cafe-info.ts    # Cafe information
│   ├── types/             # TypeScript types
│   │   └── index.ts        # Type definitions
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/ui/          # shadcn/ui components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Inter (sans-serif), Playfair Display (serif)

## 🔄 Replacing Mock Data with Real Backend

The application currently uses mock data from `app/data/` directory. To connect to a real backend:

### 1. Create API Service Layer

Create `app/services/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
}

export async function fetchTeamMembers() {
  const response = await fetch(`${API_BASE_URL}/team`);
  return response.json();
}

export async function submitContactForm(data: ContactFormData) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
```

### 2. Update Components to Use API

Replace static imports with API calls:

```typescript
// Before
import { products } from '../data/products';

// After
import { fetchProducts } from '../services/api';

// In component
const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts().then(setProducts);
}, []);
```

### 3. Add Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### 4. Update Contact Form Submission

Replace mock submission in `app/components/contact.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await submitContactForm(formData);
    // Success handling...
  } catch (error) {
    // Error handling...
  } finally {
    setIsSubmitting(false);
  }
};
```

## 🎯 Customization

### Change Cafe Information

Edit `app/data/cafe-info.ts` to update:
- Cafe name and tagline
- Story and mission
- Address and contact details
- Map coordinates

### Update Products

Edit `app/data/products.ts` to:
- Add/remove menu items
- Change prices and descriptions
- Update product images
- Modify categories

### Modify Team Members

Edit `app/data/team.ts` to update team information

### Adjust Colors & Theme

Edit `app/globals.css` to customize:
- Color palette (currently amber/orange warm tones)
- Border radius
- Spacing
- Animations

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

This is an MVP frontend application. To extend functionality:

1. Add new sections/pages in `app/`
2. Create new components in `app/components/`
3. Add new types in `app/types/`
4. Update mock data in `app/data/`

## 📄 License

All rights reserved - Beati Cafe

## 🆘 Troubleshooting

### Google Maps not showing

- Ensure your API key is correctly set in `.env.local`
- Make sure Maps Embed API is enabled in Google Cloud Console
- Check browser console for errors

### Styles not applying

- Clear Next.js cache: `rm -rf .next`
- Restart development server

### Build errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Make sure you're using Node.js 18+

## 📧 Support

For questions or issues, contact: hello@beaticafe.com

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS
