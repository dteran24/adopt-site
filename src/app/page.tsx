import Card from "./components/card";
import SearchBar from "./components/searchbar";

const Home = () => {
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
  return (
    <main className="flex flex-col">
      <div className="w-full h-96 bg-cover bg-center bg-[url(https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)]">
        <div className=" flex flex-col items-center justify-center">
          <SearchBar />
        </div>
        <div className="flex flex-col justify-end h-3/4 pb-8 text-white text-center">
          <span className="font-bold text-4xl">Find your new best friend</span>
          <span className="font-bold text-lg">
            Browse pets and find one best for you.
          </span>
        </div>
        <section className="">
          <h1 className="text-3xl text-center">Pets Nearby!</h1>
          <ul className="flex justify-around py-10">
            {names.map((name, index) => (
              <li className="" key={index}>
                <Card pet={name} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Home;
