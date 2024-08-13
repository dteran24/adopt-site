/* eslint-disable react-hooks/exhaustive-deps */
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
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { debounce } from "@/app/util/debounce";

type PetDetailProps = {
  token: string;
};

const PetDetailComponent = (props: PetDetailProps) => {
  const { token } = props;
  const extractNumbersFromUrl = (path: string) => {
    const numbers = path.match(/\d+/);
    return numbers ? Number(numbers[0]) : null;
  };
  const petID = extractNumbersFromUrl(usePathname());
  const [animal, setAnimal] = useState<PetInfo>();
  const [photo, setPhoto] = useState<string>();
  const [org, setOrg] = useState<Organization>();
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [inSession, setInSession] = useState(false);
  const linksToAdd: string[] = [
    org?.website ? org.website : "",
    org?.social_media.facebook ? org.social_media.facebook : "",
    org?.social_media.instagram ? org?.social_media.instagram : "",
    org?.social_media.twitter ? org.social_media.twitter : "",
  ];
  const router = useRouter();
  let socialLinks: string[] = [];

  const addLink = (links: string[]) => {
    if (links && links.length > 0) {
      for (let link of links) {
        if (link !== "") {
          socialLinks.push(link);
        }
      }
    }
  };
  const addAnimal = async (animal: PetInfo) => {
    try {
      const response = await fetch("/api/animals", {
        method: "POST",
        body: JSON.stringify({ animal }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to add animal: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Animal added:", data);
    } catch (error) {
      console.error("Error adding animal:", error);
    }
  };
  const deleteAnimal = async (id: number) => {
    try {
      const response = await fetch(`/api/animals/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete animal: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Animal deleted:", data);
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };
  const debouncedAddAnimal = debounce(addAnimal, 1000);
  const debouncedDeleteAnimal = debounce(deleteAnimal, 1000);
  const likeHandler = () => {
    if (inSession) {
      // Toggle like state
      setLike((prevLike) => {
        const newLike = !prevLike;

        // Trigger API calls based on the updated state
        if (animal) {
          if (newLike) {
            debouncedAddAnimal(animal);
          } else {
            debouncedDeleteAnimal(animal.id);
          }
        }

        // Return the new like state
        return newLike;
      });
    } else {
      router.replace("/account/login");
    }
  };
  addLink(linksToAdd);

  useEffect(() => {
    // Function to fetch animal data and organization
    const fetchAnimalData = async () => {
      try {
        // Start loading
        setLoading(true);

        // Fetch animal data
        const animalResponse = await getAnimalByID(petID!, token!);
        if (animalResponse) {
          setAnimal(animalResponse);

          // Fetch organization data
          const orgResponse = await getOrganization(
            animalResponse.organization_id,
            token!
          );
          setOrg(orgResponse);

          // Fetch photo data
          const image = photoHandler(animalResponse);
          setPhoto(image);

          // Check if the animal is liked
          if (inSession) {
            await checkLiked(petID!);
          }
        }
      } catch (error) {
        console.error("Error fetching animal data:", error);
        // Handle error, e.g., set an error state or show an error message
      } finally {
        // Stop loading regardless of success or failure
        setLoading(false);
      }
    };

    // Function to check if the animal is liked
    const checkLiked = async (id: number) => {
      try {
        const response = await fetch(`/api/animals/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch liked status: ${response.statusText}`
          );
        }

        const data = await response.json();
        if (data) {
          setLike(data.liked);
        } else {
          throw new Error("No data returned from server.");
        }
      } catch (error) {
        console.error("Error checking liked status:", error);
        // Handle error, e.g., set default values
      }
    };

    // Check session status
    const fetchSession = async () => {
      const session = await getSession();
      setInSession(!!session);
    };

    // Execute the functions
    fetchSession().then(() => fetchAnimalData());
  }, [petID, token, inSession]);

  if (loading) {
    return <Loader />;
  }
  console.log(like);
  return (
    <main className="flex flex-col sm:flex-row sm:justify-around min-h-screen w-full bg-white text-black">
      <div className="bg-white rounded p-5 flex flex-col w-100 sm:w-1/2 my-5 mx-2 h-3/4">
        <h1 className="text-4xl mb-2 font-semibold">{animal?.name}</h1>
        <span className="">
          {animal?.breeds.primary} - {animal?.contact.address.city},
          {animal?.contact.address.state}
        </span>
        <hr className="my-5" />
        <h1 className="text-4xl mb-2 font-semibold">About</h1>
        <h2 className="text-2xl font-medium">Characteristics</h2>
        {animal?.tags.length && animal.tags.length > 0 ? (
          <ul className="">
            {animal?.tags.map((tag, index) => {
              return <li key={index}>{tag}</li>;
            })}
          </ul>
        ) : (
          "No info provided."
        )}
        <h2 className="text-2xl font-medium">Coat Length</h2>
        {animal?.coat ? <span>{animal.coat}</span> : "No info provided."}
        <h2 className="text-2xl font-medium">House Trained</h2>
        <span>
          {animal?.attributes.house_trained ? "Yes" : "No info provided."}
        </span>
        <h2 className="text-2xl font-medium">Health</h2>
        <span>
          {animal?.attributes.shots_current
            ? "Shots are up to date."
            : "Shots are not up to date."}
        </span>{" "}
        <span>
          {animal?.attributes.spayed_neutered
            ? "Spayed or nuetered."
            : " Not nuetered or spayed."}
        </span>
        <h2 className="text-2xl font-medium">Good with</h2>
        {animal?.environment.cats &&
        animal.environment.dogs &&
        animal.environment.children ? (
          <>
            <span>{animal?.environment.cats ? "Cats " : ""}</span>
            <span>{animal?.environment.dogs ? "Dogs " : ""}</span>
            <span>{animal?.environment.children ? "Children " : ""}</span>
          </>
        ) : (
          "No info provided."
        )}
        {/* <hr className="my-5" /> */}
      </div>
      <div className="my-5 sm:w-4/12 w-full px-2 sm:px-0">
        <div className="flex flex-col">
          <Image
            className="rounded w-full h-auto mx-auto"
            src={photo!}
            alt="animal"
            width={300}
            height={200}
          />

          <button
            className="w-full bg-lime-500 p-5 rounded mt-2 flex items-center justify-center gap-x-4 mx-auto"
            onClick={likeHandler}
          >
            {like ? (
              <>
                <FcLike className="text-2xl" />
                <span className="text-xl font-semibold">Liked!</span>
              </>
            ) : (
              <>
                <FaRegHeart className="text-2xl" />
                <span className="text-xl font-semibold">Like</span>
              </>
            )}
          </button>
        </div>

        <div className="text-black bg-white rounded my-10">
          <h1 className="text-xl text-center mb-2 font-medium">{org?.name}</h1>
          <div>
            <h1 className="text-lg mb-2 font-medium">Contact Information</h1>
            <div className="flex md:justify-between flex-col md:flex-row">
              {org?.email ? (
                <Link href={`mailto:${org.email}`}>
                  <span className="flex items-center gap-x-1">
                    <AiOutlineMail className="text-lime-500" /> {org?.email}
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
            <h1 className="text-lg mb-2 font-medium">Address</h1>
            <div className="flex">
              {org?.address.address1 ? org?.address.address1 : ""}
              {org?.address.city ? org?.address.city : ""},{" "}
              {org?.address.state ? org?.address.state : ""}{" "}
              {org?.address.postcode ? org?.address.postcode : ""}
            </div>
            <hr className="my-2" />
            <h1 className="text-lg mb-2 font-medium">
              {socialLinks.length > 0 ? "Links" : ""}
            </h1>
            <div className="flex flex-wrap sm:flex-nowrap gap-1 sm:gap-x-2">
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
export default PetDetailComponent;
