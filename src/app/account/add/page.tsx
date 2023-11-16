"use client";
import { useState } from "react";

const CreateAccount = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createUser(
        userData.name,
        userData.email,
        userData.password
        );
    } catch (err) {
      console.log(err);
    }
  };

  const createUser = async (name: string, email: string, password: string) => {
    console.log("calling create user")
    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json()
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Something went Wrong");
    }
  };

  return (
    <main className="min-h-screen flex justify-center bg-white text-black">
      <div className="mt-20 h-3/4 bg-slate-100 p-10 rounded">
        <h1 className="mb-20 text-4xl font-semibold">Create an account</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5"
              required
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
              placeholder="name@flowbite.com"
              required
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 "
              required
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-lime-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};
export default CreateAccount;
