"use client";

import { useEffect, useState } from "react";

export interface EventSession {
  id: string;
  dateLabel: string;
  shortDate: string;
  title: string;
  isoDate: string;
}

const EVENT_SESSIONS: EventSession[] = [
  {
    id: "session-1",
    dateLabel: "10 NOV 2026",
    shortDate: "November 10th",
    title: "1st Session",
    isoDate: "2026-11-10T09:30:00+05:30",
  },
  {
    id: "session-2",
    dateLabel: "13 NOV 2026",
    shortDate: "November 13th",
    title: "2nd Session (Buildathon)",
    isoDate: "2026-11-13T09:30:00+05:30",
  },
  {
    id: "session-3",
    dateLabel: "17 NOV 2026",
    shortDate: "November 17th",
    title: "3rd Session (CTF + Ideathon)",
    isoDate: "2026-11-17T09:30:00+05:30",
  },
];

const Countdown = ({ date }: { date?: string }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (date) return;
    const now = Date.now();
    const upcomingIdx = EVENT_SESSIONS.findIndex((s) => new Date(s.isoDate).getTime() > now);
    if (upcomingIdx !== -1) {
      setSelectedIndex(upcomingIdx);
    }
  }, [date]);

  const activeSession = EVENT_SESSIONS[selectedIndex] ?? EVENT_SESSIONS[0];
  const targetDateString = date ?? activeSession.isoDate;

  useEffect(() => {
    const eventTime = new Date(targetDateString).getTime();
    const calculateTimeLeft = () => {
      const now = Date.now();
      return Math.max(0, Math.floor((eventTime - now) / 1000));
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateString]);

  const getTimeSegments = (time: number) => {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTimeSegments(timeLeft ?? 0);

  const timeArray = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="flex flex-col items-center space-y-4 relative z-10 w-full max-w-md px-2">
      <div className="flex flex-col items-center gap-1">
        <p className="text-xl sm:text-2xl font-mono font-bold tracking-[0.2em] text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] drop-shadow-[0_0_16px_rgba(147,51,234,0.8)]">
          {activeSession.dateLabel}
        </p>
        <span className="text-xs font-medium tracking-wider uppercase text-cyan-300/90">
          {activeSession.title}
        </span>
      </div>

      <div className="flex justify-center gap-2.5 sm:gap-3.5 flex-wrap">
        {timeArray.map((t) => (
          <div
            key={t.label}
            className="flex flex-col items-center justify-center bg-[#090d18]/85 backdrop-blur-xl border border-purple-500/50 shadow-[0_8px_24px_rgba(126,34,206,0.28),inset_0_1px_0_0_rgba(255,255,255,0.14)] px-3.5 py-2.5 rounded-xl min-w-[68px] sm:min-w-[74px] transition-all duration-300 hover:scale-105 hover:border-cyan-400/60"
          >
            <div className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-purple-200 drop-shadow-[0_0_10px_rgba(168,85,247,0.75)]">
              {timeLeft === null ? "--" : String(t.value).padStart(2, "0")}
            </div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-purple-300/80 mt-0.5">
              {t.label}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full pt-1">
        <div className="flex flex-col gap-1.5 bg-[#080c17]/75 backdrop-blur-xl border border-purple-500/30 rounded-xl p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          {EVENT_SESSIONS.map((session, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={session.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-left text-xs sm:text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-600/35 to-cyan-500/25 border border-cyan-400/50 text-white shadow-[0_0_14px_rgba(34,211,238,0.2)]"
                    : "hover:bg-white/5 text-slate-300 border border-transparent"
                }`}
              >
                <span className="font-mono font-semibold text-cyan-300 shrink-0">
                  {session.shortDate}
                </span>
                <span className="text-slate-100 font-medium truncate">{session.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Countdown;
