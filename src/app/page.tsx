"use client";

import Countdown from "@/components/Countdown";
import EventHeader from "@/components/EventHeader";
import Form from "@/components/Form";


export default function Home() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">

            {/* <div className="md:w-1/2 h-full text-3xl"> */}
            <div className="md:w-1/2 h-full text-3xl flex flex-col items-center justify-center">
                <EventHeader
                    description="A annual event organized by Hackothon Hub to welcome new members and showcase exciting projects"
                />
                <Countdown date="2025-11-04T09:30:00Z" />
            </div>
            <div className="md:w-1/2 flex items-center justify-center h-full">
                <Form />
            </div>
        </div>
    );
}

