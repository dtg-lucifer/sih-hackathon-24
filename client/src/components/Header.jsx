import React, { useState } from 'react';
import logo_image from "../assets/image.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <img src={logo_image} alt="Logo" className="h-8 sm:h-10" />
          <h1 className="text-xl sm:text-2xl font-bold text-purple-800">RailMadad</h1>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <span className="text-orange-500 font-bold">139</span>
          <button className="bg-purple-100 text-purple-800 px-4 py-2 rounded">Log In</button>
          <button className="bg-purple-800 text-white px-4 py-2 rounded">Sign Up</button>
        </div>
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-purple-800 font-bold">
            ☰
          </button>
        </div>
      </div>
      <div 
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-4 px-4">
          <button className="block w-full bg-purple-100 text-purple-800 px-4 py-2 rounded mb-2">Log In</button>
          <button className="block w-full bg-purple-800 text-white px-4 py-2 rounded">Sign Up</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
