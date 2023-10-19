"use client";
import React, { useState } from "react";

interface DropdownProps {}

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("Any");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left text-center">
      <button
        onClick={toggleDropdown}
        className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center w-44 justify-between"
      >
        {value}
        <svg
          className={`w-4 h-4 ml-2 ${isOpen ? "transform -rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Item 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Item 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Item 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
