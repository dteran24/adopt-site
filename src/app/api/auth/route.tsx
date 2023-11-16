import { hashPassword } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/db";
import { User } from "@/app/models/pet";
import { NextApiResponse, NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { name, email, password }: Partial<User> = await req.json();

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return NextResponse.json(
      { message: "Invalid Input = Password must contain 7 characters." },
      { status: 422 }
    );
  }
  const client = await connectToDatabase();
  const hashedPassword = hashPassword(password);

  const db = client?.db();

  const result = await db?.collection("users").insertOne({
    name: name,
    email: email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "Created User!" }, { status: 201 });
};
