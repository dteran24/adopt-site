import PetDetailComponent from "@/app/components/pages/petdetail";
import { cookies } from "next/headers";

const petDetail = () => {
  let cookiesToken = cookies().get("token")?.value;
  return <PetDetailComponent token={cookiesToken!} />;
};
export default petDetail;
