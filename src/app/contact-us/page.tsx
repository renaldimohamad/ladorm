"use client";

import { LayoutBlank } from "@/layouts";
import Footer from "@/components/common/Footer";
import ContactUsSection from "@/components/contact-us/contactUseSection";

export default function Home() {
  return (
    <LayoutBlank>
      <main className="flex flex-col w-full">
        <section id="contact">
          <ContactUsSection />
        </section>
        <Footer />
      </main>
    </LayoutBlank>
  );
}
