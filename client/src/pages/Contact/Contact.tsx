import ContactInfo from "@/pages/Contact/ContactInfo.tsx";
import ContactMessage from "./ContactMessage";

export default function ContactPage() {
  return (
    <div className="container mx-auto grid gap-8 overflow-hidden px-4 py-16 lg:grid-cols-2">
      <ContactMessage />
      <ContactInfo />
    </div>
  );
}
