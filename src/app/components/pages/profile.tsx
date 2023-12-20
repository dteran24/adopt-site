"use client";
import { getSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/loader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";
import { PetInfo } from "@/app/models/pet";

type ProfileProps = {
  session: Session;
};

const ProfileComponent = (props: ProfileProps) => {
  const { session } = props;

  const [name, setName] = useState<string>("");
  const [animalList, setAnimalList] = useState<PetInfo[]>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/animals", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setName(data.userName);
      setAnimalList(data.animalsLiked);
      setLoading(false);
    };

    if (!session) {
      router.replace("/account/login");
    } else {
      fetchUserData();
    }
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main className="bg-white min-h-screen text-black">
        <h1>{`Welcome ${name}!`}</h1>
        <Link href={"account/change-password"}>
          <button className="bg-lime-500 rounded p-2 text-lg">
            Change Password
          </button>
        </Link>
      </main>
    </>
  );
};
export default ProfileComponent;
