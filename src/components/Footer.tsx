import Image from "next/image";
import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full max-w-2xl mt-4 flex flex-col sm:flex-row justify-between rounded-lg items-center bg-black/30 p-5 text-sm gap-6">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/assets/hackothon.jpg"
          alt="Hackathon Hub Logo"
          width={120}
          height={120}
          className="rounded-md"
        />
      </div>

     
        {/* Contact info */}
        <div className="text-center lg:text-center">
          <p className="font-semibold text-white">Contact Us</p>
          <p>Hackathon Hub NSBM</p>
          <p>L2-206, B2 Floor, FOC, NSBM</p>
        </div>

        {/* Social links */}
        <div className="flex flex-col gap-2 ">
          <Link
            href="https://www.instagram.com/hackathonhub.nsbm/"
            target="_blank"
            className="group flex items-center gap-2 px-3 py-1 rounded-md hover:bg-purple-700 transition-all"
          >
            <IoLogoInstagram className="text-pink-500 group-hover:text-white" size={20} />
            Instagram
          </Link>

          <Link
            href="https://www.linkedin.com/company/hackathon-hub-nsbm/"
            target="_blank"
            className="group flex items-center gap-2 px-3 py-1 rounded-md hover:bg-cyan-700 transition-all"
          >
            <FaLinkedin className="text-blue-500 group-hover:text-white" size={20} />
            LinkedIn
          </Link>

          <Link
            href="https://web.facebook.com/people/Hackathon-Hub/61556983036529/"
            target="_blank"
            className="group flex items-center gap-2 px-3 py-1 rounded-md hover:bg-blue-700 transition-all"
          >
            <FaFacebookSquare className="text-blue-500 group-hover:text-white" size={20} />
            Facebook
          </Link>
          
          <Link
            href="https://github.com/hackathon-hub-nsbm/"
            target="_blank"
            className="group flex items-center gap-2 px-3 py-1 rounded-md hover:bg-slate-900 transition-all"
          >
            <FaGithub className="text-white group-hover:text-white" size={20} />
            GitHub
          </Link>
        </div>
      
    </footer>
  );
};

export default Footer;
