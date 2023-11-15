import { getAnimals } from "@/app/actions";
import { Breed, PetInfo, searchBarParams } from "@/app/models/pet";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
type SearchBarProps = {
  breedList: Breed[];
};

const SearchBar = (props: SearchBarProps) => {
  const [searchParams, setSearchParams] = useState<searchBarParams>({
    type: "",
    breed: "",
    location: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  const { breedList } = props;

  const filteredBreeds = breedList.filter((breed) =>
    breed.name.toLowerCase().includes(searchParams.breed.toLowerCase())
  );

  const findTypeWithDogOrCat = (breeds: Breed[]) => {
    const breedWithDogOrCat = breeds.find((breed) =>
      /\/v2\/types\/(dog|cat)/.test(breed._links.type.href)
    );
    
    return breedWithDogOrCat!._links.type.href.includes("dog")
      ? "Dogs"
      : "Cats"
  }

  useOnClickOutside(dropDownRef, () => {
    setIsOpen(false);
  });
  const dropDownHandler = (e: HTMLOptionElement) => {
    const animalType = findTypeWithDogOrCat(filteredBreeds);
    setSearchParams((prev) => ({ ...prev, breed: e.value, type: animalType! }));
    setIsOpen(false);
  };

  return (
    <form className="mt-16 flex px-5 sm:px-0 text-black">
      <div className="bg-white rounded-lg flex items-center ">
        <div className="relative flex items-center flex-1 flex-col sm:flex-row">
          <input
            className=" sm:w-full rounded-md border-0 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Search Husky, Kitten, etc."
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                breed: e.target.value,
              }))
            }
            onClick={() => setIsOpen(true)}
            value={searchParams.breed}
          />
          {isOpen && (
            <div
              className="absolute top-12 mt-2 max-w-96  rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 p-1"
              ref={dropDownRef}
            >
              <div className="py-1 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {filteredBreeds.length
                  ? filteredBreeds.map((value, index) => {
                      return (
                        <option
                          key={index}
                          value={value.name}
                          className="text-black text-left hover:cursor-pointer hover:bg-slate-100"
                          onClick={(e) => dropDownHandler(e.currentTarget)}
                        >
                          {value.name}
                        </option>
                      );
                    })
                  : "No Results Found"}
              </div>
            </div>
          )}
          <span className="h-[36px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100 hidden sm:flex " />
          <input
            className="sm:w-full rounded-md border-0 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Enter City, State or ZIP"
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            value={searchParams.location}
          />
        </div>
        <Link
          href={`/search?type=${searchParams.type}&breed=${searchParams.breed}&location${searchParams.location}&page=1`}
        >
          <button className="rounded p-2 hover:cursor-pointer hover:bg-lime-500 border-hidden bg-lime-400 m-2 flex items-center text-black font-semibold">
            <MagnifyingGlassIcon className="text-black w-5 h-5 me-1" />
            <span className="hidden sm:contents">Search</span>
          </button>
        </Link>
      </div>
    </form>
  );
};

export default SearchBar;
