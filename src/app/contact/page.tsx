import type { Metadata } from "next";

import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact & Demo",
  description: "Request a product demo and connect your sales workflow with ExpoFlow.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Request a Demo</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          Tell us about your event goals. This form includes a submission handler placeholder ready for CRM integration.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
