import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="py-16">
      <div className="w-full xl:w-10/12 flex flex-col gap-8 m-auto">
        <div className="flex justify-between">
          <span></span>
          <span className="flex gap-8">
            <button>Features</button>
            <button>Community</button>
            <button>Resources</button>
          </span>
          <span className="flex gap-5">
            <button>
              <FaInstagram />
            </button>
            <button>
              <FaLinkedin />
            </button>
            <button>
              <FaXTwitter />
            </button>
          </span>
        </div>
        <hr className="border-t border-black" />
        <div className="flex gap-10 items-center justify-center">
          <span>
            © 2024 XYZ. All rights reserved. Empowering your journey to
            self-improvement.
          </span>
          <Link href="/contact">Contact</Link>
          <button>Terms and Conditions</button>
          <button>Privacy Policy</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
