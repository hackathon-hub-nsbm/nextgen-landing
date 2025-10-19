"use client";

import { useState, useEffect } from "react";

const Countdown = ({ date }: { date: string }) => {
    const eventDate = new Date(date);

    const calculateTimeLeft = () => {
        const now = new Date();
        return Math.max(
            0,
            Math.floor((eventDate.getTime() - now.getTime()) / 1000)
        );
    };

    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        setTimeLeft(calculateTimeLeft()); // first calculation after client mounts

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (timeLeft === null) {
        // Avoid mismatch by rendering nothing until client-side mounts
        return null;
    }

    const formatTime = (time: number) => {
        const days = Math.floor(time / (24 * 3600));
        const hours = Math.floor((time % (24 * 3600)) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return (
            <div className="text-center">
                <span>{String(days).padStart(2, "0")}</span>:
                <span>{String(hours).padStart(2, "0")}</span>:
                <span>{String(minutes).padStart(2, "0")}</span>:
                <span>{String(seconds).padStart(2, "0")}</span>
            </div>
        );
    };

    return (
        <div>
            {formatTime(timeLeft)}
        </div>
    );
};

export default Countdown;
