import { hashPassword, verifyPassword } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/db";
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const PATCH = async (req: Request) => {
  try {
    console.log("CALLING PATCH");
    const session = await getServerSession(authOptions);
    const { newPassword, oldPassword } = await req.json();
    console.log("session", session)
    if (!session) {
      return NextResponse.json(
        {
          message: "Not Authenticated!",
        },
        { status: 401 }
      );
    }
    const userEmail = session.user?.email;
    console.log("session", session);
    const client = await connectToDatabase();
    const userCollection = client?.db().collection("users");
    const user = await userCollection?.findOne({ email: userEmail });
    if (!user) {
      client?.close();
      return NextResponse.json(
        {
          message: "User not Found!",
        },
        { status: 404 }
      );
    }
    const currentPassword = user.password;
    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
    if (!passwordsAreEqual) {
      client?.close();
      return NextResponse.json(
        {
          message: "Passwords do not match!",
        },
        { status: 403 }
      );
    }
    const hashedPassword = await hashPassword(newPassword);
    await userCollection?.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );
    client?.close();
    return NextResponse.json({ message: "Password changed!" }, { status: 200 });
  } catch (e) {
    console.log(e)
    return NextResponse.json({message:"Error " + e}, {status:500})
  }
};
