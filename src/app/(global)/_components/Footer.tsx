"use client";

import FacebookIcon from "../../../../public/images/icons/FacebookIcon.svg";
import InstagramIcon from "../../../../public/images/icons/InstagramIcon.svg";
import YoutubeIcon from "../../../../public/images/icons/YoutubeIcon.svg";
import XIcon from "../../../../public/images/icons/XIcon.svg";

export default function Footer() {
  return (
    <footer className="py-[30px] px-6 border-t border-gray-100 md:py-[60px] md:px-10">
      <div className="flex flex-wrap justify-between items-center gap-5 md:max-w-[1520px] md:mx-auto md:flex-nowrap">
        <p className="text-13 font-medium text-gray-400 order-2 md:order-1">
          ©codeit - 2023
        </p>
        <nav className="flex items-center justify-center gap-6 text-13 font-medium text-gray-600 w-full shrink-0 order-1 md:order-2 md:shrink-1 md:w-auto">
          <span>Privacy Policy</span>
          <span>∙</span>
          <span>FAQ</span>
        </nav>
        <ul className="flex items-center gap-4 order-3 text-gray-400">
          <li>
            <FacebookIcon className="w-5 h-5" />
          </li>
          <li>
            <InstagramIcon className="w-5 h-5" />
          </li>
          <li>
            <YoutubeIcon className="w-5 h-5" />
          </li>
          <li>
            <XIcon className="w-5 h-5" />
          </li>
        </ul>
      </div>
    </footer>
  );
}
