import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchBar = () => {
  return (
    <form className="mt-16 flex px-5 sm:px-0">
      <div className="bg-white rounded-lg flex items-center ">
        <div className="flex items-center flex-1">
          <input
            className="border rounded p-2 border-hidden flex-1 w-1/2 sm:w-full"
            type="text"
            placeholder="Search Husky, Kitten, etc."
          />
          <span className="h-[36px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100" />
          <input
            className="border rounded p-2 border-hidden flex-1 w-1/2 sm:w-full"
            type="text"
            placeholder="Enter City, State or ZIP"
          />
        </div>
        <button
          className="rounded p-2 hover:cursor-pointer hover:bg-lime-500 border-hidden bg-lime-400 m-2 flex items-center text-black font-semibold"
          type="submit"
        >
          <MagnifyingGlassIcon className="text-black w-5 h-5 me-1" />
          <span className="hidden sm:contents">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
