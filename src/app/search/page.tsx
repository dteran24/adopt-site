import { Metadata } from "next";
import SearchComponent from "../components/pages/search"
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Search a Pet",
  description: "Look for a pet that needs a home.",
};
const Search = () => {
  let cookiesToken = cookies().get("token")?.value;
  return(<SearchComponent token={cookiesToken!}/>)
}
export default Search;