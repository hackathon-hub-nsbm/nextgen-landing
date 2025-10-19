"use client";

interface EventHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

const EventHeader = ({ title, subtitle, description }: EventHeaderProps) => {
  return (
    <div className="text-center md:text-left p-6">
      <h1 className="text-6xl font-extrabold text-[#00ffff] mb-4 drop-shadow-[0_0_20px_#00ffff70] justify-center flex">
        {title}
      </h1>
      <h2 className="text-3xl font-semibold text-[#ff00ff] mb-4 drop-shadow-[0_0_15px_#ff00ff70] justify-center flex">
        {subtitle}
      </h2>
      <p className="text-gray-300 max-w-md mb-6 leading-relaxed text-lg text-center md:text-center mx-auto">
        {description}
      </p>
    </div>
  );
};

export default EventHeader;