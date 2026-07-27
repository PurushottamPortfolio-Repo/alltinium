import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="relative min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(22,163,74,0.12),_transparent_40%),linear-gradient(135deg,_rgba(250,250,250,0.95),_rgba(245,245,245,0.9))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(74,222,128,0.16),_transparent_42%),linear-gradient(135deg,_rgba(9,9,11,0.98),_rgba(24,24,27,0.95))]">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
        <ContactForm />
      </div>
    </div>
  );
}
