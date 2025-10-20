"use client";

import { useState, useEffect } from "react";

const Countdown = ({ date }: { date: string }) => {
  const eventDate = new Date(date);

  const calculateTimeLeft = () => {
    const now = new Date();
    return Math.max(0, Math.floor((eventDate.getTime() - now.getTime()) / 1000));
  };

  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft()); // first calculation after client mounts
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null)
     // Avoid mismatch by rendering nothing until client-side mounts 
    return null;

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
    <div className="flex justify-center gap-4 text-center mt-4 ">
      {timeArray.map((t, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-gray-800 text-white px-4 py-2  text-lg font-bold min-w-[50px] rounded-lg">
            {String(t.value).padStart(2, "0")}
          </div>
          <span className="text-sm text-gray-400 mt-1">{t.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;


// "use client";

// import { useState, useEffect } from "react";

// const Countdown = ({ date }: { date: string }) => {
//     const eventDate = new Date(date);

//     const calculateTimeLeft = () => {
//         const now = new Date();
//         return Math.max(
//             0,
//             Math.floor((eventDate.getTime() - now.getTime()) / 1000)
//         );
//     };

//     const [timeLeft, setTimeLeft] = useState<number | null>(null);

//     useEffect(() => {
//         setTimeLeft(calculateTimeLeft()); // first calculation after client mounts

//         const interval = setInterval(() => {
//             setTimeLeft(calculateTimeLeft());
//         }, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     if (timeLeft === null) {
//         // Avoid mismatch by rendering nothing until client-side mounts
//         return null;
//     }

//     const formatTime = (time: number) => {
//         const days = Math.floor(time / (24 * 3600));
//         const hours = Math.floor((time % (24 * 3600)) / 3600);
//         const minutes = Math.floor((time % 3600) / 60);
//         const seconds = time % 60;

//         return (
//             <div className="text-center">
//                 <span>{String(days).padStart(2, "0")}</span>:
//                 <span>{String(hours).padStart(2, "0")}</span>:
//                 <span>{String(minutes).padStart(2, "0")}</span>:
//                 <span>{String(seconds).padStart(2, "0")}</span>
//             </div>
//         );
//     };

//     return (
//         <div>
//             {formatTime(timeLeft)}
//         </div>
//     );
// };

// export default Countdown;

