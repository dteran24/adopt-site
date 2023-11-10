import { useState } from "react";
import Image from "next/image";
import { PetInfo } from "../models/pet";
import Link from "next/link";
import { photoHandler } from "../actions";

interface props {
  animal: PetInfo;
}

const Card = (cardProps: props) => {
  const { animal } = cardProps;

  const photo = photoHandler(animal);
  return (
    <Link href={`search/${animal.id}`}>
      <div className="group bg-white rounded-lg w-full lg:w-72 hover:cursor-pointer">
        <Image
          className="rounded-t-lg h-80 object-cover object-center"
          src={photo!}
          width={500}
          height={500}
          alt="pet"
        />
        <h2 className="text-black text-center text-xl font-bold py-2 group-hover:underline underline-offset-4 decoration-lime-400">
          {animal.name}
        </h2>
        <div className="text-center text-slate-400 pb-2">
          <span>{animal.age}</span> <span>-</span>{" "}
          <span>{animal.breeds.primary}</span>
        </div>
      </div>
    </Link>
  );
};
export default Card;

