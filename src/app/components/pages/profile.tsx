"use client";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/loader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";
import { PetInfo } from "@/app/models/pet";
import { photoHandler } from "@/app/actions";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineEmojiSad } from "react-icons/hi";
type ProfileProps = {
  session: Session;
};

const ProfileComponent = (props: ProfileProps) => {
  const { session } = props;

  const [name, setName] = useState<string>("");
  const [animalList, setAnimalList] = useState<[]>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/animals", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setName(data.userName);
      setAnimalList(data.animalsLiked);
      setLoading(false);
    };

    if (!session) {
      router.replace("/account/login");
    } else {
      fetchUserData();
    }
  }, [router, session]);
  const deleteAnimal = async (id: number) => {
    try {
      const response = await fetch(`/api/animals/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Update the animalList state after successful deletion
        setAnimalList((prevAnimalList: any) =>
          prevAnimalList.filter((item: any) => item.animal.id !== id)
        );
      } else {
        console.error("Failed to delete animal");
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main className="bg-white min-h-screen text-black">
        <div className="text-center">
          <h1 className="text-2xl">{`Welcome ${name}!`}</h1>
          <Link href={"account/change-password"}>
            <button className="bg-lime-500 rounded p-2">Change Password</button>
          </Link>
        </div>
        <div className="flex flex-col mx-8 items-center">
          {animalList?.length ? (
            animalList?.map((item: any) => {
              const animal: PetInfo = item.animal;
              const photo = photoHandler(animal);
              return (
                <div className="bg-transparent rounded my-5 rounded border-2 border-lime-500 w-full lg:w-3/4" key={animal.id}>
                  <div className="flex items-center sm:items-start justify-between p-5">
                    <Link href={`search/${animal.id}`}>
                      <Image
                        className="rounded h-28 w-28 sm:h-60 sm:w-60 md:h-80 md:w-80 lg:h-120 lg:w-120 object-cover object-center"
                        src={photo!}
                        width={300}
                        height={300}
                        alt="pet"
                      />
                    </Link>
                    <div className="flex flex-col w-full">
                      <div className="flex w-full justify-around sm:justify-between">
                        <h2 className="justify-center font-bold text-xl sm:ms-40 md:ms-72 lg:ms-80">
                          {animal.name}
                        </h2>
                        <button onClick={() => deleteAnimal(animal.id)}>
                          <FaTrashAlt className="text-rose-700 text-3xl" />
                        </button>
                      </div>
                      <div className="hidden sm:block">
                        <div className="px-5 py-1">
                          <h2 className="text-2xl font-medium">
                            Characteristics
                          </h2>
                          {animal?.tags.length && animal.tags.length > 0 ? (
                            <ul className="flex flex-wrap gap-x-1 ">
                              {animal?.tags.map((tag, index) => {
                                return <li key={index}>{`${tag}`}</li>;
                              })}
                            </ul>
                          ) : (
                            "No info provided."
                          )}
                          <h2 className="text-2xl font-medium">Coat Length</h2>
                          {animal?.coat ? (
                            <span>{animal.coat}</span>
                          ) : (
                            "No info provided."
                          )}
                          <h2 className="text-2xl font-medium">
                            House Trained
                          </h2>
                          <span>
                            {animal?.attributes.house_trained
                              ? "Yes"
                              : "No info provided."}
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
                              <span>
                                {animal?.environment.cats ? "Cats " : ""}
                              </span>
                              <span>
                                {animal?.environment.dogs ? "Dogs " : ""}
                              </span>
                              <span>
                                {animal?.environment.children
                                  ? "Children "
                                  : ""}
                              </span>
                            </>
                          ) : (
                            "No info provided."
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col justify-center items-center h-96">
              <h1 className="text-lime-500 text-xl font-semibold">
                No animals Liked!
              </h1>
              <HiOutlineEmojiSad className="text-8xl text-lime-500" />
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default ProfileComponent;
