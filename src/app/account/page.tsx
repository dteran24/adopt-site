"use client";
import { getSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Loader from "../components/loader";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("User");
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/account/login");
      } else {
        if (session.user?.name) {
          // setName(session.user?.name);
        }
        console.log(session)

        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main className="bg-white min-h-screen text-black">
        <h1>{`Welcome ${name}!`}</h1>
        <Link href={"account/change-password"}>
          <button className="bg-lime-500 rounded p-2 text-lg">Change Password</button>
        </Link>
      </main>
    </>
  );
};
export default Profile;
