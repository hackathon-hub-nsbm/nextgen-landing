"use client";

import Countdown from "@/components/Countdown";
import EventHeader from "@/components/EventHeader";
import Form from "@/components/Form";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div
            className="flex flex-col md:flex-row items-center justify-center min-h-screen 
                       bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('assets/frontbg.png')" }}
        >
            <br /><br /> <br /> <br /><br /><br />
            {/* Left Side: Event Header + Countdown */}
            <div className="md:w-1/2 h-full flex flex-col items-center justify-center relative space-y-8">
                <EventHeader
                    description="An annual event organized by Hackathon Hub to welcome new members and showcase exciting projects"
                />
                <Countdown date="2025-11-04T09:30:00Z" />
            </div>
            {/* Testimonials */}
            <Testimonials />

            {/* Right Side: Registration Form */}
            <div className="flex flex-col items-center justify-center space-y-6 md:w-1/2 h-full">
                <Form />
                <Footer />
            </div>

        </div>
    );
}





