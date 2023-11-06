"use client";
import Items from "../components/search/items";
import Dropdown from "../components/search/dropdownmenu";
import data from "../models/data.json";
import combinedPetsData from "../models/combinedPetsData.json";
import { useEffect, useState } from "react";
import ActiveFilter from "../components/search/activefilters";
import { FilterOptions, URLParameters } from "../models/pet";
import { getToken } from "../actions";

const Search = () => {
  const [type, setType] = useState("Dog");
  const [tokenData, setTokenData] = useState("");
  const [categoryValues, setCategoryValues] = useState<FilterOptions>({
    breed: "",
    age: "",
    size: "",
    color: "",
    gender: "",
  });
  const [parameters, setParameters] = useState<URLParameters>({
    token: "",
    filter: categoryValues,
    type: type,
    location: "dallas, texas",
    limit: 20,
    page: 1,
  });

  useEffect(() => {
    console.log("Getting token from sessionStorage");
    const storedToken = sessionStorage.getItem("token");
    console.log("stored", storedToken);

    if (storedToken) {
      console.log("setting PArams");
      setParameters({
        token: storedToken,
        filter: categoryValues,
        type: type,
      });
      setTokenData(storedToken);
    } else {
      const getTokenData = async () => {
        try {
          let data = await getToken();
          console.log("Token from API:", data);
          if (data) {
            setParameters({
              token: data,
              filter: categoryValues,
              type: type,
            });
            setTokenData(data);
          }
        } catch (error) {
          console.error("Error getting token:", error);
        }
      };
      getTokenData();
    }
  }, []);

  useEffect(() => {
    console.log("Updating parameters");
    console.log("Token Data:", tokenData);
    console.log("Type:", type);
    console.log("Category Values:", categoryValues);

    setParameters({
      token: tokenData,
      filter: categoryValues,
      type: type,
    });
  }, [type, categoryValues, tokenData]);

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
      selectedData = combinedPetsData.dogs;
      break;
    case "Cat":
      selectedData = combinedPetsData.cats;
      break;
  }

  const upperCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  console.log("SearchPage", parameters);
  return (
    <main
      className="flex flex-col justify-start min-h-screen w-full bg-slate-100"
      id="items"
    >
      <ActiveFilter setAnimal={setType} animal={type} />
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
        {tokenData ? <Items paramters={parameters!} /> : "No token"}
      </div>
    </main>
  );
};

export default Search;
