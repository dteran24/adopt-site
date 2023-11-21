"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
type DropdownProps = {
  items: string[];
  setAnimal?: React.Dispatch<React.SetStateAction<string>>;
  animal?: string;
  category?: string;
  handleDropdownChange?: (category: string, value: string) => void;
  setDefaultCategoryValues?: () => void;
  breed: string;
};

const Dropdown = (props: DropdownProps) => {
  const {
    items,
    setAnimal,
    category,
    handleDropdownChange,
    animal,
    setDefaultCategoryValues,
    breed,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(
    category === "breed" ? breed : category ? "Any" : animal
  );
  const dropDownRef = useRef(null);

  useEffect(() => {
    if (category === "breed") {
      setValue(breed ? breed: "Any");
    }
    if (!category) {
      setValue(animal);
    }
  }, [animal]);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const selectValue = (e: HTMLOptionElement) => {
    if (setAnimal && setDefaultCategoryValues) {
      setAnimal(e.value);
      setDefaultCategoryValues();
    }
    if (category && handleDropdownChange) {
      handleDropdownChange(category, e.value);
    }
    setValue(e.value);
    setIsOpen(false);
  };
  useOnClickOutside(dropDownRef, () => {
    setIsOpen(false);
  });
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
        <div
          className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          ref={dropDownRef}
        >
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
