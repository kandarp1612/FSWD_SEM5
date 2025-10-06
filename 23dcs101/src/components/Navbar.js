import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBg(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Home", "Shows", "Movies", "Games", "New & Popular", "My List", "Browse by Languages"];

  return (
    <nav className={`fixed w-full z-50 flex items-center justify-between px-6 py-3 transition-colors duration-500 ${showBg ? 'bg-black/90 shadow-md' : 'bg-transparent'}`}>

      <div className="flex items-center space-x-6">
        <img
          src="https://streamflix.web.app/assets/images/logo-text-148x72.png"
          alt="Netflix Logo"
          className="h-8 md:h-10"
        />

        <ul className="hidden md:flex space-x-4 text-white text-sm md:text-base font-semibold">
          {menuItems.map((item) => (
            <li key={item} className="hover:underline cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-white">
        <button className="hidden md:block">
          <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 105.292 14.292l5.707 5.707 1.414-1.414-5.707-5.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
          </svg>
        </button>
        <span className="hidden md:block cursor-pointer">Children</span>
        <button>
          <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
            <path d="M12 24c1.105 0 2-.895 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.635-5.64-4.5-6.32V6a1.5 1.5 0 10-3 0v.68C7.635 7.36 6 9.93 6 13v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded bg-red-500 border-4 cursor-pointer"></div>
      </div>
    </nav>
  );
}
