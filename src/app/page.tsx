"use client";

import Countdown from "@/components/Countdown";
import EventHeader from "@/components/EventHeader";
import Form from "@/components/Form";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Background from "../../public/assets/background-original.png";

export default function Home() {
    return (
        <div
            className="flex flex-col md:flex-row items-center justify-center min-h-screen"
        >
            {/* Left Side: Event Header + Countdown */}
            <div className="md:w-1/2 h-160 md:h-screen flex flex-col items-center justify-center relative space-y-8">
              <div className="block md:hidden">
                <br /><br /><br />
              </div>
                <EventHeader
                    description="An annual event organized by Hackathon Hub to welcome new members and showcase exciting projects"
                />
                <Countdown date="2025-11-04T09:30:00Z" />
                {/* Testimonials */}
                <Testimonials />
            </div>

            {/* Right Side: Registration Form */}
            <div className="flex flex-col items-center justify-center md:w-1/2 h-full">
                <Form />
                <Footer />
            </div>

        </div>
    );
}





