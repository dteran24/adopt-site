"use client";
import Loader from "@/app/components/loader";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


const ChangePassword = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const oldPasswordRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOldPassword = oldPasswordRef.current?.value || "";
    const enteredNewPassword = newPasswordRef.current?.value || "";

    const response = await fetch("/api/account/change-password", {
      method: "PATCH",
      body: JSON.stringify({
        newPassword: enteredNewPassword,
        oldPassword: enteredOldPassword,
      }),
      headers: { "Content-Type": "application/json"},
    });
    const data = await response.json();
    if (!response.ok) {
      setError(true);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/account");
      },3000)
      
    }

   

  };

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/account/login");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <Loader />;
  }
  return (
    <main className="min-h-screen flex justify-center bg-white text-black">
      <div className="mt-20 h-3/4 bg-slate-100 p-10 rounded">
        <h1 className="mb-20 text-4xl font-semibold">Change Password</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Old Password
            </label>
            <input
              type="password"
              id="old-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5"
              required
              ref={oldPasswordRef}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
              required
              ref={newPasswordRef}
            />
          </div>
          <div className="flex flex-col">
          <button
            type="submit"
            className="text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-lime-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
            {error && <span className="text-rose-500 mt-2">Passwords do not match!</span>}
            {success && <span className="mt-2">Password Changed!</span>}
            </div>
        </form>
      </div>
    </main>
  );
};
export default ChangePassword;
