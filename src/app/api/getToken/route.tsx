import { NextRequest, NextResponse } from "next/server";
import { getAnimals, getToken } from "../../actions";
import { cookies } from "next/headers";

  export const GET = async (request: NextRequest) => {
    
  };

// export const POST = async (request: NextRequest) => {
//   const result = cookies().get("bearerToken");
//   return result;
// };
