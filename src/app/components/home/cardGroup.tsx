"use client";
import { useEffect, useState } from "react";
import Card from "../card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
const names = [
  {
    name: "Apple",
    img: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Carrot",
    img: "https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Rufus",
    img: "https://images.pexels.com/photos/662417/pexels-photo-662417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];
const CardGroup = () => {
  const [animals, setAnimals] = useState([]);
  // const getPictures = async () => {
  //   const apiEndpoint =
  //     "https://api.petfinder.com/v2/animals?location=dallas, texas&distance=50&sort=distance&limit=3";
  //   const bearerToken =
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJDSmppVHNNSEx0blAxbmdwMkJBaU5JTjlkT3hkQUY0TXhLeEdoejBjT21WSldidGhDQyIsImp0aSI6IjdhZTczMWZlOGE2YjczOGI1NjVhNzEwZTEzNmFiZWQ2NGJiNzA2NjUzYzgyMmYwZWZjMDU2MzkxNTFiNjYxNDc0N2JiYTU0YjI0ZmVhM2I3IiwiaWF0IjoxNjk4MTczNDI3LCJuYmYiOjE2OTgxNzM0MjcsImV4cCI6MTY5ODE3NzAyNywic3ViIjoiIiwic2NvcGVzIjpbXX0.ibniDJuGJMsWcyL62rq6WO88OPjkommHA3pKrCWn9WxvQoCP_TPRfPqBkU9H7md8uNWDmZjuQcwIYbeLzdOc_i_jhXiJcqkJGtIPxX0vUk61F1-LmtTsMfxgmW2D5AVq8a6yMudCUmSMctPBlWX5491oiBV91DcR3yusFFXzqZrLmVKvKBx9pRfUeS1UGgomFG97-wj__V7kvWlYjEdysmYxuEbWbiiem2XwPgrv2iHrFTL8Wg2LjDD2xrf1VJe-wVmF1_w_EYtgTmxjLja89K7r5pvkS3zS_sry8puopt94jxiOwp5XM5zMwvN0tuehkELEDmiIp5v-dGSWnG-v7w";
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${bearerToken}`,
  //     },
  //   };
  //   await axios
  //     .get(apiEndpoint, config)
  //     .then((result) => setAnimals(result.data.animals))
  //     .catch((e) => console.log(e));
  // };
  useEffect(() => {
    // getPictures();
  }, []);
  return (
    <section className="bg-slate-100">
      <div className="pt-10">
        <h1 className="text-lg text-center text-lime-500 font-medium">
          Pets Nearby
        </h1>
        <h2 className="text-2xl text-center text-black font-medium">
          Quickly take a look at available pets in your area
        </h2>
      </div>
      <ul className="flex flex-col lg:flex-row lg:justify-center py-10 px-5">
        {animals.map((animal, index) => (
          <li className="mx-auto mb-4 lg:mb-0 px-5" key={index}>
            <Card animal={animal} />
          </li>
        ))}
        <li className="flex items-center mx-auto xl:ms-5">
          <Link href="/search">
            <button className="hover:cursor-pointer hover:text-lime-600 text-white lg:text-lime-500 text-lg bg-lime-500 lg:bg-slate-100 rounded-lg lg:rounded-none p-4 lg:p-0">
              <ArrowRightIcon className="hidden lg:block" /> View More
            </button>
          </Link>
        </li>
      </ul>
    </section>
  );
};
export default CardGroup;
