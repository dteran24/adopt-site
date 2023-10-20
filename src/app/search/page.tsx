"use client";
import Items from "../components/pagination";
import Dropdown from "../components/search/dropdownmenu";
import data from "../models/data.json";
import combinedPetsData from "../models/combinedPetsData.json";
import { useEffect, useState } from "react";
import ActiveFilter from "../components/search/activefilters";

const Search = () => {
  const [animal, setAnimal] = useState("Dog");

  const [filter, setFilter] = useState({
    breed: "",
    age: "",
    size: "",
    color: "",
  });
  const handleDropdownChange = (category: string, value: string) => {
    setFilter({ ...filter, [category]: value });
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
    return data.filter((item) => item.type === animal.toLowerCase());
  };
  console.log(animal);
  console.log(filter);
  return (
    <main
      className="flex flex-col justify-start min-h-screen w-full bg-slate-100"
      id="items"
    >
      <ActiveFilter setAnimal={setAnimal} animal={animal} />
      <div className="flex">
        <div className="w-72 rounded-lg bg-lime-500 m-5 mb-0">
          <ul className="px-5 pt-5 text-center">
            {selectedData?.map((filter, index) => (
              <li className="flex flex-col mb-20" key={index}>
                <span className="mb-3 text-lg font-bold">{filter.title}</span>
                <Dropdown
                  items={filter.item}
                  category={filter.title.toLowerCase()}
                  handleDropdownChange={handleDropdownChange}
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
