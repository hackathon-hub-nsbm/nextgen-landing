"use client";

import Image from "next/image";

interface EventHeaderProps {
  description: string;
}

const EventHeader = ({ description }: EventHeaderProps) => {
  return (
    <div className="text-center md:text-left p-6 flex flex-col items-center">
      <Image
        src="/assets/logo.jpg"
        alt="Event Logo"
        width={250}
        height={250}
        priority
      />

        <p className="text-gray-300 max-w-md mb-6 leading-relaxed text-lg text-center md:text-center mx-auto">
        {description}
      </p>
    </div>
  );
};

export default EventHeader;


