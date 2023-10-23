import Card from "../card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
const names = [
  {
    name: "Apple",
    img: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Carrot",
    img: "https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Rufus",
    img: "https://images.pexels.com/photos/662417/pexels-photo-662417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];
const CardGroup = () => {
  return (
    <section className="bg-slate-100">
      <div className="pt-10">
        <h1 className="text-lg text-center text-lime-500 font-medium">
          Pets Nearby
        </h1>
        <h2 className="text-2xl text-center text-black font-medium">
          Quickly take a look at available pets in your area
        </h2>
      </div>
      <ul className="flex flex-col lg:flex-row lg:justify-center py-10 px-5">
        {names.map((name, index) => (
          <li className="mx-auto mb-4 lg:mb-0 px-5" key={index}>
            <Card pet={name} data={false} />
          </li>
        ))}
        <li className="flex items-center mx-auto xl:ms-5">
          <button className="hover:cursor-pointer hover:text-lime-600 text-white lg:text-lime-500 text-lg bg-lime-500 lg:bg-slate-100 rounded-lg lg:rounded-none p-4 lg:p-0">
            <ArrowRightIcon className="hidden lg:block"/> View More
          </button>
        </li>
      </ul>
    </section>
  );
};
export default CardGroup;
