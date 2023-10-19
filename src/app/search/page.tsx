import Card from "../components/card";
import Items from "../components/pagination";
import Dropdown from "../components/search/dropdownmenu";
import data from "../models/data.json";
const Search = () => {
  const filter = ["Breed", "Age", "Size", "Gender", "Color"];
  return (
    <main className="flex flex justify-start min-h-screen w-full bg-slate-100">
      <section className="w-72 rounded-lg bg-lime-500 m-5 mb-0">
        <ul className="px-5 pt-5 text-center">
          {filter.map((title, index) => {
            return (
              <li className="flex flex-col mb-20" key={index}>
                <span className="mb-3 text-lg font-bold">{title}</span>
                <Dropdown />
              </li>
            );
          })}
        </ul>
      </section>
      <Items pets={data} />
    </main>
  );
};

export default Search;
