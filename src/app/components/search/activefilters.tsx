"use client";
import { PiDogLight, PiCatLight } from "react-icons/pi";
import Dropdown from "./dropdownmenu";

type ActiveFilterProps = {
  animal: string;
  setAnimal?: React.Dispatch<React.SetStateAction<string>>;
  setDefaultCategoryValues: () => void;
};

const ActiveFilter = (props: ActiveFilterProps) => {
  const { setAnimal, animal, setDefaultCategoryValues } = props;
  const animals = ["Dogs", "Cats"];

  const animalMapping: { [key: string]: JSX.Element } = {
    Dogs: <PiDogLight className="w-12 h-12" />,
    Cats: <PiCatLight className="w-12 h-12" />,
  };
//change icon depending on type
  const selectedIcon = animalMapping[animal];

  return (
    <div className="text-black flex justify-around w-full items-center mt-3">
      <div className="flex items-center gap-x-5">
        {selectedIcon}
        <Dropdown items={animals} setAnimal={setAnimal} animal={animal} setDefaultCategoryValues={setDefaultCategoryValues} />
      </div>
    </div>
  );
};

export default ActiveFilter;
