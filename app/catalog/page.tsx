import { CategoryGrid } from "./_components/category-grid";

export const metadata = {
  title: "Catalog - Beati Cafe",
  description: "Browse our catalog of coffee, tea, pastries, and food items.",
};

export default function CatalogPage() {
  return (
    <main className="mt-26">
      <CategoryGrid />
    </main>
  );
}




