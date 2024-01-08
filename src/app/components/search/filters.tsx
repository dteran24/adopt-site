"use client";
import { useState } from "react";
import ActiveFilter from "./activefilters";
import Dropdown from "./dropdownmenu";
import data from '../../models/combinedPetsData.json';

const Filters = () => {
  const [type, setType] = useState("Dog");
  const [categoryValues, setCategoryValues] = useState({
    breed: "Any",
    age: "Any",
    size: "Any",
    color: "Any",
    gender: "Any",
  });

  const handleDropdownChange = (category: string, value: string) => {
    setCategoryValues({ ...categoryValues, [category]: value });
  };
  const setDefaultCategoryValues = () => {
    const defaultValues = {
      breed: "Any",
      age: "Any",
      size: "Any",
      color: "Any",
      gender: "Any",
    };
    setCategoryValues(defaultValues);
  };

  let selectedData;
  switch (type) {
    case "Dog":
      selectedData = data.dogs;
      break;
    case "Cat":
      selectedData = data.cats;
      break;
  }
  const upperCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <main
      className="flex flex-col justify-start min-h-screen w-full bg-slate-100"
      id="items"
    >
      <ActiveFilter setAnimal={setType} animal={type} setDefaultCategoryValues={setDefaultCategoryValues} />
      <div className="flex flex-col sm:flex-row">
        <div className="w-72 rounded-lg bg-lime-500 m-5 mb-0 mx-auto sm:mx-5">
          <ul className="px-5 pt-5 text-center">
            {selectedData?.map((filter, index) => (
              <li className="flex flex-col mb-5 lg:mb-20" key={index}>
                <span className="mb-3 text-lg font-bold">
                  {upperCase(filter.title)}
                </span>
                <Dropdown
                  items={filter.item}
                  category={filter.title}
                  handleDropdownChange={handleDropdownChange}
                  setDefaultCategoryValues={setDefaultCategoryValues}
                  animal={type}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};
export default Filters;
