"use client";

import Image from "next/image";

interface EventHeaderProps {
  description: string;
}

const EventHeader = ({ description }: EventHeaderProps) => {
  return (
    <div className="text-center px-4 pt-2 pb-1 flex flex-col items-center relative z-10">
      <div className="relative group">
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-600/25 via-cyan-500/20 to-purple-600/25 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        <Image
          src="/assets/logo.jpg"
          alt="NextGen Hackers Meetup Logo"
          width={250}
          height={250}
          priority
          className="relative drop-shadow-[0_4px_20px_rgba(168,85,247,0.35)] transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <p className="text-slate-200/90 max-w-[42ch] mt-3 leading-relaxed text-base sm:text-lg text-center mx-auto text-balance font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        {description}
      </p>
    </div>
  );
};

export default EventHeader;
