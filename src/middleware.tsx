import { NextResponse } from "next/server";
import { getToken } from "./app/actions";

export const middleware = async (request: Request) => {
  const token = await getToken();
  const response = NextResponse.next();
  response.cookies.set({
    name: "token",
    value: token,
  });
  let cookie = response.cookies.get("token");
  console.log(cookie);
  return response;
};
export const config = {
  matcher: "/",
};
