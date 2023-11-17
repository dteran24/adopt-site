"use client";
import { getSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/loader";
import {useRouter } from "next/navigation";



const Profile = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/account/login");
      } else {
        setLoading(false);
      }
    });
  }, []);
    
  if (loading) {
    return <Loader />;
  }
  
  return (
    <>
      <main className="bg-white min-h-screen text-black">
        <h1>Welcome Daniel!</h1>
      </main>
    </>
  );
};
export default Profile;
