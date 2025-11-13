import { About } from "./_components/about";

export const metadata = {
  title: "About Us - Beati Cafe",
  description:
    "Learn about our story, mission, and the passionate team behind Beati Cafe.",
};

export default function AboutPage() {
  return (
    <main className="mt-26">
      <About />
    </main>
  );
}
