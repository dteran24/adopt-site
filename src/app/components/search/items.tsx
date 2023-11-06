"use client";
import { PetInfo, URLParameters } from "../../models/pet";
import Card from "../card";
import { getAnimals } from "@/app/actions";
import { useEffect, useState } from "react";

interface Pets {
  paramters: URLParameters;
}

const Items = (props: Pets) => {
  const { paramters } = props;
  const [animals, setAnimals] = useState<PetInfo[]>();

  useEffect(() => {
    const getData = async () => {
      const animalsData = await getAnimals(
        paramters.token,
        paramters.filter,
        paramters.type,
        paramters.location,
        paramters.page
      );
      setAnimals(animalsData);
    };
    getData();
  }, [paramters]);
  console.log("paramters", paramters);
  return (
    <div className="bg-slate-100 text-black w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3 gap-y-10 px-5 mx-auto mt-5">
        {animals?.map((animal: PetInfo, index: number) => (
          <div key={index} className="flex justify-center">
            <Card animal={animal} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
