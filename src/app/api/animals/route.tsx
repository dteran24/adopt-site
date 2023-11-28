import { connectToDatabase } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { PetInfo } from "@/app/models/pet";

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const { animal } = (await req.json()) as { animal: PetInfo };

    if (!session) {
      return NextResponse.json(
        {
          message: "Not Authenticated!",
        },
        { status: 401 }
      );
    }
    const userEmail = session.user?.email;
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
    const userWithAnimal = await userCollection?.findOne({email: userEmail,'animalsLiked.animal.id': animal.id,})
    const animalExists = !!userWithAnimal;
   

    if (animalExists) {
      client?.close();
      return NextResponse.json(
        { message: "Animal already exists!" },
        { status: 400 }
      );
    }

    await userCollection?.updateOne(
      { email: userEmail },
      { $push: { animalsLiked: { animal } } }
    );
    client?.close();
    return NextResponse.json({ message: "Animal added!" }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
export const DELETE = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    const { animalID } = await req.json();

    if (!session) {
      return NextResponse.json(
        {
          message: "Not Authenticated!",
        },
        { status: 401 }
      );
    }
    const userEmail = session.user?.email;
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
    const userWithAnimal = await userCollection?.findOne({email: userEmail,'animalsLiked.animal.id': animalID.id,})
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
      { $pull: { animalsLiked: { id: animalID } } }
    );
    return NextResponse.json({ message: "Animal removed!" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error " + e }, { status: 500 });
  }
};
export const GET = async (req: Request) => {
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

    const animalsLiked = user.animalsLiked;
    client?.close();
    return NextResponse.json({ animalsLiked }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error " + e }, { status: 500 });
  }
};
