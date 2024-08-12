"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const CreateAccount = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const router = useRouter();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(userData.name, userData.email, userData.password);
    } catch (err) {
      console.log(err);
    }
  };

  const createUser = async (name: string, email: string, password: string) => {
    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    if (!response.ok) {
      data.then((response) => {
        setErr(response.message);
        // throw new Error(response.message);
      });
    } else {
      setUserCreated(true);
      setErr(false);
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (!result?.error) {
        router.replace("/");
      }
    }

    data.then((response) => console.log(response));
  };

  return (
    <main className="min-h-screen flex justify-center bg-white text-black p-5">
      <div className="h-3/4 bg-slate-100 p-8 rounded">
        <h1 className="mb-10 text-3xl font-semibold">Create an account</h1>
        <form className="flex flex-col" onSubmit={submitHandler}>
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
            className="w-full lg:w-24 text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-lime-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
          {err && <span className="text-rose-500 mt-2">{err}</span>}
          {userCreated && (
            <span className="text-green-500 mt-2">User Created!</span>
          )}
        </form>
      </div>
    </main>
  );
};
export default CreateAccount;
