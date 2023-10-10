import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";


const SearchBar = () => {
  return (
    <form className="bg-white rounded-lg divide-x w-7/12 flex items-center mt-16">
    <input
      className="border rounded p-2 border-hidden flex-1"
      type="text"
      placeholder="Search Husky, Kitten, etc."
          />
          <span>|</span>
    <input
      className="border rounded p-2 border-hidden flex-1"
      type="text"
      placeholder="Enter City, State or ZIP"
    />
    <button
      className="rounded p-2 hover:cursor-pointer border-hidden bg-lime-400 m-2"
      type="submit"
    >
      <MagnifyingGlassIcon className="text-black w-6 h-6" />
    </button>
  </form>
  
  );
};
export default SearchBar;
