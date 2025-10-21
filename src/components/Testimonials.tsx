"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  useGSAP(() => {
    const desktopPositions: { x: number; y: number }[] = [
      { x: 10, y: 10 },
      { x: 54, y: 80 },
      { x: 60, y: 14 },
      { x: 10, y: 74 },
    ];

    const mobilePositions: { x: number; y: number }[] = [
      { x: 6, y: 4 },
      { x: 24, y: 84 },
    ];

    let predefinedPositions;
    if (window.innerWidth < 768) predefinedPositions = mobilePositions;
    else predefinedPositions = desktopPositions;

    const positions: { x: number; y: number }[] = [];
    testimonials.forEach((_, index) => {
      const positionIndex = index % predefinedPositions.length;
      positions.push(predefinedPositions[positionIndex]);
    });

    gsap.set(cardsRef.current, { opacity: 0 });

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.set(card, {
          left: `${positions[index].x}%`,
          top: `${positions[index].y}%`,
        });
      }
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    const visibleCards: number[] = [];
    const maxVisibleCards = window.innerWidth < 768 ? 2 : 3;

    testimonials.forEach((_, index) => {
      tl.call(() => {
        // when there are more than max visible cards this removes the last one
        if (visibleCards.length >= maxVisibleCards) {
          const oldestCard = visibleCards.shift();
          if (oldestCard !== undefined && cardsRef.current[oldestCard]) {
            gsap.to(cardsRef.current[oldestCard], {
              opacity: 0,
              scale: 0.8,
              duration: 0.6,
            });
          }
        }

        // adds the current card to visible cards
        visibleCards.push(index);

        // makes the current card visible
        if (cardsRef.current[index]) {
          gsap.to(cardsRef.current[index], {
            opacity: 1,
            scale: 1,
            duration: 0.8,
          });
        }
      }).to({}, { duration: 4 });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-wrap justify-center items-center gap-4 md:absolute md:top-0 md:left-0 md:items-center md:justify-center pointer-events-none"
    >
      {testimonials.map((t, index) => (
        <div
          key={t.id}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="absolute bg-cyan-900/20 backdrop-blur-lg border border-cyan-400 text-cyan-200 rounded-lg px-4 py-3 w-64 text-center shadow-lg shadow-cyan-500/50"
        >
          <p className="font-semibold text-base md:text-lg text-cyan-300">{t.name}</p>
          <p className="text-xs md:text-sm text-cyan-100">{t.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
