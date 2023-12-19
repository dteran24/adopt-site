import { NextResponse, NextRequest } from "next/server";
import { getToken } from "./app/actions";

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();
  if (response.cookies.has("token")) {
    return response
  }
  const token = await getToken();
  response.cookies.set({
    name: "token",
    value: token,
  });
  return response;
};
export const config = {
  matcher: "/",
};
