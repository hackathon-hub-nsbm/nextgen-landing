import Countdown from "@/components/Countdown";
import Form from "@/components/Form";

export default function Home() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
            <div className="md:w-1/2 h-full text-3xl">
                <Countdown date="2025-11-04T09:30:00Z" />
            </div>
            <div className="md:w-1/2 flex items-center justify-center h-full">
                <Form />
            </div>
        </div>
    );
}
