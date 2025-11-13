import { Catalog } from "./_components/catalog";

export const metadata = {
  title: "Menu - Beati Cafe",
  description:
    "Explore our full menu of specialty coffee, teas, and freshly baked pastries.",
};

export default function MenuPage() {
  return (
    <main className="mt-26">
      <Catalog />
    </main>
  );
}
