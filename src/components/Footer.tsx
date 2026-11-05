import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="w-full max-w-2xl mt-3.5 flex flex-col sm:flex-row justify-between items-center rounded-2xl bg-[#0a0e1a]/75 backdrop-blur-xl border border-purple-500/35 shadow-[0_12px_32px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.1)] px-5 py-4 text-sm gap-5">
      <div className="flex items-center gap-3 shrink-0">
        <Image
          src="/assets/hackothon.jpg"
          alt="Hackathon Hub Logo"
          width={92}
          height={92}
          className="rounded-xl shadow-md border border-white/15"
        />
      </div>

      <div className="text-center space-y-0.5 text-slate-300">
        <p className="font-semibold text-white tracking-wide text-sm">Contact Us</p>
        <p className="text-xs sm:text-sm font-medium text-slate-200">Hackathon Hub NSBM</p>
        <p className="text-xs text-slate-400">L2-206, B2 Floor, FOC, NSBM</p>
        <p className="text-xs text-slate-300 pt-0.5">
          Email:{" "}
          <a
            href="mailto:hh@nsbm.lk"
            className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2 transition-colors"
          >
            hh@nsbm.lk
          </a>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 shrink-0">
        <Link
          href="https://www.instagram.com/hackathonhub.nsbm/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-purple-700/70 hover:border-purple-400/60 transition-all duration-200 text-xs font-medium"
        >
          <IoLogoInstagram
            className="text-pink-400 group-hover:text-white transition-colors shrink-0"
            size={18}
          />
          <span>Instagram</span>
        </Link>

        <Link
          href="https://www.linkedin.com/company/hackathon-hub-nsbm/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-cyan-700/70 hover:border-cyan-400/60 transition-all duration-200 text-xs font-medium"
        >
          <FaLinkedin
            className="text-sky-400 group-hover:text-white transition-colors shrink-0"
            size={18}
          />
          <span>LinkedIn</span>
        </Link>

        <Link
          href="https://web.facebook.com/people/Hackathon-Hub/61556983036529/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-700/70 hover:border-blue-400/60 transition-all duration-200 text-xs font-medium"
        >
          <FaFacebookSquare
            className="text-blue-400 group-hover:text-white transition-colors shrink-0"
            size={18}
          />
          <span>Facebook</span>
        </Link>

        <Link
          href="https://github.com/hackathon-hub-nsbm/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-slate-800 hover:border-slate-500/60 transition-all duration-200 text-xs font-medium"
        >
          <FaGithub
            className="text-slate-200 group-hover:text-white transition-colors shrink-0"
            size={18}
          />
          <span>GitHub</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
