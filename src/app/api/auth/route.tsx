import { hashPassword } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/db";
import { User } from "@/app/models/pet";
import { NextResponse } from "next/server";

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
  const hashedPassword = await hashPassword(password);

  const db = client?.db();
  const existingUser = await db?.collection("users").findOne({ email: email });

  if (existingUser) {
    client?.close();
    return NextResponse.json(
      { message: "User exists already" },
      { status: 422 }
    );
  }
  try {
    await db?.collection("users").insertOne({
      name: name,
      email: email,
      password: hashedPassword,
    });
    client?.close();
    return NextResponse.json({ message: "Created User!" }, { status: 201 });
  } catch (e) {
    client?.close();
    return NextResponse.json({message: "Something went Wrong"}, {status: 500})
    
  }
};
