"use client";
import React, { useEffect, useState } from "react";

type DropdownProps = {
  items: string[];
  setAnimal?: React.Dispatch<React.SetStateAction<string>>;
  animal?: string;
  category?: string;
  handleDropdownChange?: (category: string, value: string) => void;
};

const Dropdown = (props: DropdownProps) => {
  const { items, setAnimal, category, handleDropdownChange, animal } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("Any");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const selectValue = async (e: HTMLOptionElement) => {
    toggleDropdown();
    setValue(e.value);
    if (setAnimal) {
      setAnimal(e.value);
    }
    if (category && handleDropdownChange) {
      handleDropdownChange(category, e.value);
    }
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
            {items.map((value, index) => {
              return (
                <option
                  key={index}
                  value={value}
                  className="text-black text-left hover:cursor-pointer hover:bg-slate-100"
                  onClick={(e) => selectValue(e.currentTarget)}
                >
                  {value}
                </option>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
