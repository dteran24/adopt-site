"use client";
import CardGroup from "./components/home/cardGroup";
import Info from "./components/home/info";
import SearchBar from "./components/home/searchbar";
import { getBreedList, getPictures, getToken } from "./actions";
import { Breed, PetInfo } from "./models/pet";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [pictures, setPictures] = useState<PetInfo[]>();
  const [loading, setLoading] = useState(true);

  const breedListRef = useRef<Breed[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        sessionStorage.setItem("token", token);
        if (token) {
          const petData = await getPictures(token);
          const catData = await getBreedList(token, "cat");
          const dogData = await getBreedList(token, "dog");
          const combinedData = [...catData, ...dogData];
          breedListRef.current = combinedData;
          setPictures(petData);
          if (petData) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col bg-white">
      <div className="w-full h-96 bg-cover bg-center bg-[url(https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)]">
        <div className=" flex flex-col items-center justify-center">
          <SearchBar breedList={breedListRef.current} />
        </div>
        <div className="flex flex-col justify-end h-64 pb-12 text-white text-center">
          <span className="font-bold text-4xl">Find your new best friend</span>
          <span className="font-bold text-lg">
            Browse pets and find one best for you.
          </span>
        </div>
      </div>
      <CardGroup pictures={pictures} loading={loading} />

      <Info />
    </main>
  );
};

export default Home;
