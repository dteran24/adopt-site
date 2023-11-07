import { useState } from "react";
import Image from "next/image";
import { PetInfo } from "../models/pet";
import Link from "next/link";

interface props {
  animal: PetInfo;
  fakeAnimal?: string;
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
        {/* <div
        className="w-full h-80 bg-cover bg-center rounded-t-lg"
        style={imageStyle}
      ></div> */}
        <h2 className="text-black text-center text-xl font-bold py-2 group-hover:underline underline-offset-4 decoration-lime-400">
          {animal.name}
        </h2>
        <div className="text-center text-slate-400">
          <span>{animal.age}</span> <span>-</span>{" "}
          <span>{animal.breeds.primary}</span>
        </div>
      </div>
    </Link>
  );
};
export default Card;
const photoHandler = (animalData: PetInfo) => {
  if (animalData.photos.length !== 0) {
    if (animalData.photos[0].full) {
      return animalData.photos[0].full;
    } else if (animalData.photos[0].large) {
      return animalData.photos[0].large;
    } else if (animalData.photos[0].medium) {
      return animalData.photos[0].medium;
    } else if (animalData.photos[0].small) {
      return animalData.photos[0].small;
    }
  } else {
    return "https://cdn.stocksnap.io/img-thumbs/960w/husky-animal_GF7YFWSR88.jpg";
  }
  // Handle the case where there are no photos or none of the sizes are available.
  // Replace with a default image URL or handle it according to your use case.
};
