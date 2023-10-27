"use client";
import React, { useEffect, useState } from "react";
import { PetInfo } from "../../models/pet";
import Card from "../card";

interface Pets {
  pets: PetInfo[];
}

const Items = (props: Pets) => {
  const { pets } = props;
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pets.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pets.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {});
  return (
    <div className="bg-slate-100 text-black w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3 gap-y-10 px-5 mx-auto mt-5">
        {currentItems.map((animal, index) => (
          <div key={index} className="flex justify-center">
            <Card animal={animal} />
          </div>
        ))}
      </div>
      <ul className="flex justify-center text-xl my-10 sm:mb-0">
        {pageNumbers.map((number) => (
          <li key={number} className="me-5">
            <a href="#">
              <button
                className={`${
                  number === currentPage
                    ? "bg-lime-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } py-2 px-3 rounded`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
