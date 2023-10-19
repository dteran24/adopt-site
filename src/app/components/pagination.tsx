"use client";
import React, { useState } from "react";
import { Pet } from "../models/pet";
import Card from "./card";

interface Pets {
  pets: Pet[];
}

const Items = (props: Pets) => {
  const { pets } = props;
  const itemsPerPage = 10;
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

  return (
    <div className="bg-slate-100 text-black w-full">
      <div className="grid grid-cols-3 gap-y-10 px-5 mx-auto mt-5">
        {currentItems.map((pet, index) => (
          <div key={index} className="flex justify-center">
            <Card pet={pet} />
          </div>
        ))}
      </div>
      <ul className="flex justify-center text-xl">
        {pageNumbers.map((number) => (
          <li key={number} className="me-5">
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
