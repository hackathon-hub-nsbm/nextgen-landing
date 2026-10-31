"use client";

import { useState, useEffect } from "react";

const Countdown = ({ date }: { date: string }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const eventTime = new Date(date).getTime();
    const calculateTimeLeft = () => {
      const now = Date.now();
      return Math.max(0, Math.floor((eventTime - now) / 1000));
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  if (timeLeft === null) return null;

  const getTimeSegments = (time: number) => {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTimeSegments(timeLeft);

  const timeArray = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-pulse">
        <p className="text-2xl font-mono tracking-widest text-white-300 drop-shadow-[0_0_6px_#00ffff] drop-shadow-[0_0_12px_#9333ea]">
           04 NOV 2025
        </p>
      </div>

      <div className="flex justify-center gap-3 flex-wrap">
        {timeArray.map((t, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-black/80 border-2 border-purple-700 
                     p-3 rounded-lg min-w-[60px] transform transition-transform duration-300 hover:scale-105
                     "
          >
            <div className="text-2xl font-extrabold text-purple-300 drop-shadow-[0_0_8px_purple]">
              {String(t.value).padStart(2, "0")}
            </div>
            <span className="text-xs text-purple-300 mt-1">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
