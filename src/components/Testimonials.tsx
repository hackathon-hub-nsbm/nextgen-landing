"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const testimonials = [
        { id: 1, name: "Achini Subasinghe", text: "Hackathon Hub is the best club ever!", top: "15%", left: "20%" },
        { id: 2, name: "Ometh Abeyrathne", text: "Hackathon Hub made me fall in love with hackathons", top: "30%" },
        { id: 3, name: "Sithija Kaveeshwara", text: "I'm currently a volunteer for the Hackathon Hub", top: "80%", left: "25%" },
        { id: 4, name: "Sanidula Liyanage", text: "I just love meeting like-minded people", top: "70%", left: "8%" },
        { id: 5, name: "Seniru Samaranayake", text: "Hackathon Hub helped me grow my creativity and leadership!", top: "25%", left: "8%" },
        { id: 6, name: "Tharushi Subasinghe", text: "Joining Hackathon Hub was one of my best university decisions!", top: "60%", left: "45%" },
        { id: 7, name: "Yasiru Perera", text: "Every event feels like a new adventure — love this club!", top: "80%", left: "45%" },
        { id: 8, name: "Wasana Fernando", text: "Hackathon Hub made me confident in teamwork and innovation!", top: "15%", left: "38%" },
    ];

    
    useGSAP(() => {
        if (window.innerWidth >= 768) {
            gsap.set(cardsRef.current, { opacity: 0, scale: 0.9 });

            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
            const groupSize = 2; 
            const total = testimonials.length;

            for (let start = 0; start < total; start += groupSize) {
                tl.call(() => {
                    cardsRef.current.forEach((card, i) => {
                        if (!card) return;
                        const inGroup = i >= start && i < start + groupSize;

                        gsap.to(card, {
                            opacity: inGroup ? 1 : 0,
                            scale: inGroup ? 1 : 0.9,
                            duration: 0.8,
                            ease: "power2.out",
                        });
                    });
                }).to({}, { duration: 3 });
            }
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex flex-wrap justify-center items-center gap-4 md:absolute md:top-0 md:left-0 md:items-center md:justify-center pointer-events-none"
        >
            {testimonials.map((t, index) => (
                <div
                    key={t.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg px-4 py-3 w-64 text-center shadow-lg"
                    style={{
                        top: window.innerWidth >= 768 ? t.top : undefined,
                        left: window.innerWidth >= 768 ? t.left : undefined,
                        transform: window.innerWidth >= 768 ? "translate(-50%, -50%)" : undefined,
                        position: window.innerWidth >= 768 ? "absolute" : "relative",
                    }}
                >
                    <p className="font-semibold text-lg">{t.name}</p>
                    <p className="text-sm text-white-300">{t.text}</p>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;
