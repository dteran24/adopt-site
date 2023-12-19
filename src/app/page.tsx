import { getPictures, getBreedList, getToken, extractTokenFromResponse } from "./actions";
import HomeComponent from "./components/pages/home";
import { headers } from "next/headers";
const fetchData = async () => {
  try {
    
    const response = headers().get("set-cookie");
    let cookieToken = extractTokenFromResponse(response!);
    if (cookieToken) {
      const petData = await getPictures(cookieToken);
      const catData = await getBreedList(cookieToken, "cat");
      const dogData = await getBreedList(cookieToken, "dog");

      const combinedData = [...catData, ...dogData];
      let data = {
        petData: petData,
        combinedData: combinedData,
      };

      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const Home = async () => {
  let response = await fetchData();

  return (
    <HomeComponent
      breedList={response?.combinedData}
      petInfo={response?.petData}
    />
  );
};

export default Home;
