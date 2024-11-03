'use client'
import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { NAV_LINKS } from '@/constants/index';

const Navbar = () => {
  const [navIsOpened, setNavIsOpened] = useState(false);

  const closeNavbar = () => setNavIsOpened(false);
  const toggleNavbar = () => setNavIsOpened((navIsOpened) => !navIsOpened);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={true}
        onClick={closeNavbar}
        className={`fixed bg-gray-800/40 inset-0 z-30 ${navIsOpened ? "lg:hidden" : "hidden lg:hidden"}`}
      />

      {/* Navbar Container */}
      <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="w-full flex justify-between h-14 items-center">
          
          {/* Contact Info */}
          <div className="h-full flex items-center gap-x-4 text-gray-700">
            <a href="tel: +91 971 772 2199" className="flex gap-1 text-sm" rel="noreferer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M14.414 7l3.293-3.293a1 1 0 00-1.414-1.414L13 5.586V4a1 1 0 10-2 0v4.003a.996.996 0 00.617.921A.997.997 0 0012 9h4a1 1 0 100-2h-1.586z" />
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="hidden sm:flex">+91 971 772 2199</span>
            </a>
            <a href="mailto: nutreyvibes@gmail.com" className="flex gap-1 items-center" rel="noreferer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M2.106 6.447A2 2 0 001 8.237V16a2 2 0 002 2h14a2 2 0 002-2V8.236a2 2 0 00-1.106-1.789l-7-3.5a2 2 0 00-1.788 0l-7 3.5zm1.48 4.007a.75.75 0 00-.671 1.342l5.855 2.928a2.75 2.75 0 002.46 0l5.852-2.926a.75.75 0 10-.67-1.342l-5.853 2.926a1.25 1.25 0 01-1.118 0l-5.856-2.928z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:flex">nutreyvibes@gmail.com</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-x-2.5 -mx-2 text-gray-700">
            <a href="#facebook" className="transition ease-linear hover:text-green-600" rel="noreferer">
              {/* Facebook SVG */}
            </a>
            <a href="#twitter" className="transition ease-linear hover:text-green-600" rel="noreferer">
              {/* Twitter SVG */}
            </a>
            <a href="#linkedin" className="transition ease-linear hover:text-green-600" rel="noreferer">
              {/* LinkedIn SVG */}
            </a>
            <a href="#instagram" className="transition ease-linear hover:text-green-600" rel="noreferer">
              {/* Instagram SVG */}
            </a>
          </div>
        </div>
      </div>

      {/* Navbar Header */}
      <header className="sticky left-0 top-0 w-full flex items-center h-20 border-b border-b-gray-200 z-40 bg-lime-100">
        <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
          <div className="flex items-center min-w-max">
            <Link href="#" className="text-xl font-semibold flex items-center gap-x-2">
              <Image src="/Designer-logo2.png" alt='Logo' height={75} width={75}/>
              <span className="text-lg text-gray-800">NutreyVibes</span>
            </Link>
          </div>

          {/* Nav Links */}
          <div
            className={`absolute top-full left-0 bg-lime-100 border-b border-4 border-gray-400 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:flex lg:justify-between duration-300 ease-linear ${
              navIsOpened
                ? "translate-y-0 opacity-100 visible"
                : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"
            }`}
          >
            <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-800 lg:w-full lg:justify-center">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="relative py-2.5 duration-300 ease-linear hover:text-green-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-100 after:bg-green-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex sm:items-center lg:min-w-max mt-10 lg:mt-0">
              <Link
                href="#"
                className="px-6 items-center h-12 rounded-3xl text-green-700 border border-gray-200 bg-gray-100  duration-300 ease-linear flex justify-center w-full sm:w-auto"
              >
                Book a call
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div aria-hidden="true" className="flex items-center lg:hidden">
            <button onClick={toggleNavbar} aria-label="toggle navbar" className="outline-none pl-3 relative py-3">
              <span
                aria-hidden={true}
                className={`flex h-0.5 w-6 rounded bg-gray-800 transition duration-300 ${
                  navIsOpened ? "rotate-45 translate-y-[.324rem]" : ""
                }`}
              />
              <span
                aria-hidden={true}
                className={`mt-2 flex h-0.5 w-6 rounded bg-gray-800 transition duration-300 ${
                  navIsOpened ? "-rotate-45 -translate-y-[.324rem]" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
