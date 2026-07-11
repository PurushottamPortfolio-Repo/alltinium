import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(22,163,74,0.12),_transparent_40%),linear-gradient(135deg,_rgba(250,250,250,0.95),_rgba(245,245,245,0.9))] px-4 py-16 dark:bg-[radial-gradient(circle_at_top_left,_rgba(74,222,128,0.16),_transparent_42%),linear-gradient(135deg,_rgba(9,9,11,0.98),_rgba(24,24,27,0.95))] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ContactForm />
      </div>
    </div>
  );
}
