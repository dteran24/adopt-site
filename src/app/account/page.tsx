import ProfileComponent from "../components/pages/profile";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
  description: "The animals you would consider as your best friend!",
};
const Profile = async () => {
  const session = await getServerSession(authOptions);

  return <ProfileComponent session={session!} />;
};
export default Profile;
