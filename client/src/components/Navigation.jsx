import React, { useState, useEffect } from 'react';

function Navigation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: '🚂', label: 'Train' },
    { icon: '🏢', label: 'Station' },
    { icon: '👍', label: 'Appreciation' },
    { icon: '❓', label: 'Enquiry' },
    { icon: '🔍', label: 'Track Your Concern' },
    { icon: '💡', label: 'Suggestions' },
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <button 
        className="md:hidden absolute top-15 left-4 z-30 bg-purple-800 text-white px-3 py-2 font-bold rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <nav className={`bg-gray-100 p-4 w-64 fixed top-0 left-0 h-[80%] transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:w-[300px] md:my-2 z-40`}>
        <ul className="space-y-4 pt-20 md:pt-0">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center space-x-2 p-2 rounded shadow cursor-pointer transition-colors duration-200 ${
                index === activeIndex ? 'bg-purple-800 text-white' : 'bg-white text-black'
              }`}
              onClick={() => handleClick(index)}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
