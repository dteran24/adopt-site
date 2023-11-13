"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Organization, PetInfo } from "../../models/pet";
import { getAnimalByID, getOrganization, photoHandler } from "../../actions";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineFacebook,
} from "react-icons/ai";
import { GiEarthAmerica } from "react-icons/gi";
import Loader from "@/app/components/loader";

const PetDetail = () => {
  const extractNumbersFromUrl = (path: string) => {
    const numbers = path.match(/\d+/);
    return numbers ? Number(numbers[0]) : null;
  };
  const petID = extractNumbersFromUrl(usePathname());
  const [animal, setAnimal] = useState<PetInfo>();
  const [photo, setPhoto] = useState<string>();
  const [org, setOrg] = useState<Organization>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    };

    getAnimal();
  }, []);

  if (loading) {
    return (
     <Loader/>
    );
  }
  return (
    <main className="flex justify-around min-h-screen w-full bg-slate-100 text-black">
      <div className="bg-white rounded p-5 flex flex-col w-1/2 my-5">
        <h1 className="text-4xl mb-2">{animal?.name}</h1>
        <span className="">
          {animal?.breeds.primary} - {animal?.contact.address.city},
          {animal?.contact.address.state}
        </span>
        <hr className="my-5" />
        <h1 className="text-4xl mb-2">About</h1>
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
        <hr className="my-5" />
        <h1 className="text-4xl mb-2">Meet {animal?.name}</h1>
        <p className="w-full">{animal?.description}</p>
      </div>
      <div className="my-5 w-4/12">
        <div>
          <Image
            className="rounded w-full"
            src={photo!}
            alt="animal"
            width={400}
            height={400}
          />
          <Link href={""}>
            <button className="bg-lime-500 p-5 rounded w-full mt-2">
              Like
            </button>
          </Link>
        </div>

        <div className="text-black bg-white rounded mt-10 p-5">
          <h1 className="text-xl text-center mb-2">{org?.name}</h1>
          <div>
            <h1 className="text-lg mb-2">Contact Information</h1>
            <div className="flex justify-between">
              {org?.email ? (
                <Link href={`mailto:${org.email}`}>
                  <span className="flex items-center gap-x-1">
                    {" "}
                    <AiOutlineMail className="text-lime-500" /> {org?.email}{" "}
                  </span>
                </Link>
              ) : (
                ""
              )}
              {org?.phone ? (
                <Link href={`tel:${org.phone}`}>
                  <span className="flex items-center gap-x-1">
                    {" "}
                    <AiOutlinePhone className="text-lime-500" /> {org?.phone}{" "}
                  </span>
                </Link>
              ) : (
                ""
              )}
            </div>
            <hr className="my-2" />
            <h1 className="text-lg mb-2">Address</h1>
            <div className="flex">
              {org?.address.address1 ? org?.address.address1 : ""}
              {org?.address.city ? org?.address.city : ""},{" "}
              {org?.address.state ? org?.address.state : ""}{" "}
              {org?.address.postcode ? org?.address.postcode : ""}
            </div>
            <hr className="my-2" />
            <h1 className="text-lg mb-2">Links</h1>
            <div className="flex gap-x-2">
              {org?.website ? (
                <Link href={org?.website} target="_blank">
                  <button className="rounded flex items-center bg-lime-500 p-2">
                    <GiEarthAmerica />
                    Website
                  </button>
                </Link>
              ) : (
                ""
              )}
              {org?.social_media.facebook ? (
                <Link href={org?.social_media.facebook} target="_blank">
                  <button className="rounded flex items-center bg-lime-500 p-2">
                    <AiOutlineFacebook />
                    Facebook
                  </button>
                </Link>
              ) : (
                ""
              )}
              {org?.social_media.instagram ? (
                <Link href={org?.social_media.instagram} target="_blank">
                  <button className="rounded flex items-center bg-lime-500 p-2">
                    <GiEarthAmerica />
                    Instagram
                  </button>
                </Link>
              ) : (
                ""
              )}
              {org?.social_media.twitter ? (
                <Link href={org?.social_media.twitter} target="_blank">
                  <button className="rounded flex items-center bg-lime-500 p-2">
                    <GiEarthAmerica />
                    Twitter
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default PetDetail;
