"use client";
import { PetInfo, URLParameters } from "../../models/pet";
import Card from "../card";

type Pets = {
  animals: PetInfo[];
}

const Items = (props: Pets) => {
  const { animals } = props;
  return (
    <div className="bg-slate-100 text-black w-full">
      {animals?.length != 0 ? (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3 2xl:grid-cols-4 gap-y-10 px-5 mx-auto mt-5"
            id="grid"
          >
            {animals?.map((animal: PetInfo, index: number) => (
              <div key={index} className="flex justify-center">
                <Card animal={animal} />
              </div>
            ))}
          </div>
       
        </>
      ) : (<div className="flex justify-center items-center mt-10 md:h-96 md:w-96 md:me-72 text-lg font-semibold">No Results Found!</div>
        
      )}
    </div>
  );
};

export default Items;
