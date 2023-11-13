"use client";
import { PetInfo, URLParameters } from "../../models/pet";
import Card from "../card";
import { getAnimals } from "@/app/actions";
import { useEffect, useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

interface Pets {
  parameters: URLParameters;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  animals: PetInfo[];
}

const Items = (props: Pets) => {
  const { parameters, setPage, animals } = props;
  return (
    <div className="bg-slate-100 text-black w-full">
      {animals?.length != 0 ? (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3 gap-y-10 px-5 mx-auto mt-5"
            id="grid"
          >
            {animals?.map((animal: PetInfo, index: number) => (
              <div key={index} className="flex justify-center">
                <Card animal={animal} />
              </div>
            ))}
          </div>
          <div className="text-black mt-5 flex justify-center mb-5 gap-x-32">
            {parameters.page && parameters.page <= 1 ? (
              ""
            ) : (
              <a href="#grid">
                <button
                  className="rounded bg-lime-500 p-2 hover:bg-lime-600 w-12"
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <FaLessThan className="mx-auto" />
                </button>
              </a>
            )}
            <a href="#grid">
              <button
                className="rounded bg-lime-500 p-2 hover:bg-lime-600 w-12"
                onClick={() => setPage((prev) => prev + 1)}
              >
                <FaGreaterThan className="mx-auto" />
              </button>
            </a>
          </div>
        </>
      ) : (
        "No Results Found!"
      )}
    </div>
  );
};

export default Items;
