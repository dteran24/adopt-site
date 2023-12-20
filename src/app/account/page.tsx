import ProfileComponent from "../components/pages/profile";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  return <ProfileComponent session={session!} />;
};
export default Profile;
