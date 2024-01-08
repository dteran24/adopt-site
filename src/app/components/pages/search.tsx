/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Items from "../../components/search/items";
import Dropdown from "../../components/search/dropdownmenu";
import combinedPetsData from "../../models/combinedPetsData.json";
import { useEffect, useState } from "react";
import ActiveFilter from "../../components/search/activefilters";
import { Breed, FilterOptions, PetInfo, URLParameters } from "../../models/pet";
import { getAnimals, getBreedList, getToken, upperCase } from "../../actions";
import { useSearchParams, useRouter } from "next/navigation";
import Loader from "../../components/loader";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";

type searchProps = {
  token: string;
};

const SearchComponent = (props: searchProps) => {
  const { token } = props;
  const typeParams = useSearchParams();
  const router = useRouter();
  const animal = typeParams.get("type");
  const page = typeParams.get("page");
  const location = typeParams.get("location");
  const breedParam = typeParams.get("breed");

  const defaultLocation = location !== undefined ? location : "";

  const [type, setType] = useState(animal ? animal : "Dogs");
  const [breedList, setBreedList] = useState<Breed[]>();
  const [breed, setBreed] = useState(breedParam ? breedParam : "Any");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(page ? Number(page) : 1);
  const [maxPage, setMaxPage] = useState();
  const [tokenData, setTokenData] = useState(token);
  const [categoryValues, setCategoryValues] = useState<FilterOptions>({
    breed: breed,
    age: "Any",
    size: "Any",
    color: "Any",
    gender: "Any",
  });
  const [parameters, setParameters] = useState<URLParameters>({
    token: "",
    filter: categoryValues,
    type: type,
    location: defaultLocation!,
    page: pageNumber,
  });
  const [animals, setAnimals] = useState<PetInfo[]>();
  const [resetBttn, setResetBttn] = useState(false);
  const [error, setError] = useState(false);

  //update url when type changes
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

  //get breed list for animal type
  const fetchBreeds = async (token: string, type: string) => {
    const response = await getBreedList(
      token,
      type.toLowerCase().replace("s", "")
    );
    if (response) {
      setBreedList(response);
    }
  };
  //inital load get token if it does not exsit if it does get param values
  useEffect(() => {
    if (tokenData) {
      setParameters({
        token: tokenData,
        filter: categoryValues,
        type: type,
        location: defaultLocation!,
      });
      setTokenData(tokenData);
      fetchBreeds(tokenData, type);
    } else {
      const getTokenData = async () => {
        try {
          let data = await getToken();
          if (data) {
            setParameters({
              token: data,
              filter: categoryValues,
              type: type,
              location: defaultLocation!,
            });
            setTokenData(data);
            fetchBreeds(data, type);
          }
        } catch (error) {
          console.error("Error getting token:", error);
        }
      };

      getTokenData();
    }
  }, [type]);

  //update url when params change
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
    displayResetButton();
  }, [type, categoryValues, tokenData, pageNumber, location]);

  //get petdata when params change
  useEffect(() => {
    const getData = async () => {
      try {
        const animalsData = await getAnimals(
          parameters.token,
          parameters.filter,
          parameters.type,
          parameters.location,
          parameters.page
        );

        if (animalsData) {
          setMaxPage(animalsData.pagination.total_pages);
          setAnimals(animalsData.animals);
          setLoading(false);
        }
      } catch (error) {
        console.error("API request failed", error);
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, [parameters]);

  const handleDropdownChange = (category: string, value: string) => {
    setCategoryValues({ ...categoryValues, [category]: value });
  };
  //reset values when type cahnges
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
  //reset bttn show when not default
  const displayResetButton = () => {
    if (
      categoryValues.age != ("Any" || "") ||
      categoryValues.breed != ("Any" || "") ||
      categoryValues.size != ("Any" || "") ||
      categoryValues.color != ("Any" || "") ||
      categoryValues.gender != ("Any" || "")
    ) {
      setResetBttn(true);
    } else {
      setResetBttn(false);
    }
  };

  let selectedData;

  //used mostly for labels
  switch (type) {
    case "Dogs":
      selectedData = combinedPetsData.dogs;
      break;
    case "Cats":
      selectedData = combinedPetsData.cats;
      break;
  }

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
          {error ? (
            <div className="text-black">Something went wrong...</div>
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-col sm:justify-between sm:flex-row">
                <div className="w-72 rounded-lg bg-lime-500 m-5 mb-0 mx-auto sm:mx-5">
                  <ul className="px-5 pt-5 text-center">
                    {selectedData?.map((filter, index) => (
                      <li className="flex flex-col mb-5 lg:mb-20" key={index}>
                        <span className="mb-3 text-lg font-bold">
                          {upperCase(filter.title)}
                        </span>
                        <Dropdown
                          breedList={breedList}
                          items={filter.item}
                          category={filter.title}
                          handleDropdownChange={handleDropdownChange}
                          animal={type}
                          categoryValues={categoryValues}
                          breed={breed}
                        />
                      </li>
                    ))}
                    {resetBttn && (
                      <button
                        className="bg-slate-300 p-2 rounded text-black mb-5"
                        onClick={() => setDefaultCategoryValues()}
                      >
                        Reset Filters
                      </button>
                    )}
                  </ul>
                </div>
                <div id="grid">
                  {animals ? (
                    <>
                      <Items animals={animals} />
                    </>
                  ) : (
                    "..."
                  )}
                </div>
              </div>
              <div className="text-black my-10 flex justify-center sm:ms-72 gap-x-64">
                {parameters.page && parameters.page <= 1 ? (
                  ""
                ) : (
                  <a href="#grid">
                    <button
                      className="rounded bg-lime-400 p-2 hover:bg-lime-600 w-24"
                      onClick={() => setPageNumber((prev) => prev - 1)}
                    >
                      <FaLessThan className="mx-auto text-lg" />
                    </button>
                  </a>
                )}
                {maxPage == 1 || parameters.page == maxPage ? (
                  ""
                ) : (
                  <a href="#grid">
                    <button
                      className="rounded bg-lime-400 p-2 hover:bg-lime-600 w-24"
                      onClick={() => setPageNumber((prev) => prev + 1)}
                    >
                      <FaGreaterThan className="mx-auto text-lg" />
                    </button>
                  </a>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default SearchComponent;
