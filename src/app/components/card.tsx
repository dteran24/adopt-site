import { useState } from "react";
import Image from "next/image";
import { PetInfo } from "../models/pet";

interface props {
  animal: PetInfo;
  fakeAnimal?: string;
}

const Card = (cardProps: props) => {
  const { animal, fakeAnimal } = cardProps;
  // const imageStyle = {
  //   backgroundImage: `url(${pet.img})`,
  // };
  return (
    <div className="group bg-white rounded-lg w-full lg:w-72 hover:cursor-pointer">
      <Image
        className="rounded-t-lg h-80 object-cover object-center"
        src={animal.photos[0].full}
        width={500}
        height={500}
        alt="pet"
      />
      {/* <div
        className="w-full h-80 bg-cover bg-center rounded-t-lg"
        style={imageStyle}
      ></div> */}
      <h2 className="text-black text-center text-xl font-bold py-2 group-hover:underline underline-offset-4 decoration-lime-400">
        {animal.name}
      </h2>
    </div>
  );
};
export default Card;
