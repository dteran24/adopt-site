import SearchComponent from "../components/pages/search"
import { cookies } from "next/headers";
const Search = () => {
  let cookiesToken = cookies().get("token")?.value;
  return(<SearchComponent token={cookiesToken!}/>)
}
export default Search;