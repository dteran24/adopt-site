"use client";
import { PetInfo, URLParameters } from "../../models/pet";
import Card from "../card";
import { getAnimals } from "@/app/actions";
import { useEffect, useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

interface Pets {
  parameters: URLParameters;
  animals: PetInfo[];
}

const Items = (props: Pets) => {
  const { parameters, animals } = props;
  return (
    <div className="bg-slate-100 text-black w-full">
      {animals?.length != 0 ? (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3 2xl: grid-cols0=-4 gap-y-10 px-5 mx-auto mt-5"
            id="grid"
          >
            {animals?.map((animal: PetInfo, index: number) => (
              <div key={index} className="flex justify-center">
                <Card animal={animal} />
              </div>
            ))}
          </div>
       
        </>
      ) : (
        "No Results Found!"
      )}
    </div>
  );
};

export default Items;
