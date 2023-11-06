"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { PetInfo } from "../../models/pet";
import { getAnimalByID } from "../../actions";

const PetDetail = () => {
  const extractNumbersFromUrl = (path: string) => {
    const numbers = path.match(/\d+/);
    return numbers ? Number(numbers[0]) : null;
  };
  const petID = extractNumbersFromUrl(usePathname());
  const [animal, setAnimal] = useState<PetInfo>();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const getAnimal = async () => {
      const response = await getAnimalByID(petID!, token!);
      if (response) {
        setAnimal(response);
      }
    };
    getAnimal();
  }, []);

  console.log("animal", animal);
  return (
    <main>
      <h1>pet detail page</h1>
    </main>
  );
};
export default PetDetail;
