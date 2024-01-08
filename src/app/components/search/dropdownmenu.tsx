/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Breed, FilterOptions } from "@/app/models/pet";
import React, { useEffect, useState, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
type DropdownProps = {
  items: string[];
  setAnimal?: React.Dispatch<React.SetStateAction<string>>;
  animal?: string;
  category?: string;
  handleDropdownChange?: (category: string, value: string) => void;
  setDefaultCategoryValues?: () => void;
  breed?: string;
  breedList?: Breed[];
  categoryValues?: FilterOptions;
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
    breedList,
    categoryValues,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(
    category === "breed" ? breed : category ? "Any" : animal
  );
  const [searchParams, setSearchParams] = useState("");
  const dropDownRef = useRef(null);
  const filteredBreeds = breedList?.filter((breed) =>
    breed.name.toLowerCase().includes(searchParams.toLowerCase())
  );
//set Values to Any if there is no filter value
  useEffect(() => {
    if (category === "breed") {
      setValue(categoryValues?.breed ? categoryValues.breed : "Any");
    }
    if (category === "age") {
      setValue(categoryValues?.age ? categoryValues.age : "Any");
    }
    if (category === "size") {
      setValue(categoryValues?.size ? categoryValues.size : "Any");
    }
    if (category === "color") {
      setValue(categoryValues?.color ? categoryValues.color : "Any");
    }
    if (category === "gender") {
      setValue(categoryValues?.gender ? categoryValues.gender : "Any");
    }

    if (!category) {
      setValue(animal);
    }
  }, [animal, breed, categoryValues]);

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
  //closes dropdown when clicking outside
  useOnClickOutside(dropDownRef, () => {
    setIsOpen(false);
  });
  return (
    <div
      className="relative inline-block text-left text-center"
      ref={dropDownRef}
    >
      {category === "breed" && isOpen ? (
        <input
          className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center w-44 justify-between"
          type="text"
          placeholder={"Enter Breed"}
          onChange={(e) => setSearchParams(e.target.value)}
          value={searchParams}
        />
      ) : (
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
      )}
      {isOpen && (
        <div
          className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
          ref={category == "breed" ? null : dropDownRef}
        >
          <div className="py-1 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {category === "breed"
              ? // Render the list for "breed" category
                filteredBreeds?.map((value, index) => (
                  <option
                    key={index}
                    value={value.name}
                    className="text-black text-left hover:cursor-pointer hover:bg-slate-100"
                    onClick={(e) => selectValue(e.currentTarget)}
                  >
                    {value.name}
                  </option>
                ))
              : // Render the list for other categories
                items.map((value, index) => (
                  <option
                    key={index}
                    value={value}
                    className="text-black text-left hover:cursor-pointer hover:bg-slate-100"
                    onClick={(e) => selectValue(e.currentTarget)}
                  >
                    {value}
                  </option>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
