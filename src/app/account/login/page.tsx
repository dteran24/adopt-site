import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginComponent from "@/app/components/pages/login";
import { getServerSession } from "next-auth/next";

const Login = async () => {
  const session = await getServerSession(authOptions)
  return(<LoginComponent session={session!}/>)
}
export default Login;
