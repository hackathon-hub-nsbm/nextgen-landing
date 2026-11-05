"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sanidula Liyanage",
    text: "I just love meeting like-minded people",
  },
  {
    id: 2,
    name: "Ometh Abeyrathne",
    text: "Hackathon Hub made me fall in love with hackathons",
  },
  {
    id: 3,
    name: "Sithija Upawansa",
    text: "I'm currently a volunteer for the Hackathon Hub",
  },
  {
    id: 4,
    name: "Seniru Samaranayake",
    text: "Hackathon Hub helped me grow my creativity and leadership!",
  },
  {
    id: 5,
    name: "Amindya De Silva",
    text: "Joining Hackathon Hub was one of my best university decisions!",
  },
  {
    id: 6,
    name: "Tharushi Subasinghe",
    text: "Hackathon Hub is the best club ever!",
  },
  {
    id: 7,
    name: "Yasiru Dharmathilaka",
    text: "Every event feels like a new adventure — love this club!",
  },
  {
    id: 8,
    name: "Wasana Fernando",
    text: "Hackathon Hub made me confident in teamwork and innovation!",
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;

      const desktopPositions: { x: number; y: number }[] = [
        { x: 3, y: 2 },
        { x: 52, y: 86 },
        { x: 54, y: 3 },
        { x: 4, y: 85 },
      ];

      const mobilePositions: { x: number; y: number }[] = [
        { x: 50, y: 12 },
        { x: 50, y: 12 },
      ];

      const predefinedPositions = isMobile ? mobilePositions : desktopPositions;

      const positions: { x: number; y: number }[] = testimonials.map((_, index) => {
        const positionIndex = index % predefinedPositions.length;
        return predefinedPositions[positionIndex];
      });

      gsap.set(cardsRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 8,
        xPercent: isMobile ? -50 : 0,
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.set(card, {
            left: `${positions[index].x}%`,
            top: `${positions[index].y}%`,
          });
        }
      });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });

      const visibleCards: number[] = [0];
      const maxVisibleCards = isMobile ? 1 : 2;

      if (cardsRef.current[0]) {
        gsap.set(cardsRef.current[0], { opacity: 1, scale: 1, y: 0 });
      }

      const cycleOrder = [...testimonials.keys()].slice(1).concat(0);

      cycleOrder.forEach((index) => {
        tl.to({}, { duration: 3.5 }).call(() => {
          if (visibleCards.length >= maxVisibleCards) {
            const oldestCard = visibleCards.shift();
            if (oldestCard !== undefined && cardsRef.current[oldestCard]) {
              gsap.to(cardsRef.current[oldestCard], {
                opacity: 0,
                scale: 0.9,
                y: -6,
                duration: 0.5,
                ease: "power2.inOut",
              });
            }
          }

          visibleCards.push(index);

          if (cardsRef.current[index]) {
            gsap.fromTo(
              cardsRef.current[index],
              { opacity: 0, scale: 0.92, y: 8 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.55,
                ease: "back.out(1.4)",
              },
            );
          }
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-28 md:h-full md:absolute md:inset-0 pointer-events-none z-20 overflow-hidden"
    >
      {testimonials.map((t, index) => (
        <div
          key={t.id}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="absolute bg-[#071c29]/85 backdrop-blur-xl border border-cyan-400/75 text-cyan-100 rounded-xl px-4 py-2.5 w-60 sm:w-64 text-left shadow-[0_8px_28px_rgba(6,182,212,0.38),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
        >
          <p className="font-semibold text-xs sm:text-sm text-cyan-300 tracking-wide truncate mb-1">
            {t.name}
          </p>
          <p className="text-xs text-cyan-50/90 leading-snug text-pretty">&ldquo;{t.text}&rdquo;</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
