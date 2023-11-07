"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Organization, PetInfo } from "../../models/pet";
import { getAnimalByID, getOrganization, photoHandler } from "../../actions";
import Image from "next/image";
import Link from "next/link";

const PetDetail = () => {
  const extractNumbersFromUrl = (path: string) => {
    const numbers = path.match(/\d+/);
    return numbers ? Number(numbers[0]) : null;
  };
  const petID = extractNumbersFromUrl(usePathname());
  const [animal, setAnimal] = useState<PetInfo>();
  const [photo, setPhoto] = useState<string>();
  const [org, setOrg] = useState<Organization>();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const getAnimal = async () => {
      const response = await getAnimalByID(petID!, token!);
      if (response) {
        setAnimal(response);
        const orgResponse = await getOrganization(
          response.organization_id,
          token!
        );
        if (orgResponse) {
          setOrg(orgResponse);
        }
        const image = photoHandler(response);
        if (image) {
          setPhoto(image);
        }
      }
    };

    getAnimal();
  }, []);
  console.log(animal);
  console.log(org);
  return (
    <main className="flex justify-around min-h-screen w-full bg-slate-100 text-black items-center">
      <div className="bg-white rounded p-5 flex flex-col w-1/2 my-5">
        <h1 className="text-4xl mb-5">{animal?.name}</h1>
        <span className="mb-5">
          {animal?.breeds.primary} - {animal?.contact.address.city},
          {animal?.contact.address.state}
        </span>
        <hr />
        <h1 className="text-4xl my-5">About</h1>
        <h2 className="text-2xl my-2">Characteristics</h2>
        {animal?.tags.length && animal.tags.length > 0 ? (
          <ul className="">
            {animal?.tags.map((tags, index) => {
              return <li key={index}>{tags}</li>;
            })}
          </ul>
        ) : (
          "No info provided."
        )}
        <h2 className="text-2xl my-2">Coat Length</h2>
        {animal?.coat ? <span>{animal.coat}</span> : "No info provided."}
        <h2 className="text-2xl my-2">House Trained</h2>
        <span>
          {animal?.attributes.house_trained ? "Yes" : "No info provided."}
        </span>
        <h2 className="text-2xl my-2">Health</h2>
        <span>
          {animal?.attributes.shots_current
            ? "Shots up to date"
            : "Shots not up to date"}
        </span>{" "}
        <span>
          {animal?.attributes.spayed_neutered
            ? "spayed / nuetered"
            : " Not nuetered /spayed"}
        </span>
        <h2 className="text-2xl my-2">Good with</h2>
        {animal?.environment.cats &&
        animal.environment.dogs &&
        animal.environment.children ? (
          <>
            <span>{animal?.environment.cats ? "Cats" : ""}</span>
            <span>{animal?.environment.dogs ? "dogs" : ""}</span>
            <span>{animal?.environment.children ? "children" : ""}</span>
          </>
        ) : (
          "No info provided."
        )}
        <hr />
        <h1 className="text-4xl my-5">Meet {animal?.name}</h1>
        <p className="w-full">{animal?.description}</p>
      </div>
      <div className="">
        <div>
          <Image
            className="rounded"
            src={photo!}
            alt="animal"
            width={300}
            height={300}
          />
          <Link href={""}>
            <button className="bg-lime-500 p-5 w-full rounded">Like</button>
          </Link>
        </div>
        <div className="text-black">
          <h1 className="text-xl text-center">{org?.name}</h1>
          <div>
            <h1 className="text-lg">Contact Information</h1>
            <span>{org?.email}</span> <span>{org?.phone}</span>
            <h1 className="text-lg">Address</h1>
            <span>{`${org?.address.address1} ${org?.address.city}, ${org?.address.state} ${org?.address.postcode}`}</span>
            <span>Website: {org?.website}</span>
          </div>
        </div>
      </div>
    </main>
  );
};
export default PetDetail;
