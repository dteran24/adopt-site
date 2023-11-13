import { getAnimals } from "@/app/actions";
import { PetInfo, searchBarParams } from "@/app/models/pet";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState<searchBarParams>({
    animal: "",
    location: "",
  });

  return (
    <form className="mt-16 flex px-5 sm:px-0 text-black">
      <div className="bg-white rounded-lg flex items-center ">
        <div className="flex items-center flex-1 flex-col sm:flex-row">
          <input
            className="sm:w-full rounded-md border-0 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Search Husky, Kitten, etc."
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                animal: e.target.value,
              }))
            }
          />
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
          />
        </div>
        <Link
          href={`/search?type=${
            searchParams.animal ? searchParams.animal : "Dogs"
          }&location=${
            searchParams.location ? searchParams.location : ""
          }&page=1`}
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
