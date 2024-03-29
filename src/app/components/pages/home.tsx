"use client";
import CardGroup from "../../components/home/cardGroup";
import Info from "../../components/home/info";
import SearchBar from "../../components/home/searchbar";
import { Breed, PetInfo } from "../../models/pet";


type HomeProps = {
    breedList?: Breed[];
    petInfo?: PetInfo[];
}


const HomeComponent = (props: HomeProps) => {
    const { breedList, petInfo } = props;
 
  

 
  return (
    <main className="flex flex-col bg-white">
      <div className="w-full h-96 bg-cover bg-center bg-[url(https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)]">
        <div className=" flex flex-col items-center justify-center">
          <SearchBar breedList={breedList} />
        </div>
        <div className="flex flex-col justify-end h-64 pb-12 text-white text-center">
          <span className="font-bold text-4xl">Find your new best friend</span>
          <span className="font-bold text-lg">
            Browse pets and find one best for you.
          </span>
        </div>
      </div>
      <CardGroup pictures={petInfo}/>

      <Info />
    </main>
  );
};

export default HomeComponent;
