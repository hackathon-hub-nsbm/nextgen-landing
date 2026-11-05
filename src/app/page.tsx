"use client";

import Countdown from "@/components/Countdown";
import EventHeader from "@/components/EventHeader";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="w-full max-w-[1440px] mx-auto min-h-dvh px-4 sm:px-6 lg:px-10 py-8 md:py-6 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-10">
      <section className="w-full md:w-1/2 md:min-h-[calc(100dvh-3rem)] flex flex-col items-center justify-center relative py-6 md:py-20 space-y-5">
        <EventHeader description="An annual event organized by Hackathon Hub to welcome new members and showcase exciting projects" />
        <Countdown />
        <Testimonials />
      </section>

      <section className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <Form />
        <Footer />
      </section>
    </main>
  );
}
