import { Contact } from "./_components/contact";

export const metadata = {
  title: "Contact Us - Beati Cafe",
  description: "Get in touch with us. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <main className="mt-26">
      <Contact />
    </main>
  );
}
