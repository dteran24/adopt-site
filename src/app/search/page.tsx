"use client";
import Items from "../components/search/items";
import Dropdown from "../components/search/dropdownmenu";
import combinedPetsData from "../models/combinedPetsData.json";
import { useEffect, useState } from "react";
import ActiveFilter from "../components/search/activefilters";
import { FilterOptions, PetInfo, URLParameters } from "../models/pet";
import { getAnimals, getToken, upperCase } from "../actions";
import { useSearchParams, useRouter } from "next/navigation";
import Loader from "../components/loader";

const Search = () => {
  const typeParams = useSearchParams();
  const router = useRouter();
  const animal = typeParams.get("type");
  const page = typeParams.get("page");
  const location = typeParams.get("location");
  const breedParam = typeParams.get("breed");

  const defaultLocation = location !== undefined ? location : "";

  const [type, setType] = useState(animal ? animal : "Dogs");
  const [breed, setBreed] = useState(breedParam ? breedParam : "");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(page ? Number(page) : 1);
  const [tokenData, setTokenData] = useState("");
  const [categoryValues, setCategoryValues] = useState<FilterOptions>({
    breed: breed,
    age: "",
    size: "",
    color: "",
    gender: "",
  });
  const [parameters, setParameters] = useState<URLParameters>({
    token: "",
    filter: categoryValues,
    type: type,
    location: defaultLocation!,
    page: pageNumber,
  });
  const [animals, setAnimals] = useState<PetInfo[]>();

  const updateURL = (newType: string) => {
    setType(newType);
    router.replace(
      `/search?type=${newType}&location=${location}&page=${pageNumber}&breed=${
        categoryValues.breed === "Any" ? "" : categoryValues.breed
      }`
    );
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
        location: defaultLocation!,
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
              location: defaultLocation!,
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
    const urlType = typeParams.get("type");
    if (urlType != type && urlType) {
      setType(urlType);
    }
  }, [typeParams, type, pageNumber]);

  useEffect(() => {
    handleTypeChange();
    setParameters({
      token: tokenData,
      filter: categoryValues,
      type: type,
      page: pageNumber,
      location: defaultLocation!,
    });
  }, [type, categoryValues, tokenData, pageNumber, location]);

  useEffect(() => {
    const getData = async () => {
      const animalsData = await getAnimals(
        parameters.token,
        parameters.filter,
        parameters.type,
        parameters.location,
        parameters.page
      );
      if (animalsData) {
        setAnimals(animalsData);
        setLoading(false);
      }
    };
    getData();
  }, [parameters]);

  const handleDropdownChange = (category: string, value: string) => {
    setCategoryValues({ ...categoryValues, [category]: value });
  };
  const setDefaultCategoryValues = () => {
    setBreed("Any");
    setCategoryValues((prev) => ({
      ...prev,
      breed: "Any",
      age: "Any",
      size: "Any",
      color: "Any",
      gender: "Any",
    }));
    setPageNumber(1);
    
  };

  let selectedData;
  switch (type) {
    case "Dogs":
      selectedData = combinedPetsData.dogs;
      break;
    case "Cats":
      selectedData = combinedPetsData.cats;
      break;
  }
  console.log("paramteters", parameters);
  console.log("resetBreed", breed);
  return (
    <main className="flex flex-col min-h-screen w-full bg-slate-100" id="items">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ActiveFilter
            setAnimal={setType}
            animal={type}
            setDefaultCategoryValues={setDefaultCategoryValues}
          />
          <div className="flex flex-col sm:flex-row justify-around">
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
                      animal={type}
                      breed={breed}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <Items
                parameters={parameters!}
                setPage={setPageNumber}
                animals={animals!}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Search;
