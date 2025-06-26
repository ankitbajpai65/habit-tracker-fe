import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] text-sm sm:text-base py-10 lg:py-16">
      <div className="w-full xl:w-5/6 flex flex-col gap-6 m-auto px-3 sm:px-5">
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:justify-between">
          <span className="hidden lg:block"></span>
          <span className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <button>Features</button>
            <Link href="/contact">Contact</Link>
          </span>
          <span className="flex gap-5">
            <Link
              href="https://www.instagram.com/ankitbajpai05"
              target="_blank"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ankit65bajpai/"
              target="_blank"
            >
              <FaLinkedin />
            </Link>
            <Link href="https://x.com/ankitbajpai65" target="_blank">
              <FaXTwitter />
            </Link>
          </span>
        </div>
        <hr className="border-t border-gray-800" />
        <p className="text-center">
          © 2025 XYZ. All rights reserved. Empowering your journey to
          self-improvement.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
