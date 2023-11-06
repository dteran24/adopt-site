"use client";
import CardGroup from "./components/home/cardGroup";
import Info from "./components/home/info";
import SearchBar from "./components/home/searchbar";
import { getPictures, getToken } from "./actions";
import { PetInfo } from "./models/pet";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";

const Home = () => {
  const [pictures, setPictures] = useState<PetInfo[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        console.log("token", token);
        sessionStorage.setItem("token", token);
        if (token) {
          const petData = await getPictures(token);
          setPictures(petData);
          setLoading(false);
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
          <SearchBar />
        </div>
        <div className="flex flex-col justify-end h-64 pb-12 text-white text-center">
          <span className="font-bold text-4xl">Find your new best friend</span>
          <span className="font-bold text-lg">
            Browse pets and find one best for you.
          </span>
        </div>
      </div>
      {loading ? "Loading..." : pictures ? <CardGroup pictures={pictures} /> :" Data not Found"}
      
      <Info />
    </main>
  );
};

export default Home;
