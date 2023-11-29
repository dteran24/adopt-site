import { connectToDatabase } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ liked: false }, { status: 401 });
    }

    const userEmail = session.user?.email;
    const id = req.url?.split("animals/")[1];
    if (!id) {
      return NextResponse.json({ liked: false }, { status: 400 });
    }

    const client = await connectToDatabase();
    const userCollection = client?.db().collection("users");

    const user = await userCollection?.findOne({
      email: userEmail,
      "animalsLiked.animal.id": Number(id),
    });
    const animalExists = !!user;
    console.log("id", id);
    console.log("animalexist", animalExists);
    if (user) {
      client?.close();
      return NextResponse.json({ liked: true }, { status: 200 });
    } else {
      client?.close();
      return NextResponse.json(
        { liked: false, message: "Animal not found" },
        { status: 404 }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ liked: false }, { status: 500 });
  }
};

export const DELETE = async (req: NextApiRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Not Authenticated!",
        },
        { status: 401 }
      );
    }
    const userEmail = session.user?.email;
    const id = req.url?.split("animals/")[1];
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
    const userWithAnimal = await userCollection?.findOne({
      email: userEmail,
      "animalsLiked.animal.id": Number(id),
    });
    const animalExists = !!userWithAnimal;

    if (!animalExists) {
      client?.close();
      return NextResponse.json(
        { message: "Animal does not exist!" },
        { status: 400 }
      );
    }
    await userCollection?.updateOne(
      { email: userEmail },
      { $pull: { animalsLiked: { "animal.id": Number(id) } } }
    );

    return NextResponse.json({ message: "Animal removed!" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error " + e }, { status: 500 });
  }
};
