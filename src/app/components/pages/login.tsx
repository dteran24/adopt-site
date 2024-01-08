"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

type LoginProps = {
  session: Session;
};
const LoginComponent = (props: LoginProps) => {
  const { session } = props;
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [err, setErr] = useState("");
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValue = emailRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";

    const result = await signIn("credentials", {
      redirect: false,
      email: emailValue,
      password: passwordValue,
    });
    if (!result?.error) {
      setErr("");
      router.replace("/");
    } else {
      setErr(result.error);
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  return (
    <main className="lg:flex lg:items-center bg-white min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <Image
            className="h-28 w-auto mx-auto"
            width={100}
            height={100}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAtFBMVEX///8AgAAAfgAAewAAegAAeAAAgQD9//0AgwDs9uwAhQDy+fL5/fm22LaLtove796gwqDl8uXX69eu06672rvM5MzE4MTp9Ommz6amzKagy6Db7dt8uXxSolLS6NKZyZkWihZwsXBmqWaMwIwuki47lzsgjSBfql9MnkwpkClDmkM1kzWDvYNkrGRPok/N4c0yjDKEuYRNmk1yrnJbqVsqkyqTxpNipWJXoFcsiixClUK817xdbKNqAAAN1UlEQVR4nO1daXfavBLGkgzeeLmsIawmgMuaNktz27f//39dG0IBW7I1Y0lwz8lzTr8VRY80Ho1mU6XyhS984Qs8BL7r+/6tZ/EXQbMxHDYeAkXDub2X17VDadV7HXVcRYOWQNAer6sWJaT6+995tzzLycyx49GsBITazlNXwSRLoPlmseNsjhOy3ialxmuvbWpdgdqbckOWQjAlqfnEExr30ON1NzaxMiD2262+yMmSZedjETZuoYbzZ5TDLwFb4kYsi54lmBAlI8T3OIl46/W5alZd/fwLMRBPyGIRWD8MRBt4hN3WwSF/RjkEE1EdwIab2XnDJYLxqIeHEPW0isnMaAQZbpa7XsdF6+jiwkU3V6QOYO816eEkCMbfokl104yKGcYUZfWNDMGY4sLcoVH7ViSjR4p7uV38kCIYjwcS/FLoF6mFT8h9iz0JeTiCmLLgHmRnZLGP4tEaoTzDjSrrvgAzKRk9gBaacMFGfjRTp+JEes3jVQ8fCkabSn6Ex+G28vq5BJ4Ai27Rff5gTQcwWLyJJg7FBmxONF+w3iHLFW/i2ABDkFglcpp3Ta8DJP6IoXaCtQ1wUnmnWAAdzILauwg0YGIVg4iXHb6FBsQ0/07Bg1jZ1JZghlbY0M0QpEmP8ESbWHhB4YDhnSRyqMlbIH9Bd4LBwF9hwnCumaELFtIYYZM7VgsxlEV+aWbYwzCkfPN0hxBS/XeoPoYhiXiz8hcIIbWsapEdWBLA8/4TjGdswY+KA2zNV/0RRrL4BwZCKx8YajZN5W73GYRZMfVlPCEc6LZqxrhp0ezC91AD6T8uMEdYwnCWGWmO+qLjod60EqxtcQxJlLlhICw2IwxxGj5G2thqesiB6NN9MqTT1EhdpJDqNmqwUmrR99RI8DvKiaHe+xPmvnOcV9qsATjs/j8YWk4qVr3CDqTb9Eaeh7GYXsc4see9dk2DNbXig/r6kohWpbpPi8oLlmFK1TSwBC36opchXgVur8aBOM6vIRMLKYM2mmF4FVVBXp0Shn29DCdYhpZ3Zbf1sdJu2ZpdUSg/zQHOlbNmimbINLsTMb62I6pXMxugGeZGCVQAfVwoYkhWugNsOEdNhiFaSjk3TcXoSsbwdTHUH5pxscbINUO0LiX6czH3yLldM2wjRzGRVPOI/BCvGXaw98xv2glWWlXc3Lyr8xBrtRmIkKIvUNc2DTAb4Azt4cMKVkmQ6Oocc0MUP7IyQBCaIHKa2/XdIsA5fIwIKdKsSbuikLJupv4Cdb9IB4J3qEG0GzSfeMZEp1OZQx0UQ1PJiajZpSaHsY3IylBuYqW2gifVZMLACEHgRLB0QT7p9e/kMrYI3OOj/+J0AXCglGa8Kw2wmHJj5boANrqcbMIJ1ITPhD70Ahjf5BnM0CAwZ5EuUHtotFpDZUWQlYoPs0kop24JmJjI0vG5C3bD9mwVJVIfbmZ1VdkoIGVDfvLWFpSbQ1eii2FzsHHYqWqKUBaNFOWgQuSUb05Cwq3EEUy79VRlqWFodaTkmlyTT2Dm50SBchMZvzxvuM/UeB7+d5jnNvYnnfZjgnZ9kvvdutKuUyLK9ZZeJMZNb/TnjmAAQoSXkN5oXY1l+QBqbed5+mviyVGkz6KVakmeifz6oh63hvX0E37aTX3JrgodCbNmOWlkPUeKoiO2l+WcivSZJ+XzgppMThRuOE5/s8no1iwnT7sqU8MmVvNyHzPjEXT3RY7bbIFN3+P/Neq8CFVTp3gX6bOYYDzRn4UUuQQby+KlqaZcqyPOBp7+xkKomrqCZTkTXOSfwI2wYAC25xAcRhJ7T7aX338td9MJnYm2sZFfmVVEMNY2ubtILF7ItyWn4660zVuBVLOlyI0XjIj4z9FlrjF5XKMcgaMh7xwcriXPKXpe3uKIEg2Fd5f6T9Gv2buMceHvBVqR0D1vgZoL2WP0nLfRlZFqIgyg+zuLNwB15pJX1jbvYyT8DawEW3lTiHyuUE0ufSeTfXdGa5/ROIQAuke4o/TvCY2mfAHYQwziz0NxIFvXm3OytWbehazF1uJzHeRzGI68yy4pNJwLVBQoekzWR3Uqb2DmuZwb84jYibVnMyucwf1+zenS+0T43Be5fruwwBA7zANQJSK0oY9o9fr9frvexV7Qau4BOeopACa4HnUNJBGS6C6sKgA0O5ws4m/Fh4SBiKCGyRAmMH4x7FjcW6BlEV+FTGAMdkUnBSjA/BGDvRsyQMTG2WOl8l/gz4q7COgCuAY5me1/KjVZI+8EkddFPzA1pzHDAPyjm8kpJsk8Zugikpxu0yVOxnrmMUSkcVETnQ2yQOUqxQwx4U7DPZuOwCW/xwwxec3kp8FI3gm4hM2YISqLS+CC1gpc9gaWIVkaJ4is0MAyvIEFjszXRDM0HJCtoLM+0QxTqYb6ESBT6JG6NPmlmQyzv2hh0zUfKx1c4jZZmj0wsGnT8e2phU1N19/P6BLIRgCW3az4SIbZDBmtwNYrOkElQGbrmjVOsbNMUm7RxcuOSXcGVtEcqhXfsIUBJvuJotIhY9h/Kvg6H6O2KboYKTm2v2NVjcmrPq5rjEX+TX78gP2Ic8PXioG12Y4x0ldkN49twaxUApN4HYN9P/waWb1M1gZ9bshOB+Hx10OkjCO9ijXfD8AWH7I8Y17q58B61Zrf7LXns/ftOoqixebbaFBvyS8Rbg/tU/IBqkVZzFA+k/OhsxuvHYsySmJY8T9KGXHW7/OuHEtUb6NzDVGA3ENJht3dyqOUl7ER8yTRviNBEsWQnf26uF4QMgxrrY8FFeciHViycFRoHgF71R5AL7qg4HRNMUO3/+zk0juCUOdbL1/5YDoQXoWQUEdikaZx4+2THZda+W+bIFQF2VwO0EMsUcF56M5Die07g9L3vERPOMNUewnEFfoQIhfBn8L4JaDOSCgVLrg2N93JcIiQArFXOGhvpeXzalZr4X0F2mSMeOnVknuB4WoMoeU92eQk8+WPSURJkNAkjHQ1IEoMBOWO/o6bPy87M0GaPbAOiVekA9ZWglzxHiCxjgdiffC+b1gMn58UA72Cce/4tQ/RG0nyoLysYJjDlN8xWr5+4gien8bF2B4Z0AUnXRcyPVHJN+zMIV52hK5M+rUEKO9jnEuPza8/OYwBKrXKDtOTLDEpBvGyKYK+7Cayb2I/J+TIyD760lZGMNE3WZe6pC60894oqsnn32YjM1PsIcgHJ11X6sGWgheKgrEsRZLWpPj+ZKK/kKEo8+gOGxV4SPyNHEWyTIlCuywhzt/IlFp0Cn/DipPnfbldTMfxJcqD4MgK6ke+95pWZR4Tqsmom7Q+li3UAyJLcZrzdwh9l+xeMy9UGXR7LaMuuhtpETIatS+0mVjUl3ZS1gvKtUjqoZAAnrorCVLN5Jf1+G9dMm8HKeJuPPOePP37Z71M2ZsmgkmFc+bY9WfZ911ZuIPmhkzFRXM0TP1RbGcyOYpR9tvqzhx2+pIIYTTctxGdeRozbi0Tp4ptqEfLnEA3nNk3PsZRldk29darF3SPgcmeZF0tlOxSV5tAopqzHEV+iza31e31usNybZUau4he+lsIJeNMUz+NH+EnxFcFBfA7o61zDDZQRiJONRO+Xa48Ct5uK02y1R6NN8vN/qPHkQipF0nLIqO8NaAmivhhU5WAFBc3e0W+jU0ZA4IZaAjJRRPdVRhMMae4UyfQTYXhyGk9oRGYKh0syPYGtUgutGKqFG5Ri4RqfYgHr9eUXkwMymiC4pd3FQPRWrAkTPQQvoTWO5OAotG0ZGDDNiVI+xb0QvbJd6XI7+ajFrhmwqVhm5NT/bdCPjxTcop/CKckil4yVwb0i1ulkc1A0IIJsvO8Ahg692+3hYY6XqOb4iuB9nerK7dTpEcYeOLCvekWGniaG1+/ogrCx9oVITB68eVB9yXDpO9CAM3vOptxkeaCLHRWBg5vd9qfofUlD+xbzEqh07JBvmqvGhpPDERKuRbo63hwS5P0Eto20b+xPXMBTbZb/U6EVF+s5l6EVFtTNT+6NbEz9Dwqi6ke0gWy0WHYYErItEFHe8MA/bS6Duh4g3x4TwRjqDfdkAXDuqDB/jYYt5eB+p5qoH68JqD8BeuJoewZaSgX0zv7DGMxVd3nCNlCRSNUP0N+V6fhAYqffMR2o9IIxR/iw91toeowDfYdZo0gv4qnDcA9XSw+oTjbrXN/DK1IqTK9wz20PKXG910yVOpUNJ2qJwO1DN1b0+FALUPwGwMGoNj1fWfXwwSKIzR3d7dQnrVwf2YbeVVKENv4nT83JdX7ytOHsH1Sz7wosxmphr9///jx4/faOvSoKzGe8qe6g1WJ6cTkvH+f5n++txruwVtdCx6G39ujV88Gt5Q6Qa3RlgC7iYTZztNg6HLrw9zufIMjqSOICG8nldCjy8Ekv5K8OdhSuLw6GsJP0HfPkgd3x22pY3k43zLYgasnJ3oC6pLE2Gogb3UE3bfMI9s5oBs9je970hSp7c2hLlv3cW1LbqS+J+C6UhQpC99wjrBJ9rV0LkFLX+nsRPTe95meHb318PHLh0HxF0lDnQ3Tm6s89z61nbc/JZVcrTvjNAO4gC3xDG8pTCl/jUlCr6Mk+uwPIuEXSQ28H+K+ZVqvxuys5VylE7o1ijhGHWHhyEi+vvv4y7NtRhMkr6uGry9/lEtOfH5smU3PiC2/X21z9bJ+sz74J8G03XvQ9WeDZvufMwbfb/U04Re+8IUS+B8uPf1B/CsJxgAAAABJRU5ErkJggg=="
            alt="Logo"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <Link href="/account/add">
            <p className="mt-1 text-center text-sm text-gray-500 ">
              Not a member?
              <span className="font-semibold leading-6 text-lime-500 hover:text-lime-400 ms-1">
                Create an account
              </span>
            </p>
          </Link>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6 flex flex-col"
            action="#"
            method="POST"
            onSubmit={submitHandler}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-lime-500 hover:text-lime-400"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <button
                type="submit"
                className="w-full lg:w-24 rounded-md bg-lime-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
              >
                Sign in
              </button>
              {err && <span className="text-rose-500 mt-2">{err}</span>}
            </div>
            {/* <div className="relative flex text-black flex-col text-center mt-4">
                <hr className="  w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-5 bg-white">
                  or continue with
                </span>

                <div className="flex justify-center gap-x-5">
                  <button className="">
                    <i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="32"
                        height="32"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                      </svg>
                    </i>
                  </button>
                  <button className="">
                    <i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="32"
                        height="32"
                        viewBox="0 0 48 48"
                      >
                        <path
                          fill="#3F51B5"
                          d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                        ></path>
                        <path
                          fill="#FFF"
                          d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                        ></path>
                      </svg>
                    </i>
                  </button>
                </div>
              </div>*/}
          </form>
        </div>
      </div>
      <Image
        className="invisible lg:visible object-cover object-center pe-5 rounded"
        width={750}
        height={400}
        src="https://cdn.stocksnap.io/img-thumbs/960w/man-dog_KOEZ5EORMG.jpg"
        alt=""
      />
    </main>
  );
};
export default LoginComponent;
