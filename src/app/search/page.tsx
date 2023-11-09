"use client";
import Items from "../components/search/items";
import Dropdown from "../components/search/dropdownmenu";
import combinedPetsData from "../models/combinedPetsData.json";
import { useEffect, useState } from "react";
import ActiveFilter from "../components/search/activefilters";
import { FilterOptions, PetInfo, URLParameters } from "../models/pet";
import { getToken, upperCase } from "../actions";
import { useSearchParams, useRouter } from "next/navigation";


const Search = () => {
  const typeParams = useSearchParams();
  const router = useRouter();
  const animal = typeParams.get("type");
  
  const [type, setType] = useState(animal ? animal : "");
  const [pageNumber, setPageNumber] = useState(1);
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
    page: pageNumber,
  });
  const updateURL = (newType: string) => {
    setType(newType);
    router.replace(`/search?type=${newType}&page=${pageNumber}`);
  };

  const handleTypeChange = () => {
    updateURL(type);
  };
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
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
    handleTypeChange();
    setParameters({
      token: tokenData,
      filter: categoryValues,
      type: type,
      page: pageNumber,
    });
  }, [type, categoryValues, tokenData, pageNumber]);

  useEffect(() => {
    const urlType = typeParams.get("type");
    if (urlType != type && urlType) {
      setType(urlType);
    }
  },[typeParams])

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
    case "dog":
      selectedData = combinedPetsData.dogs;
      break;
    case "cat":
      selectedData = combinedPetsData.cats;
      break;
  }



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
        <div className="flex flex-col">
          {tokenData ? (
            <Items paramters={parameters!} setPage={setPageNumber} />
          ) : (
            "No token"
          )}
        </div>
      </div>
    </main>
  );
};

export default Search;
