"use client";
import { PiDogLight, PiCatLight } from "react-icons/pi";
import Dropdown from "./dropdownmenu";


type ActiveFilterProps = {
  animal: string;
  setAnimal?: React.Dispatch<React.SetStateAction<string>>;
  
};

const ActiveFilter = (props: ActiveFilterProps) => {
  const { setAnimal, animal } = props;
  const animals = ["Dog", "Cat"];

  const animalMapping: { [key: string]: JSX.Element } = {
    Dog: <PiDogLight className="w-12 h-12" />,
    Cat: <PiCatLight className="w-12 h-12" />,
  };

  const selectedIcon = animalMapping[animal];

  return (
    <div className="text-black flex justify-around w-full items-center mt-3">
      <div className="flex items-center gap-x-5">
        {selectedIcon}
        <Dropdown items={animals} setAnimal={setAnimal} animal={animal} />
      </div>
    </div>
  );
};

export default ActiveFilter;
