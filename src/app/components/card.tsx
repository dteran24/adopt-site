import { useState } from "react";
import Image from "next/image";
import { Pet } from "../models/pet";

interface props {
  pet: Pet;
}

const Card = (cardProps: props) => {
  const { pet } = cardProps;
  // const imageStyle = {
  //   backgroundImage: `url(${pet.img})`,
  // };
  return (
    <div className="group bg-white rounded-lg w-72 hover:cursor-pointer ">
      <Image src={pet.img} width={500} height={500} alt="pet"/>
      {/* <div
        className="w-full h-80 bg-cover bg-center rounded-t-lg"
        style={imageStyle}
      ></div> */}
      <h2 className="text-black text-center text-xl font-bold py-2 group-hover:underline underline-offset-4 decoration-lime-400">
        {pet.name}
      </h2>
    </div>
  );
};
export default Card;
