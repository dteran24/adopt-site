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
    <section className="">
      <h1 className="text-3xl text-center">Pets Nearby!</h1>
      <ul className="flex justify-around py-10">
        {names.map((name, index) => (
          <li className="" key={index}>
            <Card pet={name} />
          </li>
        ))}
        <div className="flex items-center">
          <div className="hover:cursor-pointer hover:text-lime-400">
            <ArrowRightIcon /> View More
          </div>
        </div>
      </ul>
    </section>
  );
};
export default CardGroup;
