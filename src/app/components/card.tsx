import { useState } from "react";
import Image from "next/image";
import { PetInfo } from "../models/pet";

interface props {
  animal: PetInfo;
  fakeAnimal?: string;
}

const Card = (cardProps: props) => {
  const { animal, fakeAnimal } = cardProps;

  const photo = photoHandler(animal);
  return (
    <div className="group bg-white rounded-lg w-full lg:w-72 hover:cursor-pointer">
      <Image
        className="rounded-t-lg h-80 object-cover object-center"
        src={photo}
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
const photoHandler = (animalData: PetInfo) => {
  if (animalData.photos) {
    if (animalData.photos[0].full) {
      return animalData.photos[0].full;
    } else if (animalData.photos[0].large) {
      return animalData.photos[0].large;
    } else if (animalData.photos[0].medium) {
      return animalData.photos[0].medium;
    } else if (animalData.photos[0].small) {
      return animalData.photos[0].small;
    }
  }
  // Handle the case where there are no photos or none of the sizes are available.
  return "default-image.jpg"; // Replace with a default image URL or handle it according to your use case.
};
