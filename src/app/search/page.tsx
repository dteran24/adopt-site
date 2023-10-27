"use client";
import Items from "../components/search/pagination";
import Dropdown from "../components/search/dropdownmenu";
import data from "../models/data.json";
import combinedPetsData from "../models/combinedPetsData.json";
import { useEffect, useState } from "react";
import ActiveFilter from "../components/search/activefilters";

const Search = () => {
  const [animal, setAnimal] = useState("Dog");

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
  switch (animal) {
    case "Dog":
      selectedData = combinedPetsData.dogs;
      break;
    case "Cat":
      selectedData = combinedPetsData.cats;
      break;
  }
  const filterData = () => {
    return data.filter((item) => {
      return (
        item.type === animal.toLowerCase() &&
        (categoryValues.breed === "Any" ||
          item.breed === categoryValues.breed) &&
        (categoryValues.age === "Any" || item.age === categoryValues.age) &&
        (categoryValues.size === "Any" || item.size === categoryValues.size) &&
        (categoryValues.color === "Any" ||
          item.color === categoryValues.color) &&
        (categoryValues.gender === "Any" ||
          item.gender === categoryValues.gender)
      );
    });
  };
  const upperCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <main
      className="flex flex-col justify-start min-h-screen w-full bg-slate-100"
      id="items"
    >
      <ActiveFilter setAnimal={setAnimal} animal={animal} />
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
                  animal={animal}
                />
              </li>
            ))}
          </ul>
        </div>
        <Items pets={filterData()} />
      </div>
    </main>
  );
};

export default Search;
